import React from "react";
import StyledHeader1 from "../components/StyledHeader1";
import { Container } from "../layout/Container";
import useGetAllUsers from "./admin-apis/useGetAllUsers";

const UsersSuperAdmin = () => {
    const { data } = useGetAllUsers();
    return (
        <Container>
            <StyledHeader1>All Users</StyledHeader1>

            <div className="mt-8 flow-root">
                <div className="-mx-6 -my-2 overflow-x-auto lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="pl-6 pr-3 text-sm font-semibold text-left text-gray-900 py-3.5 sm:pl-0"
                                    >
                                        First name
                                    </th>
                                    <th
                                        scope="col"
                                        className="pl-6 pr-3 text-sm font-semibold text-left text-gray-900 py-3.5 sm:pl-0"
                                    >
                                        Surname
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-3 text-sm font-semibold text-left text-gray-900 py-3.5"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 text-sm font-semibold text-left text-gray-900 py-3.5"
                                    >
                                        Joined
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 text-sm font-semibold text-left text-gray-900 py-3.5"
                                    >
                                        Id
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 text-sm font-semibold text-left text-gray-900 py-3.5"
                                    >
                                        Uuid
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 text-sm font-semibold text-left text-gray-900 py-3.5"
                                    >
                                        Auth0 Id
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data &&
                                    data.map((person) => (
                                        <tr key={person.email}>
                                            <td className="py-4 pl-6 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">
                                                {person.givenName}
                                            </td>
                                            <td className="py-4 pl-6 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">
                                                {person.familyName}
                                            </td>

                                            <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {person.email}
                                            </td>
                                            <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {person.createdDate.toLocaleDateString()}
                                            </td>
                                            <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {person.id}
                                            </td>
                                            <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {person.uuid}
                                            </td>
                                            <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {person.auth0UserId}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default UsersSuperAdmin;
