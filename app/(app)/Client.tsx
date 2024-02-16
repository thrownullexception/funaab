"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AppShell } from "@/components/layouts/shell";
import { Icons } from "@/components/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSchema } from "./schema";
import { calculateDensity } from "./utils";


export function Client({
  onSubmit,
}: {
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      material: "",
      sampleId: "",
      sampleMass: "",
      sampleHeight: "",
      sampleRadius: "",
      energy: "",
    },
  });

  const density = calculateDensity(form.watch());

  return (
    <AppShell>
      <div className="flex gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <AppShell.Header heading={"Module 1: Material Definition"} />

            <FormField
              control={form.control}
              name="material"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Example: soil, water</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sampleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sample ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Example: SOS1, LT 4</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sampleMass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sample Mass</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Mass of sample in grams</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sampleHeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sample Height</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>Height of sample in cm</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sampleRadius"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sample Container Radius</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Radius of sample container in cm
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AppShell.Header heading={"Module 2: Assigned Efficiency"} />

            <FormItem>
              <FormLabel>Sample Density</FormLabel>
              <FormControl>
                <Input type="number" disabled={true} value={density} />
              </FormControl>
              <FormDescription>
                Density of sample in g/cm<sup>3</sup>
              </FormDescription>
              <FormMessage />
            </FormItem>

            {density < 0.11 || density > 1.29 ? (
              <Alert variant="destructive">
                <Icons.warning className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Density of sample is out of range
                </AlertDescription>
              </Alert>
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="energy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Energy of Interest</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Energy of Interest" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1460">1460 keV</SelectItem>
                          <SelectItem value="1764">1764 keV</SelectItem>
                          <SelectItem value="2614">2614 keV</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Submit</Button>
              </>
            )}
          </form>
        </Form>
      </div>
    </AppShell>
  );
}
