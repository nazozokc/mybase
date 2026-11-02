import { input } from "@inquirer/prompts";
import { writeTask } from "../../../task/writeTask.ts";
import { tagAction } from "./tagAction.ts";
import type { TagType } from "../../../task/tags/TaskTagSave.ts";
import type { Task, TaskCreate } from "../../../task/type.ts";
import { ExitCode } from "../../../constant/exit-code.ts";
import { priorityPrompt } from "../../../constant/priority-prompt.ts";
import { statusprompt } from "../../../constant/status-prompt.ts";

const controller = new AbortController();

process.on("SIGINT", () => {
  controller.abort();
  process.exitCode = 130;
});

export const add = async (
  titleArg?: string,
  detailArg?: string,
  dueDateArg?: string,
  priorityArg?: Task["priority"],
  tagArg?: TagType,
  statusArg?: Task["status"],
): Promise<void> => {
  try {
    const title =
      titleArg ??
      (await input({
        message: "task title",
      }));

    const detail =
      detailArg ??
      (await input({
        message: "task detail",
      }));

    const now = new Date();
    const getDate = String(now.getDate()).padStart(2, "0");

    const dueDate =
      dueDateArg ??
      (await input({
        message: "goal date",
        default: `${now.getFullYear()}-${now.getMonth() + 1}-${getDate}`,
      }));

    const priority = priorityArg ?? (await priorityPrompt());

    const tag = await tagAction(tagArg);

    const status = statusArg ?? (await statusprompt());

    const task: TaskCreate = {
      title,
      detail,
      dueDate,
      priority,
      tag,
      status,
    };

    await writeTask(task);
  } catch (error) {
    ExitCode(error);
    throw error;
  }
};
