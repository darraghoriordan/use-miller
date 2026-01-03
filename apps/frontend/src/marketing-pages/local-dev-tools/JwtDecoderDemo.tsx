"use client";

import { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { SecurityBadge } from "../../components/SecurityBadge";

// Real JWT token (shortened for display)
const JWT_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzEyMzQ1IiwibmFtZSI6IkFsZXggQ2hlbiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNDA2NzIwMH0.kP9wL2mZx8vQhN3...";

type AnimationPhase = "typing" | "processing" | "decoded" | "complete";

export function JwtDecoderDemo() {
    const [charCount, setCharCount] = useState(0);
    const [phase, setPhase] = useState<AnimationPhase>("typing");
    const prefersReducedMotion = useReducedMotion();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // If user prefers reduced motion, show everything immediately
        if (prefersReducedMotion) {
            setCharCount(JWT_TOKEN.length);
            setPhase("complete");
            return;
        }

        const clearAllTimeouts = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };

        const runAnimation = () => {
            let currentIndex = 0;
            setCharCount(0);
            setPhase("typing");

            const typeNextChar = () => {
                if (currentIndex < JWT_TOKEN.length) {
                    currentIndex++;
                    setCharCount(currentIndex);
                    // Ultra fast typing: 10ms per character
                    timeoutRef.current = setTimeout(typeNextChar, 10);
                } else {
                    // Typing complete, brief processing pause
                    setPhase("processing");
                    timeoutRef.current = setTimeout(() => {
                        setPhase("decoded");
                        // After showing decoded, wait then mark complete
                        timeoutRef.current = setTimeout(() => {
                            setPhase("complete");
                            // Reset and replay after 7 seconds
                            timeoutRef.current = setTimeout(runAnimation, 7000);
                        }, 500);
                    }, 300);
                }
            };

            // Start typing after initial delay
            timeoutRef.current = setTimeout(typeNextChar, 500);
        };

        runAnimation();

        return clearAllTimeouts;
    }, [prefersReducedMotion]);

    const showDecoded = phase === "decoded" || phase === "complete";

    return (
        <div
            className="space-y-4"
            style={{
                contain: "layout style paint",
                isolation: "isolate",
            }}
        >
            {/* Input Section - Fixed height to prevent layout shift */}
            <div>
                <label className="block text-xs font-mono text-security-muted uppercase tracking-wider mb-2">
                    JWT Token
                </label>
                <div
                    className="bg-security-black border border-security-border rounded-md p-3 overflow-hidden"
                    style={{ height: "84px" }}
                >
                    <div className="relative font-mono text-sm">
                        {/* Invisible text to maintain layout */}
                        <span
                            className="break-all text-transparent select-none"
                            aria-hidden="true"
                        >
                            {JWT_TOKEN}
                        </span>
                        {/* Visible text overlay - clipped to charCount */}
                        <span
                            className="absolute inset-0 break-all text-product-localtools"
                            style={{
                                clipPath: `inset(0 ${100 - (charCount / JWT_TOKEN.length) * 100}% 0 0)`,
                            }}
                        >
                            {JWT_TOKEN}
                        </span>
                        {/* Cursor */}
                        {phase === "typing" && (
                            <span
                                className="absolute w-[2px] bg-product-localtools animate-pulse"
                                style={{
                                    height: "1.2em",
                                    left: `${(charCount / JWT_TOKEN.length) * 100}%`,
                                    top: 0,
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Output Section - Fixed height */}
            <div>
                <label className="block text-xs font-mono text-security-muted uppercase tracking-wider mb-2">
                    Decoded Payload
                </label>
                <div
                    className="bg-security-black border border-security-border rounded-md p-3 relative"
                    style={{
                        height: "160px",
                        borderColor: showDecoded
                            ? "rgba(0, 212, 255, 0.3)"
                            : undefined,
                        transition: "border-color 0.3s",
                    }}
                >
                    {/* Decoded JSON - always rendered, visibility controlled */}
                    <pre
                        className="font-mono text-sm absolute inset-3 transition-opacity duration-300"
                        style={{ opacity: showDecoded ? 1 : 0 }}
                    >
                        <code>
                            <span className="text-security-muted">{"{"}</span>
                            {"\n"}
                            <span>
                                {"  "}
                                <span className="text-security-muted">
                                    &quot;sub&quot;
                                </span>
                                <span className="text-security-muted">: </span>
                                <span className="text-product-localtools">
                                    &quot;user_12345&quot;
                                </span>
                                <span className="text-security-muted">,</span>
                                {"\n"}
                            </span>
                            <span>
                                {"  "}
                                <span className="text-security-muted">
                                    &quot;name&quot;
                                </span>
                                <span className="text-security-muted">: </span>
                                <span className="text-product-localtools">
                                    &quot;Alex Chen&quot;
                                </span>
                                <span className="text-security-muted">,</span>
                                {"\n"}
                            </span>
                            <span>
                                {"  "}
                                <span className="text-security-muted">
                                    &quot;role&quot;
                                </span>
                                <span className="text-security-muted">: </span>
                                <span className="text-product-localtools">
                                    &quot;admin&quot;
                                </span>
                                <span className="text-security-muted">,</span>
                                {"\n"}
                            </span>
                            <span>
                                {"  "}
                                <span className="text-security-muted">
                                    &quot;iat&quot;
                                </span>
                                <span className="text-security-muted">: </span>
                                <span className="text-amber-400">
                                    1704067200
                                </span>
                                {"\n"}
                            </span>
                            <span className="text-security-muted">{"}"}</span>
                        </code>
                    </pre>

                    {/* Placeholder states - always rendered, visibility controlled */}
                    <div
                        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                        style={{
                            opacity: phase === "processing" ? 1 : 0,
                            pointerEvents:
                                phase === "processing" ? "auto" : "none",
                        }}
                    >
                        <span className="text-security-muted font-mono text-sm animate-pulse">
                            Decoding...
                        </span>
                    </div>
                    <div
                        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                        style={{
                            opacity: phase === "typing" ? 1 : 0,
                            pointerEvents: phase === "typing" ? "auto" : "none",
                        }}
                    >
                        <span className="text-security-muted/50 font-mono text-sm">
                            Paste a JWT to decode
                        </span>
                    </div>
                </div>
            </div>

            {/* Security Badge - always rendered, visibility controlled */}
            <div
                className="flex justify-center pt-2 transition-opacity duration-300"
                style={{ opacity: showDecoded ? 1 : 0 }}
            >
                <SecurityBadge icon="lock" variant="accent">
                    Decoded locally &bull; No network requests
                </SecurityBadge>
            </div>
        </div>
    );
}
