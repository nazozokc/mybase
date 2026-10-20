import { input, select, checkbox } from "@inquirer/prompts";
import { writeTask } from "../../task/writeTask.ts";
import { TaskTagSave, type TagType } from "../../task/tags/TaskTagSave.ts";
import { TaskTagRead } from "../../task/tags/TaskTagRead.ts";
import type { Task, TaskCreate } from "../../task/type.ts";
import { ExitCode } from "../../constant/exit-code.ts";
import { priorityPrompt } from "../../constant/priority-prompt.ts";
import { statusprompt } from "../../constant/status-prompt.ts";

const controller = new AbortController();

process.on("SIGINT", () => {
  controller.abort();
  process.exitCode = 130;
});

export const tagAction = async (tagArg?: TagType): Promise<TagType> => {
  try {
    if (tagArg !== undefined) {
      await TaskTagSave(tagArg);
      return tagArg;
    } else {
      const action = await select({
        message: "create or select?",
        choices: ["create", "select"],
      });

      const tags: TagType = [];

      if (action === "create") {
        const tag = await input({
          message: "create and select tags",
        });

        const splitTags = tag.split(",").map((tag) => tag.trim());

        await TaskTagSave(splitTags);

        tags.push(...splitTags);
      }

      if (action === "select") {
        const availableTags = await TaskTagRead();

        const selectedTags = await checkbox({
          message: "select tags",
          choices: availableTags,
        });

        tags.push(...selectedTags);
      }

      return tags;
    }
  } catch (error) {
    ExitCode(error);

    throw error;
  }
};

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
      detailArg?.padStart(2, "0") ??
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
