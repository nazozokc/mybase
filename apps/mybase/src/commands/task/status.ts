import { select } from "@inquirer/prompts";
import { readTask } from "../../task/readTask.ts";
import { displayTaskTable } from "../../task/table.ts";
import { statusprompt } from "../../constant/status-prompt.ts";

export const filterTasksByStatus = async (): Promise<void> => {
  const tasks = await readTask();

  const selectedStatus = await statusprompt();
  const filteredTasks = tasks.filter((task) => task.status === selectedStatus);

  await displayTaskTable(filteredTasks);
};
