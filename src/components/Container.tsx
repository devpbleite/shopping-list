import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("w-full max-w-2xl mx-auto p-4", className)}>
      <div
        className={cn(
          "w-full",
          "md:bg-white/80 md:backdrop-blur-xl md:rounded-xl md:shadow-lg md:border md:border-violet-100 md:p-6"
        )}
      >
        {children}
      </div>
    </div>
  );
}
