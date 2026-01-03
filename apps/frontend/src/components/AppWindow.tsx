"use client";

import clsx from "clsx";

interface AppWindowProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export function AppWindow({ title, children, className }: AppWindowProps) {
    return (
        <div
            className={clsx(
                "bg-security-dark border border-security-border rounded-lg overflow-hidden shadow-lg",
                className,
            )}
        >
            {/* Title bar with traffic lights */}
            <div className="flex items-center justify-between px-4 py-3 bg-security-black border-b border-security-border">
                {/* Traffic lights */}
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27CA40]" />
                </div>

                {/* Centered title */}
                <span className="absolute left-1/2 -translate-x-1/2 font-mono text-sm text-security-muted">
                    {title}
                </span>

                {/* Spacer for balance */}
                <div className="w-14" />
            </div>

            {/* App content */}
            <div className="p-6">{children}</div>
        </div>
    );
}
