import { consola } from "consola";

export const ExitCode = (error: unknown): never => {
  if (error instanceof Error && error.name === "ExitPromptError") {
    consola.info("finish process");
    process.exitCode = 130;
  }

  throw error;
};
