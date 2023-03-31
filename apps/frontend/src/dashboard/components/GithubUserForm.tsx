import { OrgGithubUserDto } from "@use-miller/shared-api-client";
import { useState } from "react";
import StyledButton from "../../components/StyledButton.jsx";

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

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(
            `/api/onboarding/set-gh-username`,
            options
        );

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const savedUser = (await response.json()) as OrgGithubUserDto;
        setUsername(savedUser.ghUsername);
    };
    return (
        <div>
            <h2 className="text-3xl font-bold text-white w-full mb-8">
                Github User
            </h2>
            {localUsername && (
                <>
                    <p className="text-white mb-8">
                        Your configured Github username is:{" "}
                        <strong>{localUsername}</strong>
                    </p>
                    <p className="text-white mb-8">
                        This user will get access to relevant repos
                    </p>
                </>
            )}
            {!localUsername && (
                <form onSubmit={handleSubmit} method="post">
                    <label htmlFor="ghUsername" className="block text-white">
                        Github username
                    </label>
                    <div className="md:flex space-x-4 items-center">
                        <div>
                            <input
                                className="mb-4 md:mb-0"
                                type="text"
                                id="ghUsername"
                                name="ghUsername"
                                required
                                minLength={2}
                                maxLength={200}
                            />
                        </div>
                        <StyledButton type="submit" color="green">
                            Save
                        </StyledButton>
                    </div>
                </form>
            )}
        </div>
    );
};
