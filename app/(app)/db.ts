import { z } from "zod";
import { FormSchema } from "./schema";
import fs from "fs-extra";
import path from "path";

const pathToConfigDomain = () => {
  const file = `db.json`;
  return path.resolve(process.cwd(), ".config-data", file);
};

export const save =  async (id: string, data: z.infer<typeof FormSchema>) => {
  const domainData = await getDomainData();

  domainData[id] = data;

  await fs.outputJSON(pathToConfigDomain(), domainData, {
    spaces: 2,
  });
};

export const getDomainData = async <T>(): Promise<Record<string, T>> => {
  try {
    return (
      (await fs.readJson(pathToConfigDomain(), {
        throws: false,
      })) || {}
    );
  } catch (error) {
    return {};
  }
};
