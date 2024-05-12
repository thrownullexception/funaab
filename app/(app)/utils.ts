import { z } from "zod";
import { FormSchema } from "./schema";

export const calculateDensity = (input: z.infer<typeof FormSchema>) => {
  const volume = (+input.sampleHeight * +input.sampleRadius) ^ (2 * Math.PI);

  return +input.sampleMass / volume;
};

export const calculateEffiency = (input: z.infer<typeof FormSchema>) => {
  const density = calculateDensity(input);

  const isFullHeight = Number(input.sampleHeight) > 4.5;

  if (isFullHeight) {
    if (input.energy === "1460") {
      return -0.0013 * density + 0.004;
    }
    if (input.energy === "1764") {
      return 0.0011 * density + 0.0033;
    }
    if (input.energy === "2614") {
      return 0.0009 * density + 0.0022;
    }
  } else {
    if (input.energy === "1460") {
      return 0.0009 * density + 0.0054;
    }
    if (input.energy === "1764") {
      return 0.0009 * density + 0.0053;
    }
    if (input.energy === "2614") {
      return 0.0003 * density + 0.0022;
    }
  }

  return 0;
};


export const calculateActivityConcentration = (input: z.infer<typeof FormSchema>) => {
  const efficiency = calculateEffiency(input);

  if(efficiency === 0){
    return 0;
  }

  const countRate = +input.counts / +input.liveTime;

  let background = 0;
  let emissionProbability = 0;

  if(input.energy === "1460"){
    background = 0.0163;
    emissionProbability = 0.107;
  }
  if(input.energy === "1764"){
    background = 0.007;
    emissionProbability = 0.161;
  }
  if(input.energy === "2614"){
    background = 0.035;
    emissionProbability = 0.36;
  }


  const netCountRate = countRate - background;


  return netCountRate/ (emissionProbability * efficiency * Number(input.sampleMass));
}