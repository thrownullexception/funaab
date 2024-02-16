import { cn } from "@/lib/utils";
import * as React from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  narrow?: true;
}

export function AppShell({ children, className, narrow, ...props }: IProps) {
  return (
    <div
      className={cn("grid items-start gap-8", className, {
        "mx-auto max-w-2xl": narrow,
      })}
      {...props}
    >
      {children}
    </div>
  );
}

interface IHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

AppShell.Header = function AppHeader({
  heading,
  text,
  children,
}: IHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  );
};
