import * as React from "react";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: React.ReactNode;
  icon?: LucideIcon;
  hint?: string;
  accent?: "primary" | "success" | "warning" | "info" | "destructive";
  className?: string;
}

const ACCENTS: Record<string, string> = {
  primary: "bg-primary/10 text-primary border-primary/20",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  info: "bg-info/10 text-info border-info/20",
  destructive: "bg-destructive/10 text-destructive border-destructive/20",
};

export function StatsCard({ label, value, icon: Icon, hint, accent = "primary", className }: StatsCardProps) {
  return (
    <Card className={cn("p-3.5 sm:p-5 transition-all duration-200 hover:shadow-md hover:border-primary/30", className)}>
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{label}</p>
          <p className="mt-1 text-xl sm:text-2xl font-bold tracking-tight">{value}</p>
          {hint && <p className="mt-1 text-[11px] sm:text-xs text-muted-foreground truncate">{hint}</p>}
        </div>
        {Icon && (
          <div className={cn("flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl border", ACCENTS[accent])}>
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
        )}
      </div>
    </Card>
  );
}
