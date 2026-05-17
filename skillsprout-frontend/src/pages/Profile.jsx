import { useEffect, useState } from "react";

import PageLayout from "../components/PageLayout";

import API from "../services/api";

import {
    FaUserGraduate,
    FaFire,
    FaTrophy,
    FaBolt,
    FaMedal,
    FaCode,
    FaCrown,
    FaBookOpen,
    FaBrain,
    FaRocket,
    FaClock
} from "react-icons/fa";

export default function Profile() {

    const [profile, setProfile] =
        useState(null);

    useEffect(() => {

        fetchProfile();

    }, []);

    const fetchProfile = async () => {

        try {

            const response =
                await API.get(
                    "/user/profile"
                );

            setProfile(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    if (!profile) {

        return (

            <PageLayout>

                <div className="loading-screen">

                    <div className="loader"></div>

                    <h3>

                        Loading Profile...

                    </h3>

                </div>

            </PageLayout>
        );
    }

    return (

        <PageLayout>

            <div className="profile-page">

                {/* HERO */}

                <div className="profile-hero">

                    <div className="hero-overlay"></div>

                    <div className="profile-left">

                        <div className="profile-avatar">

                            <img
                                src=
                                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"

                                alt="profile"
                            />

                            <div className="online-dot"></div>

                        </div>

                        <div>

                            <div className="badge-role">

                                <FaCrown />

                                Elite Learner

                            </div>

                            <h1>

                                {profile.name}

                            </h1>

                            <p>

                                {profile.email}

                            </p>

                        </div>

                    </div>

                    <div className="hero-right">

                        <div className="xp-ring">

                            <div className="xp-inner">

                                <span>

                                    {profile.xp}

                                </span>

                                <small>

                                    XP

                                </small>

                            </div>

                        </div>

                    </div>

                </div>

                {/* STATS */}

                <div className="stats-grid">

                    <div className="stat-card">

                        <div className="stat-icon blue">

                            <FaBolt />

                        </div>

                        <div>

                            <h6>

                                Total XP

                            </h6>

                            <h2>

                                {profile.xp}

                            </h2>

                        </div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-icon green">

                            <FaTrophy />

                        </div>

                        <div>

                            <h6>

                                Current Level

                            </h6>

                            <h2>

                                {profile.level}

                            </h2>

                        </div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-icon orange">

                            <FaFire />

                        </div>

                        <div>

                            <h6>

                                Learning Streak

                            </h6>

                            <h2>

                                {profile.streak}

                            </h2>

                        </div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-icon purple">

                            <FaMedal />

                        </div>

                        <div>

                            <h6>

                                Rank Status

                            </h6>

                            <h2>

                                Pro

                            </h2>

                        </div>

                    </div>

                </div>

                {/* DETAILS */}

                <div className="details-grid">

                    {/* PROFILE OVERVIEW */}

                    <div className="details-card">

                        <div className="card-header">

                            <FaUserGraduate />

                            Profile Overview

                        </div>

                        <div className="info-row">

                            <span>

                                Full Name

                            </span>

                            <strong>

                                {profile.name}

                            </strong>

                        </div>

                        <div className="info-row">

                            <span>

                                Email

                            </span>

                            <strong>

                                {profile.email}

                            </strong>

                        </div>

                        <div className="info-row">

                            <span>

                                Learning Mode

                            </span>

                            <strong>

                                Active 🚀

                            </strong>

                        </div>

                        <div className="info-row">

                            <span>

                                Skill Rank

                            </span>

                            <strong>

                                Advanced

                            </strong>

                        </div>

                    </div>

                    {/* SMART INSIGHTS */}

                    <div className="details-card">

                        <div className="card-header">

                            <FaBrain />

                            Smart Insights

                        </div>

                        <div className="insights-grid">

                            <div className="insight-card">

                                <div className="insight-icon blue-bg">

                                    <FaBookOpen />

                                </div>

                                <div>

                                    <h5>

                                        12 Courses

                                    </h5>

                                    <p>

                                        Courses Explored

                                    </p>

                                </div>

                            </div>

                            <div className="insight-card">

                                <div className="insight-icon purple-bg">

                                    <FaRocket />

                                </div>

                                <div>

                                    <h5>

                                        Fast Learner

                                    </h5>

                                    <p>

                                        Growth Category

                                    </p>

                                </div>

                            </div>

                            <div className="insight-card">

                                <div className="insight-icon orange-bg">

                                    <FaClock />

                                </div>

                                <div>

                                    <h5>

                                        28 Hours

                                    </h5>

                                    <p>

                                        Total Study Time

                                    </p>

                                </div>

                            </div>

                            <div className="insight-card">

                                <div className="insight-icon green-bg">

                                    <FaTrophy />

                                </div>

                                <div>

                                    <h5>

                                        Top 10%

                                    </h5>

                                    <p>

                                        Leaderboard Rank

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <style>

                {`

                    .profile-page {

                        min-height: 100vh;

                        background:
                        linear-gradient(
                            135deg,
                            #F8FAFC,
                            #EEF2FF
                        );

                        padding: 24px;
                    }

                    /* LOADING */

                    .loading-screen {

                        height: 100vh;

                        display: flex;

                        flex-direction: column;

                        align-items: center;

                        justify-content: center;

                        gap: 20px;
                    }

                    .loader {

                        width: 60px;

                        height: 60px;

                        border-radius: 50%;

                        border:
                        5px solid #E5E7EB;

                        border-top:
                        5px solid #6366F1;

                        animation:
                        spin 1s linear infinite;
                    }

                    @keyframes spin {

                        to {

                            transform:
                            rotate(360deg);
                        }
                    }

                    /* HERO */

                    .profile-hero {

                        position: relative;

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #7C3AED
                        );

                        border-radius: 32px;

                        padding: 40px;

                        display: flex;

                        justify-content: space-between;

                        align-items: center;

                        overflow: hidden;

                        color: white;

                        box-shadow:
                        0 20px 40px rgba(99,102,241,0.25);
                    }

                    .hero-overlay {

                        position: absolute;

                        inset: 0;

                        background:
                        radial-gradient(
                            circle at top right,
                            rgba(255,255,255,0.15),
                            transparent 40%
                        );
                    }

                    .profile-left {

                        display: flex;

                        align-items: center;

                        gap: 28px;

                        z-index: 2;
                    }

                    .profile-avatar {

                        position: relative;
                    }

                    .profile-avatar img {

                        width: 130px;

                        height: 130px;

                        border-radius: 50%;

                        border:
                        5px solid rgba(255,255,255,0.3);

                        object-fit: cover;

                        background: white;
                    }

                    .online-dot {

                        width: 22px;

                        height: 22px;

                        background: #22C55E;

                        border-radius: 50%;

                        position: absolute;

                        bottom: 10px;

                        right: 10px;

                        border:
                        4px solid white;
                    }

                    .badge-role {

                        display: inline-flex;

                        align-items: center;

                        gap: 8px;

                        background:
                        rgba(255,255,255,0.15);

                        padding: 10px 16px;

                        border-radius: 999px;

                        margin-bottom: 18px;

                        font-size: 14px;

                        font-weight: 600;
                    }

                    .profile-left h1 {

                        font-size: 44px;

                        font-weight: 800;

                        margin: 0;
                    }

                    .profile-left p {

                        margin-top: 10px;

                        font-size: 16px;

                        opacity: 0.9;
                    }

                    /* XP RING */

                    .xp-ring {

                        width: 180px;

                        height: 180px;

                        border-radius: 50%;

                        background:
                        conic-gradient(
                            #fff 0deg,
                            #C4B5FD 280deg,
                            rgba(255,255,255,0.2) 280deg
                        );

                        display: flex;

                        align-items: center;

                        justify-content: center;

                        z-index: 2;
                    }

                    .xp-inner {

                        width: 135px;

                        height: 135px;

                        border-radius: 50%;

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #7C3AED
                        );

                        display: flex;

                        flex-direction: column;

                        align-items: center;

                        justify-content: center;
                    }

                    .xp-inner span {

                        font-size: 42px;

                        font-weight: 800;
                    }

                    .xp-inner small {

                        font-size: 14px;

                        opacity: 0.8;
                    }

                    /* STATS */

                    .stats-grid {

                        margin-top: 28px;

                        display: grid;

                        grid-template-columns:
                        repeat(4, 1fr);

                        gap: 20px;
                    }

                    .stat-card {

                        background: white;

                        border-radius: 24px;

                        padding: 24px;

                        display: flex;

                        align-items: center;

                        gap: 18px;

                        box-shadow:
                        0 10px 25px rgba(0,0,0,0.05);

                        transition: 0.3s;
                    }

                    .stat-card:hover {

                        transform:
                        translateY(-5px);
                    }

                    .stat-icon {

                        width: 70px;

                        height: 70px;

                        border-radius: 22px;

                        display: flex;

                        align-items: center;

                        justify-content: center;

                        font-size: 28px;

                        color: white;
                    }

                    .blue {

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #3B82F6
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

                    .orange {

                        background:
                        linear-gradient(
                            135deg,
                            #F97316,
                            #FB923C
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

                    .stat-card h6 {

                        color: #6B7280;

                        margin-bottom: 8px;
                    }

                    .stat-card h2 {

                        margin: 0;

                        font-size: 32px;

                        font-weight: 800;
                    }

                    /* DETAILS */

                    .details-grid {

                        margin-top: 28px;

                        display: grid;

                        grid-template-columns:
                        1fr 1fr;

                        gap: 24px;
                    }

                    .details-card {

                        background: white;

                        border-radius: 28px;

                        padding: 30px;

                        box-shadow:
                        0 10px 25px rgba(0,0,0,0.05);
                    }

                    .card-header {

                        display: flex;

                        align-items: center;

                        gap: 12px;

                        font-size: 22px;

                        font-weight: 700;

                        margin-bottom: 28px;

                        color: #111827;
                    }

                    .info-row {

                        display: flex;

                        justify-content: space-between;

                        padding: 18px 0;

                        border-bottom:
                        1px solid #F1F5F9;
                    }

                    .info-row span {

                        color: #6B7280;
                    }

                    .info-row strong {

                        color: #111827;
                    }

                    /* INSIGHTS */

                    .insights-grid {

                        display: grid;

                        grid-template-columns:
                        repeat(2,1fr);

                        gap: 18px;
                    }

                    .insight-card {

                        display: flex;

                        align-items: center;

                        gap: 16px;

                        padding: 20px;

                        border-radius: 22px;

                        background:
                        linear-gradient(
                            135deg,
                            #F8FAFC,
                            #EEF2FF
                        );

                        border:
                        1px solid #E5E7EB;

                        transition: 0.3s;
                    }

                    .insight-card:hover {

                        transform:
                        translateY(-4px);

                        box-shadow:
                        0 10px 20px rgba(0,0,0,0.08);
                    }

                    .insight-icon {

                        width: 60px;

                        height: 60px;

                        border-radius: 18px;

                        display: flex;

                        align-items: center;

                        justify-content: center;

                        color: white;

                        font-size: 24px;
                    }

                    .blue-bg {

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #3B82F6
                        );
                    }

                    .purple-bg {

                        background:
                        linear-gradient(
                            135deg,
                            #7C3AED,
                            #A855F7
                        );
                    }

                    .orange-bg {

                        background:
                        linear-gradient(
                            135deg,
                            #F97316,
                            #FB923C
                        );
                    }

                    .green-bg {

                        background:
                        linear-gradient(
                            135deg,
                            #10B981,
                            #22C55E
                        );
                    }

                    .insight-card h5 {

                        margin: 0;

                        font-size: 24px;

                        font-weight: 800;

                        color: #111827;
                    }

                    .insight-card p {

                        margin: 4px 0 0;

                        color: #6B7280;

                        font-size: 14px;
                    }

                    /* RESPONSIVE */

                    @media (max-width: 1200px) {

                        .stats-grid {

                            grid-template-columns:
                            repeat(2,1fr);
                        }

                        .details-grid {

                            grid-template-columns:
                            1fr;
                        }
                    }

                    @media (max-width: 768px) {

                        .profile-hero {

                            flex-direction: column;

                            gap: 30px;

                            text-align: center;
                        }

                        .profile-left {

                            flex-direction: column;
                        }

                        .stats-grid {

                            grid-template-columns:
                            1fr;
                        }

                        .insights-grid {

                            grid-template-columns:
                            1fr;
                        }
                    }

                `}

            </style>

        </PageLayout>
    );
}