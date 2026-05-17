import { Navigate } from "react-router-dom";

export default function AdminRoute({
    children
}) {

    // GET TOKEN

    const token =
        localStorage.getItem(
            "token"
        );

    // GET ROLE

    const role =
        localStorage.getItem(
            "role"
        );

    // IF NOT LOGGED IN

    if (!token) {

        return (
            <Navigate to="/login" />
        );
    }

    // IF NOT ADMIN

    if (
        role !== "ROLE_ADMIN"
    ) {

        return (
            <Navigate to="/dashboard" />
        );
    }

    // ALLOW ACCESS

    return children;
}