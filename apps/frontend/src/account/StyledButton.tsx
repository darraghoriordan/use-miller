import { PropsWithChildren } from "react";

const StyledButton = ({
    onClick,
    children,
}: PropsWithChildren & { onClick: () => void }) => {
    return (
        <button
            type="button"
            onClick={() => onClick()}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
        >
            {children}
        </button>
    );
};

export default StyledButton;
