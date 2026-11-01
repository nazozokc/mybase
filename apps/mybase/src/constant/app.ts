import { join } from "node:path";
import { mkdir } from "node:fs/promises";
import { readConfig } from "../config/configRead.ts";

export const CLI_COMMAND_NAME = "mybase-cli";

export const getRootDir = async (): Promise<string> => {
  const config = await readConfig();
  return join(config.save_directory);
};

export const getTaskDir = async (): Promise<string> => {
  await mkdir(join(String(await getRootDir()), "task"), { recursive: true });
  return join(String(await getRootDir()), "task");
};

export const getDiaryDir = async (): Promise<string> => {
  await mkdir(join(String(await getRootDir()), "diary"), { recursive: true });
  return join(String(await getRootDir()), "diary");
};

export const getTemplateDir = async (): Promise<string> => {
  await mkdir(join(String(await getRootDir()), "template"), {
    recursive: true,
  });
  return join(String(await getRootDir()), "template");
};

export const getNoteDir = async (): Promise<string> => {
  await mkdir(join(String(await getRootDir()), "note"), { recursive: true });
  return join(String(await getRootDir()), "note");
};
