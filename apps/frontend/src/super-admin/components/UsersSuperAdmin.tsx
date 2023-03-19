import { User } from "@use-miller/shared-api-client";
import React from "react";
import { useFormattedDate } from "../../hooks/useFormattedDate.js";

const UsersSuperAdmin = ({
    allUsers,
    title,
}: {
    allUsers: User[];
    title: string;
}) => {
    return (
        <div className="ml-16">
            <h1 className="text-4xl font-bold text-white">{title}</h1>
            <div className="mt-8 flow-root">
                <div className="-mx-6 -my-2 overflow-x-auto lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-3 text-sm font-semibold text-left text-white py-3.5"
                                    >
                                        Id
                                    </th>
                                    <th
                                        scope="col"
                                        className="pl-6 pr-3 text-sm font-semibold text-left text-white py-3.5 sm:pl-0"
                                    >
                                        First name
                                    </th>
                                    <th
                                        scope="col"
                                        className="pl-6 pr-3 text-sm font-semibold text-left text-white py-3.5 sm:pl-0"
                                    >
                                        Surname
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-3 text-sm font-semibold text-left text-white py-3.5"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 text-sm font-semibold text-left text-white py-3.5"
                                    >
                                        Joined
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-3 text-sm font-semibold text-left text-white py-3.5"
                                    >
                                        Uuid
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 text-sm font-semibold text-left text-white py-3.5"
                                    >
                                        Auth0 Id
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {allUsers &&
                                    allUsers.map((user) => {
                                        const createdDate = useFormattedDate(
                                            user.createdDate
                                        );
                                        return (
                                            <tr key={user.id}>
                                                <td className="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                    {user.id}
                                                </td>
                                                <td className="py-4 pl-6 pr-3 text-sm font-medium text-white whitespace-nowrap sm:pl-0">
                                                    {user.givenName}
                                                </td>
                                                <td className="py-4 pl-6 pr-3 text-sm font-medium text-white whitespace-nowrap sm:pl-0">
                                                    {user.familyName}
                                                </td>

                                                <td className="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                    {user.email}
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                    {createdDate}
                                                </td>

                                                <td className="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                    {user.uuid}
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                    {user.auth0UserId}
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersSuperAdmin;
