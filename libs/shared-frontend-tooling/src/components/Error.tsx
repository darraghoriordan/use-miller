import { useAuth0 } from "@auth0/auth0-react";
import StyledButton from "./StyledButton.js";

export const Error = ({ message }: { message: string }) => {
    const { logout } = useAuth0();

    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex flex-col items-center justify-center min-h-full p-8 mt-8 text-center space-y-8">
                <div className="max-w-lg text-lg">{message}</div>
                <StyledButton onClick={() => logout()}>
                    Logout to attempt a reset
                </StyledButton>
            </div>
        </div>
    );
};
