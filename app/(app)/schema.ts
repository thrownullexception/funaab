import { z } from "zod";

export const FormSchema = z.object({
  material: z.string().min(1, {
    message: "Required",
  }),
  sampleId: z.string().min(1, {
    message: "Required",
  }),
  sampleMass: z.string().min(1, {
    message: "Required",
  }),
  sampleHeight: z.string().min(1, {
    message: "Required",
  }),
  sampleRadius: z.string().min(1, {
    message: "Required",
  }),
  energy: z.string().min(1, {
    message: "Required",
  }),
  sampleVolume: z.string().min(1, {
    message: "Required",
  }),
  counts: z.string().min(1, {
    message: "Required",
  }),
  liveTime: z.string().min(1, {
    message: "Required",
  }),
});
