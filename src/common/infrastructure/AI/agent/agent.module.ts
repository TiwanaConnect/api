import { Module } from "@nestjs/common";
import { AgentService } from "./agent.service";
import { ToolModule } from "../tool/tool.module";

@Module({
  controllers: [],
  providers: [AgentService],
  imports: [ToolModule],
  exports: [AgentService],
})
export class AgentModule {}
