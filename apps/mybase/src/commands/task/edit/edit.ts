import { input, select, checkbox } from "@inquirer/prompts";
import { TaskTagSave, type TagType } from "../../../task/tags/TaskTagSave.ts";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getRootDir } from "../../../constant/app.ts";
import { TaskTagRead } from "../../../task/tags/TaskTagRead.ts";
import type { Task } from "../../../task/type.ts";

export const tagChangeAction = async (filePath: string): Promise<TagType> => {
  const action = await select({
    message: "create or select?",
    choices: ["create", "select"],
  });

  const tags: TagType = [];

  switch (action) {
    case "create":
      const tag = await input({
        message: "create and select tags",
      });

      const splitTags = tag.split(",").map((tag) => tag.trim());

      await TaskTagSave(splitTags);

      tags.push(...splitTags);
      break;

    case "select":
      const avalaibleTags = await TaskTagRead();
      const readTaskFile = await readFile(filePath, "utf-8");
      const parsed: Task = JSON.parse(readTaskFile);
      const choices = [];

      const includetags = avalaibleTags.map((tag) => ({
        name: tag,
        value: tag,
        checked: parsed.tag.includes(tag),
      }));

      choices.push(...includetags);

      const selected = await checkbox({
        message: "checked tags",
        choices,
        validate: (selected) => {
          if (selected.length === 0) {
            return "少なくとも一つ選択してください";
          }

          return true;
        },
      });

      tags.push(...selected);

      break;
  }

  return tags;
};
