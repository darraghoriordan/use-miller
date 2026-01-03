import type { components } from "../../shared/types/api-specs";
type OrgGithubUserDto = components["schemas"]["OrgGithubUserDto"];
import { useState } from "react";
import StyledButton from "../../components/StyledButton";

export const GithubUserForm = ({
    ghUsername,
    orgUuid,
}: {
    ghUsername: string | undefined;
    orgUuid: string;
}) => {
    const [localUsername, setUsername] = useState(ghUsername);

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            ghUsername: { value: string };
        };
        const data = {
            ghUsername: target.ghUsername.value,
            orgUuid: orgUuid,
        };

        const JSONdata = JSON.stringify(data);

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSONdata,
        };

        const response = await fetch(
            `/api/onboarding/set-gh-username`,
            options,
        );

        const savedUser = (await response.json()) as OrgGithubUserDto;
        setUsername(savedUser.ghUsername);
    };

    return (
        <div className="bg-security-dark border border-security-border rounded-lg p-6">
            <div className="flex items-center gap-4 mb-6">
                <h2 className="font-display text-xl text-security-light">
                    GitHub Account
                </h2>
                <div className="h-px flex-1 bg-security-border" />
            </div>

            {localUsername && (
                <div className="space-y-2">
                    <p className="font-mono text-xs uppercase tracking-wider text-security-muted">
                        Connected Account
                    </p>
                    <p className="text-security-light font-mono">
                        {localUsername}
                    </p>
                    <p className="text-security-text text-sm mt-4">
                        This GitHub user will get access to any relevant repos
                        for purchased products.
                    </p>
                </div>
            )}

            {!localUsername && (
                <form onSubmit={handleSubmit}>
                    <p className="text-security-text text-sm mb-4">
                        Enter your GitHub username to get access to relevant
                        repos for purchased products.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <label
                                htmlFor="ghUsername"
                                className="block font-mono text-xs uppercase tracking-wider text-security-muted mb-2"
                            >
                                GitHub Username
                            </label>
                            <input
                                className="w-full bg-security-darker border border-security-border rounded-md px-4 py-2 text-security-light placeholder:text-security-muted focus:border-accent focus:ring-1 focus:ring-accent/50 outline-none transition-colors"
                                type="text"
                                id="ghUsername"
                                name="ghUsername"
                                placeholder="username"
                                required
                                minLength={2}
                                maxLength={200}
                            />
                        </div>
                        <div className="flex items-end">
                            <StyledButton type="submit" color="primary">
                                Save
                            </StyledButton>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};
