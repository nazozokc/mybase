import { input, select, checkbox } from "@inquirer/prompts";
import { ExitCode } from "../../../constant/exit-code.ts";
import { TaskTagSave, type TagType } from "../../../task/tags/TaskTagSave.ts";
import { TaskTagRead } from "../../../task/tags/TaskTagRead.ts";

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
