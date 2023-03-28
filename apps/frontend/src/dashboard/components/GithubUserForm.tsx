import StyledButton from "../../components/StyledButton.jsx";

export const GithubUserForm = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-white w-full mb-8">
                Organisation Repository Settings
            </h2>
            <form action="/onboarding/save-gh-username" method="post">
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
        </div>
    );
};
