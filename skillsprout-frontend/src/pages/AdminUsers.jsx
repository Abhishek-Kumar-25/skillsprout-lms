import { useEffect, useState } from "react";

import API from "../services/api";

import {
    FaTrash,
    FaUserShield,
    FaUsers
} from "react-icons/fa";

export default function AdminUsers() {

    const [users, setUsers] =
        useState([]);

    useEffect(() => {

        fetchUsers();

    }, []);

    const fetchUsers = async () => {

        try {

            const response =
                await API.get(
                    "/admin/users"
                );

            setUsers(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    const deleteUser = async (id) => {

        const confirmDelete =
            window.confirm(
                "Delete this user?"
            );

        if (!confirmDelete) return;

        try {

            await API.delete(
                `/admin/users/${id}`
            );

            fetchUsers();

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div
            className="container-fluid p-4"
            style={{
                background:
                    "#f5f7fb",
                minHeight:
                    "100vh"
            }}
        >

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h1
                        className="fw-bold"
                    >
                        <FaUsers />
                        {" "}
                        Manage Users
                    </h1>

                    <p className="text-muted">
                        Admin control panel
                    </p>

                </div>

                <div
                    className="badge bg-primary p-3"
                >
                    Total Users:
                    {" "}
                    {users.length}
                </div>

            </div>

            <div
                className="card border-0 shadow-lg"
                style={{
                    borderRadius:
                        "20px"
                }}
            >

                <div className="card-body">

                    <table className="table align-middle">

                        <thead>

                            <tr>

                                <th>
                                    Name
                                </th>

                                <th>
                                    Email
                                </th>

                                <th>
                                    Role
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                users.map(
                                    (user) => (

                                    <tr
                                        key={user.id}
                                    >

                                        <td>
                                            {user.name}
                                        </td>

                                        <td>
                                            {user.email}
                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    user.role ===
                                                    "ROLE_ADMIN"

                                                    ?

                                                    "badge bg-danger"

                                                    :

                                                    "badge bg-success"
                                                }
                                            >

                                                <FaUserShield />
                                                {" "}
                                                {
                                                    user.role
                                                }

                                            </span>

                                        </td>

                                        <td>

                                            <button

                                                className=
                                                "btn btn-danger"

                                                onClick={() =>
                                                    deleteUser(
                                                        user.id
                                                    )
                                                }
                                            >

                                                <FaTrash />

                                            </button>

                                        </td>

                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}