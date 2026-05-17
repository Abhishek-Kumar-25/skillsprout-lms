import { useEffect, useState } from "react";

import API from "../services/api";

import {
    FaUsers,
    FaBook,
    FaChartLine,
    FaTrash,
    FaGraduationCap,
    FaShieldAlt,
    FaHome,
    FaSignOutAlt,
    FaBars
} from "react-icons/fa";

import {
    useNavigate,
    Link
} from "react-router-dom";

export default function AdminDashboard() {

    const navigate =
        useNavigate();

    const [sidebarOpen, setSidebarOpen] =
        useState(true);

    const [stats, setStats] =
        useState({

            totalUsers: 0,

            totalCourses: 0,

            totalEnrollments: 0
        });

    const [users, setUsers] =
        useState([]);

    const adminName =
        localStorage.getItem("name");

    useEffect(() => {

        fetchStats();

        fetchUsers();

    }, []);

    // FETCH STATS

    const fetchStats =
        async () => {

        try {

            const response =
                await API.get(
                    "/admin/stats"
                );

            setStats(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    // FETCH USERS

    const fetchUsers =
        async () => {

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

    // DELETE USER

    const deleteUser =
        async (id) => {

        const confirmDelete =
            window.confirm(
                "Delete this user?"
            );

        if (!confirmDelete) {

            return;
        }

        try {

            await API.delete(
                `/admin/users/${id}`
            );

            fetchUsers();

            fetchStats();

        } catch (error) {

            console.log(error);
        }
    };

    // LOGOUT

    const handleLogout = () => {

        localStorage.clear();

        navigate("/login");
    };

    return (

        <div className="admin-page">

            {/* SIDEBAR */}

            <div
                className={
                    sidebarOpen
                    ?
                    "sidebar open"
                    :
                    "sidebar"
                }
            >

                <div>

                    {/* LOGO */}

                    <div className="logo-section">

                        <div className="logo-box">

                            <FaShieldAlt />

                        </div>

                        {
                            sidebarOpen && (

                                <div>

                                    <h2>

                                        SkillSprout

                                    </h2>

                                    <p>

                                        Admin Panel

                                    </p>

                                </div>
                            )
                        }

                    </div>

                    {/* MENU */}

                    <div className="menu-list">

                        <Link
                            to="/admin"

                            className=
                            "menu-link"
                        >

                            <div className="menu-item active">

                                <FaHome />

                                {
                                    sidebarOpen &&
                                    "Dashboard"
                                }

                            </div>

                        </Link>

                        <Link
                            to="/admin/users"

                            className=
                            "menu-link"
                        >

                            <div className="menu-item">

                                <FaUsers />

                                {
                                    sidebarOpen &&
                                    "Manage Users"
                                }

                            </div>

                        </Link>

                        <Link
                            to="/admin/courses"

                            className=
                            "menu-link"
                        >

                            <div className="menu-item">

                                <FaBook />

                                {
                                    sidebarOpen &&
                                    "Manage Courses"
                                }

                            </div>

                        </Link>

                    </div>

                </div>

                {/* LOGOUT */}

                <button
                    className="logout-btn"

                    onClick={
                        handleLogout
                    }
                >

                    <FaSignOutAlt />

                    {
                        sidebarOpen &&
                        "Logout"
                    }

                </button>

            </div>

            {/* MAIN CONTENT */}

            <div className="main-content">

                {/* TOPBAR */}

                <div className="topbar">

                    <div className="top-left">

                        <button
                            className="menu-btn"

                            onClick={() =>
                                setSidebarOpen(
                                    !sidebarOpen
                                )
                            }
                        >

                            <FaBars />

                        </button>

                        <div>

                            <h1>

                                Admin Dashboard

                            </h1>

                            <p>

                                Welcome back,
                                {` ${adminName}`}

                            </p>

                        </div>

                    </div>

                    <div className="admin-badge">

                        <FaShieldAlt />

                        ADMIN

                    </div>

                </div>

                {/* STATS */}

                <div className="stats-grid">

                    <div className="stat-card blue">

                        <div>

                            <p>

                                Total Users

                            </p>

                            <h2>

                                {
                                    stats.totalUsers
                                }

                            </h2>

                        </div>

                        <FaUsers />

                    </div>

                    <div className="stat-card purple">

                        <div>

                            <p>

                                Courses

                            </p>

                            <h2>

                                {
                                    stats.totalCourses
                                }

                            </h2>

                        </div>

                        <FaBook />

                    </div>

                    <div className="stat-card orange">

                        <div>

                            <p>

                                Enrollments

                            </p>

                            <h2>

                                {
                                    stats.totalEnrollments
                                }

                            </h2>

                        </div>

                        <FaGraduationCap />

                    </div>

                    <div className="stat-card green">

                        <div>

                            <p>

                                Active Users

                            </p>

                            <h2>

                                {
                                    users.length
                                }

                            </h2>

                        </div>

                        <FaChartLine />

                    </div>

                </div>

                {/* CONTENT */}

                <div className="content-grid">

                    {/* USERS */}

                    <div className="table-card">

                        <div className="card-header">

                            <h3>

                                Recent Users

                            </h3>

                        </div>

                        <table>

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
                                                {user.role}
                                            </td>

                                            <td>

                                                <button
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

                    {/* ACTIVITY */}

                    <div className="activity-card">

                        <h3>

                            Platform Activity

                        </h3>

                        <div className="activity-item">

                            <div className="dot blue-dot"></div>

                            Total Users:
                            {
                                stats.totalUsers
                            }

                        </div>

                        <div className="activity-item">

                            <div className="dot green-dot"></div>

                            Total Courses:
                            {
                                stats.totalCourses
                            }

                        </div>

                        <div className="activity-item">

                            <div className="dot orange-dot"></div>

                            Total Enrollments:
                            {
                                stats.totalEnrollments
                            }

                        </div>

                    </div>

                </div>

            </div>

            <style>

                {`

                    * {

                        margin: 0;

                        padding: 0;

                        box-sizing: border-box;
                    }

                    body {

                        overflow-x: hidden;

                        background: #F8FAFC;
                    }

                    .admin-page {

                        display: flex;

                        min-height: 100vh;

                        background: #F8FAFC;
                    }

                    /* SIDEBAR */

                    .sidebar {

                        width: 95px;

                        background:
                        linear-gradient(
                            180deg,
                            #111827,
                            #1F2937
                        );

                        color: white;

                        display: flex;

                        flex-direction: column;

                        justify-content: space-between;

                        padding: 24px 18px;

                        transition: 0.3s;
                    }

                    .sidebar.open {

                        width: 280px;
                    }

                    .logo-section {

                        display: flex;

                        align-items: center;

                        gap: 16px;

                        margin-bottom: 50px;
                    }

                    .logo-box {

                        width: 58px;

                        height: 58px;

                        border-radius: 18px;

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #8B5CF6
                        );

                        display: flex;

                        align-items: center;

                        justify-content: center;

                        font-size: 24px;
                    }

                    .logo-section h2 {

                        font-size: 24px;

                        margin: 0;
                    }

                    .logo-section p {

                        color: #9CA3AF;

                        font-size: 13px;

                        margin-top: 4px;
                    }

                    /* MENU */

                    .menu-list {

                        display: flex;

                        flex-direction: column;

                        gap: 16px;
                    }

                    .menu-link {

                        text-decoration: none;

                        color: white;
                    }

                    .menu-item {

                        display: flex;

                        align-items: center;

                        gap: 16px;

                        padding: 18px;

                        border-radius: 18px;

                        cursor: pointer;

                        transition: 0.3s;

                        font-weight: 600;
                    }

                    .menu-item:hover {

                        background:
                        rgba(255,255,255,0.08);
                    }

                    .menu-item.active {

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #8B5CF6
                        );
                    }

                    /* LOGOUT */

                    .logout-btn {

                        width: 100%;

                        height: 58px;

                        border: none;

                        border-radius: 18px;

                        background:
                        rgba(255,255,255,0.08);

                        color: white;

                        display: flex;

                        align-items: center;

                        justify-content: center;

                        gap: 12px;

                        font-weight: 600;

                        cursor: pointer;
                    }

                    /* MAIN */

                    .main-content {

                        flex: 1;

                        padding: 32px;
                    }

                    /* TOPBAR */

                    .topbar {

                        display: flex;

                        align-items: center;

                        justify-content: space-between;

                        margin-bottom: 36px;
                    }

                    .top-left {

                        display: flex;

                        align-items: center;

                        gap: 20px;
                    }

                    .menu-btn {

                        width: 52px;

                        height: 52px;

                        border: none;

                        border-radius: 16px;

                        background: white;

                        box-shadow:
                        0 10px 20px rgba(0,0,0,0.05);

                        cursor: pointer;

                        font-size: 18px;
                    }

                    .topbar h1 {

                        font-size: 38px;

                        margin-bottom: 4px;

                        color: #111827;
                    }

                    .topbar p {

                        color: #6B7280;
                    }

                    .admin-badge {

                        display: flex;

                        align-items: center;

                        gap: 10px;

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #8B5CF6
                        );

                        color: white;

                        padding: 14px 20px;

                        border-radius: 18px;

                        font-weight: 700;
                    }

                    /* STATS */

                    .stats-grid {

                        display: grid;

                        grid-template-columns:
                        repeat(4,1fr);

                        gap: 24px;

                        margin-bottom: 30px;
                    }

                    .stat-card {

                        padding: 28px;

                        border-radius: 28px;

                        color: white;

                        display: flex;

                        justify-content: space-between;

                        align-items: center;

                        box-shadow:
                        0 15px 30px rgba(0,0,0,0.08);
                    }

                    .stat-card svg {

                        font-size: 38px;

                        opacity: 0.8;
                    }

                    .stat-card p {

                        margin-bottom: 10px;

                        opacity: 0.9;
                    }

                    .stat-card h2 {

                        font-size: 36px;
                    }

                    .blue {

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #3B82F6
                        );
                    }

                    .purple {

                        background:
                        linear-gradient(
                            135deg,
                            #7C3AED,
                            #A855F7
                        );
                    }

                    .orange {

                        background:
                        linear-gradient(
                            135deg,
                            #F97316,
                            #FB923C
                        );
                    }

                    .green {

                        background:
                        linear-gradient(
                            135deg,
                            #10B981,
                            #22C55E
                        );
                    }

                    /* CONTENT GRID */

                    .content-grid {

                        display: grid;

                        grid-template-columns:
                        2fr 1fr;

                        gap: 24px;
                    }

                    .table-card,
                    .activity-card {

                        background: white;

                        border-radius: 28px;

                        padding: 28px;

                        box-shadow:
                        0 10px 25px rgba(0,0,0,0.05);
                    }

                    .card-header {

                        margin-bottom: 20px;
                    }

                    .card-header h3 {

                        font-size: 24px;

                        color: #111827;
                    }

                    table {

                        width: 100%;

                        border-collapse: collapse;
                    }

                    th {

                        text-align: left;

                        padding-bottom: 16px;

                        color: #6B7280;
                    }

                    td {

                        padding: 18px 0;

                        border-top:
                        1px solid #E5E7EB;
                    }

                    td button {

                        width: 42px;

                        height: 42px;

                        border: none;

                        border-radius: 12px;

                        background:
                        #FEE2E2;

                        color: #DC2626;

                        cursor: pointer;
                    }

                    /* ACTIVITY */

                    .activity-card h3 {

                        margin-bottom: 28px;

                        font-size: 24px;
                    }

                    .activity-item {

                        display: flex;

                        align-items: center;

                        gap: 14px;

                        padding: 16px 0;

                        border-bottom:
                        1px solid #F1F5F9;
                    }

                    .dot {

                        width: 14px;

                        height: 14px;

                        border-radius: 50%;
                    }

                    .blue-dot {

                        background: #2563EB;
                    }

                    .green-dot {

                        background: #10B981;
                    }

                    .orange-dot {

                        background: #F97316;
                    }

                    /* RESPONSIVE */

                    @media (max-width: 1200px) {

                        .stats-grid {

                            grid-template-columns:
                            repeat(2,1fr);
                        }

                        .content-grid {

                            grid-template-columns:
                            1fr;
                        }
                    }

                    @media (max-width: 768px) {

                        .sidebar {

                            position: fixed;

                            z-index: 1000;

                            height: 100vh;
                        }

                        .main-content {

                            margin-left: 95px;

                            padding: 20px;
                        }

                        .stats-grid {

                            grid-template-columns:
                            1fr;
                        }

                        .topbar {

                            flex-direction: column;

                            align-items: flex-start;

                            gap: 20px;
                        }
                    }

                `}

            </style>

        </div>
    );
}