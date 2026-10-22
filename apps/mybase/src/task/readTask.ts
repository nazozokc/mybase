import { TaskSchema, type Task } from "./type.ts";
import { getTaskDir } from "../constant/app.ts";
import { mkdir, readFile, readdir, access } from "node:fs/promises";
import { join } from "node:path";
import consola from "consola";

export const readTask = async (): Promise<Task[]> => {
  const taskDir = await getTaskDir();
  try {
    await access(taskDir);
  } catch (error) {
    await mkdir(taskDir, { recursive: true });
  }
  const files = await readdir(taskDir);

  if (files === undefined) {
    throw consola.info("No tasks found");
  }
  const tasks = [];

  for (const file of files) {
    if (!file.endsWith(".json")) continue;

    const taskJson = await readFile(join(taskDir, file), "utf-8");

    let parsed: Task;

    try {
      parsed = JSON.parse(taskJson);
    } catch (error) {
      consola.error(error);
      continue;
    }

    const result = TaskSchema.safeParse(parsed);

    if (!result.success) {
      consola.error(`Invalid task: ${file}`);
      consola.error(result.error);
      continue;
    }

    tasks.push(result.data);
  }

  try {
    return tasks;
  } catch (error) {
    throw error;
  }
};
