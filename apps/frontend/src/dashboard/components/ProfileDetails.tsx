"use client";

import type { components } from "../../shared/types/api-specs";
type User = components["schemas"]["User"];
import { useFormattedDate } from "../../hooks/useFormattedDate";
import { FadeInOnScroll } from "../../components/Animations";

export const ProfileDetails = ({ currentUser }: { currentUser: User }) => {
    const formattedDate = useFormattedDate(currentUser?.createdDate);

    return (
        <div className="flex-1 py-8 px-8 md:px-12">
            <FadeInOnScroll>
                <h1 className="font-display text-2xl md:text-3xl text-security-light mb-2">
                    Profile
                </h1>
                <p className="text-security-muted text-sm mb-8">
                    Manage your account settings
                </p>
                <div className="h-px bg-security-border mb-8" />
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.1}>
                <div className="bg-security-dark border border-security-border rounded-lg p-6 space-y-6">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-wider text-security-muted mb-1">
                            Email
                        </p>
                        <p className="text-security-light">
                            {currentUser.email}
                        </p>
                    </div>
                    <div>
                        <p className="font-mono text-xs uppercase tracking-wider text-security-muted mb-1">
                            Member Since
                        </p>
                        <p className="text-security-light">{formattedDate}</p>
                    </div>
                </div>
            </FadeInOnScroll>
        </div>
    );
};
