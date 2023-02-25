import { useAuth0 } from "@auth0/auth0-react";
import logo from "../transp-windmill.png";
import StyledButton from "@use-miller/shared-frontend-tooling/src/components/StyledButton";

export const Error = ({ message }: { message: string }) => {
    const { logout } = useAuth0();

    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex flex-col items-center justify-center min-h-full p-4 text-center space-y-8">
                <img src={logo} alt="Logo" className="h-48 mb-8" />
                <div className="text-lg">{message}</div>
                <StyledButton onClick={() => logout()}>
                    Logout to attempt a reset
                </StyledButton>
            </div>
        </div>
    );
};
