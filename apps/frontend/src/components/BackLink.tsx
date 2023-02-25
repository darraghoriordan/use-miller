import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export const BackLink = ({ to }: { to: string }) => {
    return (
        <Link to={to} className="flex items-center my-6 hover:underline">
            <ArrowLongLeftIcon className="w-5 h-5 mr-2" /> Back
        </Link>
    );
};
