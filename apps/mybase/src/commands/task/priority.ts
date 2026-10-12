import { select } from "@inquirer/prompts";
import { readTask } from "../../task/readTask.ts";
import { displayTaskTable } from "../../task/table.ts";
import { ExitCode } from "../../constant/exit-code.ts";

export const priority = async (): Promise<void> => {
  try {
    const task = await readTask();

    const selected = await select({
      message: "Select priority",
      choices: [
        { name: "Low", value: "Low" },
        { name: "Medium", value: "Medium" },
        { name: "High", value: "High" },
        { name: "Extra High", value: "Extra-high" },
      ],
    });

    const filter = task.filter((task) => task.priority === selected);

    await displayTaskTable(filter);
  } catch (error) {
    ExitCode(error);
    throw error;
  }
};
