import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { format, transports } from 'winston';
import {
  PrismaClientExceptionFilter,
  ZodExceptionFilter,
} from './common/filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // Bufferize logs until app.useLogger() is called
    bufferLogs: true,
    rawBody: true,
  });
  const configService = app.get(ConfigService);
  const logLevel = configService.get<string>('log.level');
  const logger = WinstonModule.createLogger({
    level: logLevel,
    format: format.combine(
      format.errors({ stack: true }),
      format.timestamp(),
      format.ms(),
      nestWinstonModuleUtilities.format.nestLike(),
    ),
    transports: [
      new transports.Console({
        handleExceptions: true,
        handleRejections: true,
      }),
    ],
    exitOnError: false,
  });
  app.useLogger(logger);

  app.setGlobalPrefix('/api');

  // Middleware for security
  app.use(helmet());

  const cookieParserSecret = configService.get<string>(
    'restApi.cookies.parserSecret',
  );
  app.use(cookieParser(cookieParserSecret));

  // Starting the application (listening)
  const port = configService.get<number>('restApi.port')!;
  const raw = configService.get<string>('origins') || '';
  const allowedOrigins = raw.split(',').map((url) => url.trim()); // [ 'https://tiwanaconnect.com', 'https://admin.tiwanaconnect.com' ]

  console.log(allowedOrigins);
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  // Node compress response. For heavy-load, use nginx proxy with compression instead.
  if (configService.get<boolean>('restApi.useCompression')) {
    logger.warn('server use node compression for REST Apis response');
    app.use(compression());
  }

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  // Adding OpenDocs (swagger)
  const config = new DocumentBuilder()
    .setTitle('Areeka web V2')
    .setDescription('Areeka web V2 API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Global filters
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter),
    new ZodExceptionFilter(),
  );

  await app.listen(port, () =>
    logger.log(
      `server REST Apis started: listen on port: ${port} - Check server health using /api/monitoring/health endpoint`,
    ),
  );
}

bootstrap().catch((err) => {
  console.error('Error during application bootstrap:', err);
  process.exit(1); // Exit with error code
});
