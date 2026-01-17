import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

export function Container({ children, className }: ContainerProps) {
    return (
        <div className={cn("container mx-auto px-4 py-8 max-w-5xl", className)}>
            {children}
        </div>
    );
}
