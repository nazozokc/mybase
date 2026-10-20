import { select } from "@inquirer/prompts";
import type { TaskCreate } from "../task/type.ts";

export const priorityPrompt = async (): Promise<TaskCreate["priority"]> => {
  const priority = await select({
    message: "Select priority",
    choices: [
      { name: "Low", value: "Low" },
      { name: "Medium", value: "Medium" },
      { name: "High", value: "High" },
      { name: "Extra High", value: "Extra-high" },
    ],
  });
  return priority;
};
