import logo from "../transp-windmill.png";

export const Loading = ({ message }: { message?: string }) => {
    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex flex-col items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
                <img src={logo} alt="Logo" className="h-48 mb-8" />
                {message || "Loading..."}
            </div>
        </div>
    );
};
