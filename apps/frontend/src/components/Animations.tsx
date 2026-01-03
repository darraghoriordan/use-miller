"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";

interface TypewriterTextProps {
    text: string;
    className?: string;
    speed?: number; // ms per character
    delay?: number; // initial delay before typing starts
    showCursor?: boolean;
    onComplete?: () => void;
}

export function TypewriterText({
    text,
    className,
    speed = 80,
    delay = 0,
    showCursor = true,
    onComplete,
}: TypewriterTextProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        // If user prefers reduced motion, show full text immediately
        if (prefersReducedMotion) {
            setDisplayedText(text);
            setIsComplete(true);
            onComplete?.();
            return;
        }

        let timeoutId: NodeJS.Timeout;
        let currentIndex = 0;

        const startTyping = () => {
            const typeNextChar = () => {
                if (currentIndex < text.length) {
                    setDisplayedText(text.slice(0, currentIndex + 1));
                    currentIndex++;
                    timeoutId = setTimeout(typeNextChar, speed);
                } else {
                    setIsComplete(true);
                    onComplete?.();
                }
            };

            timeoutId = setTimeout(typeNextChar, delay);
        };

        startTyping();

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [text, speed, delay, prefersReducedMotion, onComplete]);

    return (
        <span className={clsx("inline-flex items-baseline", className)}>
            <span>{displayedText}</span>
            {showCursor && !isComplete && (
                <motion.span
                    className="inline-block w-[3px] h-[1em] bg-accent ml-0.5"
                    animate={{ opacity: [1, 0] }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />
            )}
            {showCursor && isComplete && (
                <motion.span
                    className="inline-block w-[3px] h-[1em] bg-accent ml-0.5"
                    animate={{ opacity: [1, 0] }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />
            )}
        </span>
    );
}

// Static version for mobile or reduced motion
interface StaticTextWithCursorProps {
    text: string;
    className?: string;
    showCursor?: boolean;
}

export function StaticTextWithCursor({
    text,
    className,
    showCursor = true,
}: StaticTextWithCursorProps) {
    return (
        <span className={clsx("inline-flex items-baseline", className)}>
            <span>{text}</span>
            {showCursor && (
                <motion.span
                    className="inline-block w-[3px] h-[1em] bg-accent ml-0.5"
                    animate={{ opacity: [1, 0] }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />
            )}
        </span>
    );
}

// Animated headline wrapper with stagger effect
interface AnimatedHeadlineProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function AnimatedHeadline({
    children,
    className,
    delay = 0,
}: AnimatedHeadlineProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Fade in on scroll component
interface FadeInOnScrollProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    id?: string;
}

export function FadeInOnScroll({
    children,
    className,
    delay = 0,
    id,
}: FadeInOnScrollProps) {
    return (
        <motion.div
            id={id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Staggered children container
interface StaggerContainerProps {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
}

export function StaggerContainer({
    children,
    className,
    staggerDelay = 0.1,
}: StaggerContainerProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Item to be used within StaggerContainer
interface StaggerItemProps {
    children: React.ReactNode;
    className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Glow card with hover animation
interface GlowCardProps {
    children: React.ReactNode;
    className?: string;
}

export function GlowCard({ children, className }: GlowCardProps) {
    return (
        <motion.div
            className={clsx(
                "relative bg-security-dark border border-security-border rounded-lg transition-colors",
                className,
            )}
            whileHover={{
                borderColor: "rgba(0, 255, 136, 0.5)",
                boxShadow: "0 0 30px rgba(0, 255, 136, 0.15)",
            }}
            transition={{ duration: 0.2 }}
        >
            {children}
        </motion.div>
    );
}

// Scan line effect (decorative) - Pure CSS for performance
export function ScanLine() {
    return <div className="scan-line hidden md:block" />;
}
