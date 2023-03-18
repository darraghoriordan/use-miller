import { User } from "@use-miller/shared-api-client";
import { useFormattedDate } from "../../hooks/useFormattedDate.js";

export const ProfileDetails = ({ currentUser }: { currentUser: User }) => {
    const formattedDate = useFormattedDate(currentUser?.createdDate);
    return (
        <div className="ml-16 min-w-[33%]">
            <h1 className="text-3xl font-bold text-white">Profile</h1>
            <p className="text-sm py-2 text-white">Manage your profile</p>
            <hr className="border-green-500/30"></hr>
            <div className="ml-3 mt-16 mb-32 flex flex-col space-y-8">
                <div className="">
                    <p className="mb-1 font-bold text-white">Email</p>
                    <p className=" text-white">{currentUser.email}</p>
                </div>
                <div className="">
                    <p className="mb-1 font-bold text-white">Member since</p>
                    <p className="text-white">{formattedDate}</p>
                </div>
            </div>
        </div>
    );
};
