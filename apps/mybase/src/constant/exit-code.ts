import { consola } from "consola";

export const ExitCode = (error: unknown): never => {
  if (error instanceof Error && error.name === "ExitPromptError") {
    process.exitCode = 130;
    throw "\nfinish process";
  } else {
    throw error;
  }
};
