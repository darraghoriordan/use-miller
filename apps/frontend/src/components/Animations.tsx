"use client";

import { motion } from "motion/react";

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

// Scan line effect (decorative) - Pure CSS for performance
export function ScanLine() {
    return <div className="scan-line hidden md:block" />;
}
