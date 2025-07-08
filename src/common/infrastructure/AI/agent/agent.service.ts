import { Injectable } from "@nestjs/common";
import Groq from "groq-sdk";
import { ToolService, ChatCompletionTool } from "../tool/tool.service";

@Injectable()
export class AgentService {
  private groq: Groq;
  private messages: any[] = [];

  constructor(private readonly toolService: ToolService) {
    this.groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // Initial system message
    this.messages.push({
      role: "system",
      content: `You are Josh, a smart personal finance assistant.
You have tools to manage expenses and income. Use them when helpful.

Current datetime: ${new Date().toUTCString()}`,
    });
  }

  async callAgent(userMessage: string): Promise<string> {
    // 1. Add user input
    this.messages.push({
      role: "user",
      content: userMessage,
    });

    // 2. First agent call to possibly invoke tools
    const first = await this.groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: this.messages,
      tools: this.toolService.getToolSpecs() as ChatCompletionTool[],
    });

    const agentMsg = first.choices[0].message;
    this.messages.push(agentMsg);

    const toolCalls = agentMsg.tool_calls;

    // 3. If no tools called, return direct message
    if (!toolCalls) {
      return agentMsg.content || "No response.";
    }

    // 4. Run each tool
    for (const tool of toolCalls) {
      const result = await this.toolService.runTool(
        tool.function.name,
        JSON.parse(tool.function.arguments),
      );

      this.messages.push({
        role: "tool",
        tool_call_id: tool.id,
        content: result,
      });
    }

    // 5. Second call to finalize response with tool outputs
    const second = await this.groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: this.messages,
    });

    const finalMsg = second.choices[0].message;
    this.messages.push(finalMsg);

    return finalMsg.content || "Done.";
  }
}
