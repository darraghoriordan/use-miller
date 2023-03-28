import StyledButton from "../../components/StyledButton.jsx";

export const GithubUserForm = ({
    ghUsername,
}: {
    ghUsername: string | undefined;
}) => {
    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            ghUsername: { value: string };
        };
        const data = {
            ghUsername: target.ghUsername.value,
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
        const result = await response.json();
        alert(`Is this your full name: ${result.data}`);
    };
    return (
        <div>
            <h2 className="text-3xl font-bold text-white w-full mb-8">
                Organisation Repository Settings
            </h2>
            {ghUsername && (
                <p className="text-white mb-8">
                    Your configured Github username is: {ghUsername}
                </p>
            )}
            {!ghUsername && (
                <form onSubmit={handleSubmit} method="post">
                    <label htmlFor="ghUsername" className="block text-white">
                        Github username
                    </label>
                    <input
                        className="mb-4"
                        type="text"
                        id="ghUsername"
                        name="ghUsername"
                        required
                        minLength={2}
                        maxLength={200}
                    />
                    <StyledButton type="submit" color="green">
                        Save
                    </StyledButton>
                </form>
            )}
        </div>
    );
};
