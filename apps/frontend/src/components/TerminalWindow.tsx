import clsx from "clsx";
import { PropsWithChildren } from "react";

interface TerminalWindowProps extends PropsWithChildren {
    title?: string;
    className?: string;
    showDots?: boolean;
}

export function TerminalWindow({
    title,
    children,
    className,
    showDots = true,
}: TerminalWindowProps) {
    return (
        <div
            className={clsx(
                "bg-security-dark border border-security-border rounded-lg overflow-hidden",
                "shadow-terminal",
                className,
            )}
        >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-security-darker border-b border-security-border">
                {showDots && (
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/60" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                        <div className="w-3 h-3 rounded-full bg-green-500/60" />
                    </div>
                )}
                {title && (
                    <span className="ml-2 font-mono text-sm text-security-muted truncate">
                        {title}
                    </span>
                )}
            </div>

            {/* Terminal body */}
            <div className="p-4 md:p-6">{children}</div>
        </div>
    );
}

// Variant for code display
interface TerminalCodeProps {
    code: string;
    language?: string;
    title?: string;
    className?: string;
}

export function TerminalCode({
    code,
    language = "bash",
    title,
    className,
}: TerminalCodeProps) {
    return (
        <TerminalWindow
            title={title || `terminal ~ ${language}`}
            className={className}
        >
            <pre className="font-mono text-sm text-security-light overflow-x-auto">
                <code>{code}</code>
            </pre>
        </TerminalWindow>
    );
}

// Simple terminal prompt display
interface TerminalPromptProps {
    command: string;
    output?: string;
    className?: string;
}

export function TerminalPrompt({
    command,
    output,
    className,
}: TerminalPromptProps) {
    return (
        <div className={clsx("font-mono text-sm", className)}>
            <div className="flex items-center gap-2">
                <span className="text-accent">$</span>
                <span className="text-security-light">{command}</span>
            </div>
            {output && (
                <div className="mt-2 text-security-text whitespace-pre-wrap">
                    {output}
                </div>
            )}
        </div>
    );
}
