import { consola } from "consola";

export const ExitCode = async (error: unknown): Promise<void> => {
  if (error instanceof Error && error.name === "ExitPromptError") {
    console.log("\nキャンセルされました");
    process.exitCode = 130;
    return;
  } else {
    consola.error(error);
  }
};
