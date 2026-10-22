import { readTask } from "../../task/readTask.ts";
import { displayTaskTable } from "../../task/table.ts";
import { ExitCode } from "../../constant/exit-code.ts";
import { priorityPrompt } from "../../constant/priority-prompt.ts";

export const priority = async (): Promise<void> => {
  try {
    const task = await readTask();

    const selected = await priorityPrompt();
    const filter = task.filter((task) => task.priority === selected);

    await displayTaskTable(filter);
  } catch (error) {
    ExitCode(error);
    throw error;
  }
};
