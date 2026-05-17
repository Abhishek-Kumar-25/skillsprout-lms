import { useEffect, useState } from "react";

import PageLayout from "../components/PageLayout";

import API from "../services/api";

import {
    FaTrophy,
    FaMedal,
    FaCrown,
    FaFire
} from "react-icons/fa";

export default function Leaderboard() {

    const [users, setUsers] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchLeaderboard();

    }, []);

    const fetchLeaderboard = async () => {

        try {

            const response =
                await API.get(
                    "/user/leaderboard"
                );

            setUsers(
                response.data
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    const getRankBadge = (
        index
    ) => {

        if (index === 0) {

            return "🥇";
        }

        if (index === 1) {

            return "🥈";
        }

        if (index === 2) {

            return "🥉";
        }

        return `#${index + 1}`;
    };

    return (

        <PageLayout>

            <div
                className=
                "container-fluid py-2"
            >

                {/* HEADER */}

                <div
                    className=
                    "leaderboard-header mb-5"
                >

                    <div>

                        <h1
                            className=
                            "fw-bold mb-2"
                        >

                            <FaTrophy
                                className="me-3"
                                style={{
                                    color: "#F59E0B"
                                }}
                            />

                            Leaderboard

                        </h1>

                        <p className="text-secondary m-0">

                            Top learners ranked by XP

                        </p>

                    </div>

                    <div className="leaderboard-badge">

                        🔥 Competitive Learning

                    </div>

                </div>

                {/* TOP 3 */}

                {

                    users.length >= 3

                    &&

                    <div className="row g-4 mb-5">

                        {/* SECOND */}

                        <div className="col-lg-4">

                            <div
                                className=
                                "top-user-card silver-card"
                            >

                                <div className="top-rank">

                                    🥈

                                </div>

                                <h4 className="fw-bold">

                                    {users[1]?.name}

                                </h4>

                                <p className="text-secondary">

                                    Level {users[1]?.level}

                                </p>

                                <div className="xp-box">

                                    {users[1]?.xp} XP

                                </div>

                            </div>

                        </div>

                        {/* FIRST */}

                        <div className="col-lg-4">

                            <div
                                className=
                                "top-user-card gold-card"
                            >

                                <FaCrown
                                    className=
                                    "crown-icon"
                                />

                                <div className="top-rank">

                                    🥇

                                </div>

                                <h3 className="fw-bold">

                                    {users[0]?.name}

                                </h3>

                                <p className="text-secondary">

                                    Level {users[0]?.level}

                                </p>

                                <div className="xp-box">

                                    {users[0]?.xp} XP

                                </div>

                            </div>

                        </div>

                        {/* THIRD */}

                        <div className="col-lg-4">

                            <div
                                className=
                                "top-user-card bronze-card"
                            >

                                <div className="top-rank">

                                    🥉

                                </div>

                                <h4 className="fw-bold">

                                    {users[2]?.name}

                                </h4>

                                <p className="text-secondary">

                                    Level {users[2]?.level}

                                </p>

                                <div className="xp-box">

                                    {users[2]?.xp} XP

                                </div>

                            </div>

                        </div>

                    </div>
                }

                {/* TABLE */}

                <div className="leaderboard-table">

                    {

                        loading

                        ?

                        <div
                            className=
                            "text-center py-5"
                        >

                            <h4 className="fw-bold">

                                Loading Leaderboard...

                            </h4>

                        </div>

                        :

                        <div className="table-responsive">

                            <table
                                className=
                                "table align-middle"
                            >

                                <thead>

                                    <tr>

                                        <th>
                                            Rank
                                        </th>

                                        <th>
                                            Learner
                                        </th>

                                        <th>
                                            XP
                                        </th>

                                        <th>
                                            Level
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        users.map(
                                            (
                                                user,
                                                index
                                            ) => (

                                                <tr
                                                    key={user.id}
                                                >

                                                    <td>

                                                        <span
                                                            className=
                                                            "rank-badge"
                                                        >

                                                            {
                                                                getRankBadge(
                                                                    index
                                                                )
                                                            }

                                                        </span>

                                                    </td>

                                                    <td>

                                                        <div
                                                            className=
                                                            "d-flex align-items-center gap-3"
                                                        >

                                                            <div
                                                                className=
                                                                "avatar-circle"
                                                            >

                                                                {
                                                                    user.name
                                                                    ?.charAt(0)
                                                                }

                                                            </div>

                                                            <div>

                                                                <h6
                                                                    className=
                                                                    "fw-bold m-0"
                                                                >

                                                                    {
                                                                        user.name
                                                                    }

                                                                </h6>

                                                                <small
                                                                    className=
                                                                    "text-secondary"
                                                                >

                                                                    SkillSprout Learner

                                                                </small>

                                                            </div>

                                                        </div>

                                                    </td>

                                                    <td>

                                                        <span
                                                            className=
                                                            "xp-pill"
                                                        >

                                                            <FaFire />

                                                            {user.xp} XP

                                                        </span>

                                                    </td>

                                                    <td>

                                                        <span
                                                            className=
                                                            "level-pill"
                                                        >

                                                            Level {user.level}

                                                        </span>

                                                    </td>

                                                    <td>

                                                        {

                                                            index === 0

                                                            ?

                                                            <span
                                                                className=
                                                                "status champion"
                                                            >

                                                                Champion

                                                            </span>

                                                            :

                                                            <span
                                                                className=
                                                                "status active"
                                                            >

                                                                Active

                                                            </span>
                                                        }

                                                    </td>

                                                </tr>
                                            )
                                        )
                                    }

                                </tbody>

                            </table>

                        </div>
                    }

                </div>

            </div>

            <style>

                {`

                    .leaderboard-header {

                        display: flex;

                        justify-content: space-between;

                        align-items: center;

                        flex-wrap: wrap;

                        gap: 20px;
                    }

                    .leaderboard-badge {

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #7C3AED
                        );

                        color: white;

                        padding: 14px 20px;

                        border-radius: 14px;

                        font-weight: 600;
                    }

                    .top-user-card {

                        background: white;

                        border-radius: 24px;

                        padding: 35px;

                        text-align: center;

                        position: relative;

                        box-shadow:
                        0 8px 24px rgba(0,0,0,0.06);

                        transition: 0.3s;
                    }

                    .top-user-card:hover {

                        transform:
                        translateY(-6px);
                    }

                    .gold-card {

                        border:
                        3px solid #F59E0B;
                    }

                    .silver-card {

                        border:
                        3px solid #9CA3AF;
                    }

                    .bronze-card {

                        border:
                        3px solid #D97706;
                    }

                    .top-rank {

                        font-size: 50px;

                        margin-bottom: 10px;
                    }

                    .xp-box {

                        margin-top: 15px;

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #7C3AED
                        );

                        color: white;

                        padding: 12px;

                        border-radius: 14px;

                        font-weight: 700;
                    }

                    .crown-icon {

                        position: absolute;

                        top: -15px;

                        right: 20px;

                        color: #F59E0B;

                        font-size: 34px;
                    }

                    .leaderboard-table {

                        background: white;

                        border-radius: 24px;

                        padding: 25px;

                        box-shadow:
                        0 8px 24px rgba(0,0,0,0.05);
                    }

                    table thead tr {

                        background: #111827;

                        color: white;
                    }

                    table th {

                        padding: 18px !important;

                        border: none !important;
                    }

                    table td {

                        padding: 20px !important;

                        vertical-align: middle;
                    }

                    tbody tr {

                        transition: 0.3s;
                    }

                    tbody tr:hover {

                        background: #F9FAFB;
                    }

                    .rank-badge {

                        font-size: 20px;

                        font-weight: 700;
                    }

                    .avatar-circle {

                        width: 48px;

                        height: 48px;

                        border-radius: 50%;

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #7C3AED
                        );

                        color: white;

                        display: flex;

                        align-items: center;

                        justify-content: center;

                        font-weight: bold;

                        font-size: 18px;
                    }

                    .xp-pill {

                        background: #FEF3C7;

                        color: #92400E;

                        padding: 10px 14px;

                        border-radius: 999px;

                        display: inline-flex;

                        align-items: center;

                        gap: 8px;

                        font-weight: 600;
                    }

                    .level-pill {

                        background: #EEF2FF;

                        color: #4F46E5;

                        padding: 10px 14px;

                        border-radius: 999px;

                        font-weight: 600;
                    }

                    .status {

                        padding: 10px 14px;

                        border-radius: 999px;

                        font-weight: 600;
                    }

                    .champion {

                        background: #DCFCE7;

                        color: #166534;
                    }

                    .active {

                        background: #DBEAFE;

                        color: #1D4ED8;
                    }

                `}
            </style>

        </PageLayout>
    );
}