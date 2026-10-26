import * as React from "react";
import { PackageOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, icon, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-card/40 px-6 py-8 sm:py-12 text-center transition-all",
        className,
      )}
    >
      <div className="mb-3 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-secondary/80 text-muted-foreground">
        {icon || <PackageOpen className="h-6 w-6 sm:h-7 sm:w-7" />}
      </div>
      <h3 className="text-base sm:text-lg font-semibold tracking-tight">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-xs sm:text-sm text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
