import { z } from "zod";

// refineでisAbsolute(絶対パス)か検証
export const ConfigSchema = z.object({
  save_directory: z.string(),
});

export type ConfigType = z.infer<typeof ConfigSchema>;
