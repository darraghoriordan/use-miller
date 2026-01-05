"use client";

import { FadeInOnScroll } from "../../components/Animations";
import { OssProjectCard } from "./OssProjectCard";
import { ossProjects } from "./ossProjects";

export function OpenSourceSection() {
    return (
        <section className="mt-24 md:mt-32">
            <FadeInOnScroll>
                <div className="flex items-center gap-4 mb-8">
                    <span className="font-mono text-sm text-product-eslint uppercase tracking-wider">
                        Free & Open Source
                    </span>
                    <div className="h-px flex-1 bg-security-border" />
                </div>
            </FadeInOnScroll>

            <div className="space-y-8">
                {ossProjects.map((project, index) => (
                    <FadeInOnScroll key={project.id} delay={0.1 * (index + 1)}>
                        <OssProjectCard project={project} />
                    </FadeInOnScroll>
                ))}
            </div>
        </section>
    );
}
