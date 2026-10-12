import { NoteTagRead } from "../../note/book/NoteTagRead.ts";
import { checkbox } from "@inquirer/prompts";
import { NoteTagWrite } from "../../note/book/NoteTagWrite.ts";
import { ExitCode } from "../../constant/exit-code.ts";

export const bookdel = async (): Promise<void> => {
  try {
    const choices = await NoteTagRead();
    const selected = await checkbox({
      message: "select delete tags",
      choices,
    });

    const saves = choices.filter((sel) => !selected.includes(sel));

    await NoteTagWrite(saves);
  } catch (error) {
    ExitCode(error);
  }
};
