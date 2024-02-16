import { z } from "zod";
import { FormSchema } from "./schema";

export const calculateDensity = (input: z.infer<typeof FormSchema>) => {
  const volume = (+input.sampleHeight * +input.sampleRadius) ^ (2 * Math.PI);

  return +input.sampleMass / volume;
};

export const calculateEffiency = (input: z.infer<typeof FormSchema>) => {
  const density = calculateDensity(input);

  if (input.energy === "1460") {
    return 0.0022 * density + 0.0016;
  }
  if (input.energy === "1764") {
    return 0.0018 * density + 0.0013;
  }
  if (input.energy === "2614") {
    return 0.0011 * density + 0.0007;
  }
  return 0;
};
