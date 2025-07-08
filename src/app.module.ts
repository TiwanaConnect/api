import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { Neo4jModule } from './common/infrastructure';
import { PrismaModule } from './common/infrastructure';
import { GeoModule } from './common/infrastructure';
import { TerminusModule } from '@nestjs/terminus';
import { CacheModule } from '@nestjs/cache-manager';
import { EmailModule } from './common/infrastructure';
import { SecurityModule } from './common/infrastructure';
import { LoggerModule } from './common/infrastructure';
// import { RedisModule } from './common/infrastructure/store/redis/redis.module';
import config from './config/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    Neo4jModule,
    PrismaModule,
    GeoModule,
    EmailModule,
    SecurityModule,
    LoggerModule,
    TerminusModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: `.env`,
      load: [config],
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 60000, // milliseconds
      max: 100, // maximum number
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    ScheduleModule.forRoot(),
    // RedisModule,
  ],
  controllers: [AppController],
  providers: [Logger],
})
export class AppModule {}
