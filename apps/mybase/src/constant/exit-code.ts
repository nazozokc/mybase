import { consola } from "consola";

export const ExitCode = async (error: unknown): Promise<void> => {
  if (error instanceof Error && error.name === "ExitPromptError") {
    console.log("\nfinish process");
    process.exitCode = 130;
  } else {
    consola.error(error);
  }
};
