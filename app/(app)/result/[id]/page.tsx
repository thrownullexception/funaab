import { AppShell } from "@/components/layouts/shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getDomainData } from "../../db";
import { FormSchema } from "../../schema";
import { z } from "zod";
import { calculateActivityConcentration, calculateDensity, calculateEffiency } from "../../utils";
import { Icons } from "@/components/icons";

export default async function Result(params: {params: { id: string }}) {
  const allData = await getDomainData<z.infer<typeof FormSchema>>();

  const id = params.params.id;

  const currentData = allData[id];

    if(!currentData){
        return       <Alert variant="destructive">
        <Icons.warning className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
         Data does not exist
        </AlertDescription>
      </Alert>
    }

  const density = calculateDensity(currentData);

  return (
    <AppShell>
      <div className="flex gap-4">
        <div className="w-1/3">
          <AppShell.Header heading={"Calculated"} />
          <div className="grid gap-1 mt-6">
            <p className="text-lg text-muted-foreground">Material </p>
            <h1 className="font-heading text-3xl md:text-4xl">
              {currentData.material}
            </h1>
          </div>

          <div className="grid gap-1 mt-6">
            <p className="text-lg text-muted-foreground">Sample ID </p>
            <h1 className="font-heading text-3xl md:text-4xl">
              {currentData.sampleId}
            </h1>
          </div>

          <div className="grid gap-1 mt-6">
            <p className="text-lg text-muted-foreground">Density </p>
            <h1 className="font-heading text-3xl md:text-4xl">
              {density.toFixed(2)}
              <span className="text-lg">{" "}
                g/cm<sup>3</sup>
              </span>
            </h1>
          </div>

          <div className="grid gap-1 mt-6">
            <p className="text-lg text-muted-foreground">Energy </p>
            <h1 className="font-heading text-3xl md:text-4xl">
              {currentData.energy}
              <span className="text-lg">{" "}keV</span>
            </h1>
          </div>

          <div className="grid gap-1 mt-6">
            <p className="text-lg text-muted-foreground">Efficiency </p>
            <h1 className="font-heading text-3xl md:text-4xl">
              {calculateEffiency(currentData).toFixed(5)}
              <span className="text-lg">{" "}keV</span>
            </h1>
          </div>

          <div className="grid gap-1 mt-6">
            <p className="text-lg text-muted-foreground">Activity Concentration </p>
            <h1 className="font-heading text-3xl md:text-4xl">
              {calculateActivityConcentration(currentData).toFixed(5)}
              <span className="text-lg">{" "}Bq/g</span>
            </h1>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
