import { Controller, Get, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody } from "@nestjs/swagger";
import { LoggerService } from "./common/infrastructure";
import { ConfigService } from "@nestjs/config";
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  MemoryHealthIndicator,
} from "@nestjs/terminus";
import { IHealthChecks } from "./common/interface";
import { AgentService } from "./common/infrastructure/AI/agent/agent.service";
import { db } from "./common/infrastructure/AI/fake-db";
// import { Public } from 'src/auth/decorator';

@Controller("")
@ApiTags("Monitoring Système")
export class AppController {
  private readonly healthChecks: IHealthChecks;

  constructor(
    configService: ConfigService,
    private readonly logger: LoggerService,
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
    private readonly agentService: AgentService,
  ) {
    this.healthChecks = configService.get<IHealthChecks>("healthChecks")!;
  }

  @Get("/health")
  @HealthCheck()
  async healthCheck(): Promise<HealthCheckResult> {
    this.logger.info("Running Health checks...");
    return this.health.check([
      async () =>
        this.memory.checkHeap(
          "memory_heap",
          this.healthChecks.maxMemoryHeapInMo * 1024 * 1024,
        ),
      async () =>
        this.memory.checkRSS(
          "memory_rss",
          this.healthChecks.maxMemoryRSSInMo * 1024 * 1024,
        ),
    ]);
  }

  @Post()
  @ApiOperation({ summary: "Send a message to the AI agent" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "I earned 5000 and spent 2000 on food.",
        },
      },
    },
  })
  async handleChat(@Body("message") message: string) {
    console.log(db);
    const response = await this.agentService.callAgent(message);
    console.log("db-------------------", db, "response:-----------", response);

    return { response };
  }
}
