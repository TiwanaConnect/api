import { Injectable } from "@nestjs/common";
import { db } from "../fake-db";

// Define the ChatCompletionTool interface
export interface ChatCompletionTool {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters?: {
      type: string;
      properties?: Record<string, { type: string }>;
      required?: string[];
    };
  };
}

@Injectable()
export class ToolService {
  getToolSpecs(): ChatCompletionTool[] {
    return [
      {
        type: "function",
        function: {
          name: "addExpense",
          description: "Add a new expense entry",
          parameters: {
            type: "object",
            properties: {
              name: { type: "string" },
              amount: { type: "string" },
            },
            required: ["name", "amount"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "addIncome",
          description: "Add a new income entry",
          parameters: {
            type: "object",
            properties: {
              name: { type: "string" },
              amount: { type: "string" },
            },
            required: ["name", "amount"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "getTotalExpense",
          description: "Calculate total expenses",
          parameters: {
            type: "object",
            properties: {
              from: { type: "string" },
              to: { type: "string" },
            },
            required: ["from", "to"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "getMoneyBalance",
          description: "Get total income minus expenses",
        },
      },
    ];
  }

  async runTool(name: string, args: any): Promise<string> {
    switch (name) {
      case "addExpense":
        db.expenses.push({ name: args.name, amount: parseFloat(args.amount) });
        return `✅ Added expense: ${args.name} — ${args.amount} INR`;

      case "addIncome":
        db.incomes.push({ name: args.name, amount: parseFloat(args.amount) });
        return `✅ Added income: ${args.name} — ${args.amount} INR`;

      case "getTotalExpense":
        const total = db.expenses.reduce((acc, e) => acc + e.amount, 0);
        return `💸 Total expenses: ${total} INR`;

      case "getMoneyBalance":
        const income = db.incomes.reduce((acc, i) => acc + i.amount, 0);
        const expense = db.expenses.reduce((acc, e) => acc + e.amount, 0);
        const balance = income - expense;
        return `💰 Current Balance: ${balance} INR`;

      default:
        return "❌ Unknown tool function.";
    }
  }
}
