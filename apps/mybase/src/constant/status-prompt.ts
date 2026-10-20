import { select } from "@inquirer/prompts";
import type { TaskCreate } from "../task/type.ts";

export const statusprompt = async (): Promise<TaskCreate["status"]> => {
  const status = await select({
    message: "Select Status",
    choices: [
      { name: "To Do", value: "Todo" },
      { name: "Pending", value: "Pending" },
      { name: "In Progress", value: "In-Progress" },
      { name: "Done", value: "Done" },
    ],
  });

  return status;
};
