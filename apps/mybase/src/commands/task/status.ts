import { readTask } from "../../task/readTask.ts";
import { displayTaskTable } from "../../task/table.ts";
import { statusprompt } from "../../constant/status-prompt.ts";
import { consola } from "consola";

export const filterTasksByStatus = async (): Promise<void> => {
  const tasks = await readTask();

  if (tasks === undefined) {
    consola.info("No tasks found");
    return;
  }

  const selectedStatus = await statusprompt();
  const filteredTasks = tasks.filter((task) => task.status === selectedStatus);

  await displayTaskTable(filteredTasks);
};
