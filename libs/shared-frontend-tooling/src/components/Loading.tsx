export const Loading = ({ message }: { message?: string }) => {
    return (
        <div className="inset-0 z-10 overflow-y-auto">
            <div className="flex flex-col items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
                {message || "Loading..."}
            </div>
        </div>
    );
};
