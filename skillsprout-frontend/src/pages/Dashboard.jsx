import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import PageLayout from "../components/PageLayout";

import API from "../services/api";

import {
    FaBolt,
    FaBookOpen,
    FaTrophy,
    FaFire,
    FaRobot,
    FaMedal,
    FaCode,
    FaPalette,
    FaSearch,
    FaBrain
} from "react-icons/fa";

export default function Dashboard() {

    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);

    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {

        fetchDashboardData();

    }, []);

    const fetchDashboardData = async () => {

        try {

            const profileResponse =
                await API.get("/user/profile");

            const progressResponse =
                await API.get("/user/progress");

            setProfile(profileResponse.data);

            setEnrollments(progressResponse.data);

        } catch (error) {

            console.log(error);
        }
    };

    if (!profile) {

        return (

            <PageLayout>

                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                        height: "80vh"
                    }}
                >

                    <h3 className="fw-bold">
                        Loading Dashboard...
                    </h3>

                </div>

            </PageLayout>
        );
    }

    const totalCourses = enrollments.length;

    const recentCourse = enrollments[0];

    return (

        <PageLayout>

            {/* HEADER */}

            <div
                className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4"
            >

                <div>

                    <h2 className="fw-bold mb-1">
                        My Dashboard
                    </h2>

                    <p className="text-secondary m-0">
                        Welcome back! Ready to continue learning?
                    </p>

                </div>

                <div className="d-flex align-items-center gap-3">

                    <div className="notification-badge">
                        <FaBolt/>
                    </div>

                    <div className="user-profile-box">

                        <div className="profile-avatar">
                            {profile.name?.charAt(0)}
                        </div>

                        <div>

                            <h6 className="m-0 fw-bold">
                                {profile.name}
                            </h6>

                            <small className="text-secondary">
                                Learner
                            </small>

                        </div>

                    </div>

                </div>

            </div>

            {/* HERO */}

            <div className="hero-section mb-4">

                <div>

                    <h3 className="fw-bold text-white">
                        Good Morning, {profile.name}! 🚀
                    </h3>

                    <p
                        className="text-light m-0"
                        style={{
                            opacity: "0.9"
                        }}
                    >

                        Keep up the great work.
                        Your learning journey continues.

                    </p>

                </div>

                <div className="hero-icon">
                    🌳
                </div>

            </div>

            {/* STATS */}

            <div className="row g-4 mb-4">

                <div className="col-lg-3">

                    <div className="stats-card">

                        <div className="d-flex justify-content-between">

                            <div>

                                <small className="text-secondary">
                                    Total XP
                                </small>

                                <h2 className="fw-bold mt-2">
                                    {profile.xp}
                                </h2>

                            </div>

                            <div className="stats-icon blue">
                                <FaBolt />
                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3">

                    <div className="stats-card">

                        <div className="d-flex justify-content-between">

                            <div>

                                <small className="text-secondary">
                                    Learning Streak
                                </small>

                                <h2 className="fw-bold mt-2">
                                    {profile.streak} days
                                </h2>

                            </div>

                            <div className="stats-icon green">
                                <FaFire />
                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3">

                    <div className="stats-card">

                        <div className="d-flex justify-content-between">

                            <div>

                                <small className="text-secondary">
                                    Active Courses
                                </small>

                                <h2 className="fw-bold mt-2">
                                    {totalCourses}
                                </h2>

                            </div>

                            <div className="stats-icon orange">
                                <FaBookOpen />
                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3">

                    <div className="stats-card">

                        <div className="d-flex justify-content-between">

                            <div>

                                <small className="text-secondary">
                                    Current Level
                                </small>

                                <h2 className="fw-bold mt-2">
                                    {profile.level}
                                </h2>

                            </div>

                            <div className="stats-icon purple">
                                <FaTrophy />
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* CONTINUE LEARNING */}

            <div className="dashboard-card mb-4">

                <h5 className="fw-bold mb-4">
                    ▶ Continue Learning
                </h5>

                {
                    recentCourse

                    ?

                    <div className="learning-progress-box">

                        <div className="d-flex align-items-center gap-3">

                            <div className="course-mini-icon">
                                <FaCode />
                            </div>

                            <div>

                                <h6 className="fw-bold m-0">
                                    {recentCourse.courseTitle}
                                </h6>

                                <small className="text-secondary">
                                    Current progress
                                </small>

                            </div>

                        </div>

                        <div className="mt-3">

                            <div className="progress">

                                <div
                                    className="progress-bar"
                                    style={{
                                        width: `${recentCourse.progress}%`
                                    }}
                                />

                            </div>

                        </div>

                    </div>

                    :

                    <p className="text-secondary">
                        No courses enrolled yet.
                    </p>
                }

            </div>

            {/* QUICK ACTIONS */}

            <div className="mt-4">

                <h5 className="fw-bold mb-3">
                    ⚡ Quick Actions
                </h5>

                <div className="row g-4">

                    <div className="col-lg-3 col-md-6">

                        <button
                            className="quick-action-btn"
                            onClick={() => navigate("/courses")}
                        >

                            <FaSearch />
                            Browse Courses

                        </button>

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <button
                            className="quick-action-btn"
                            onClick={() => navigate("/quiz")}
                        >

                            <FaBrain />
                            Start Quiz

                        </button>

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <button
                            className="quick-action-btn"
                            onClick={() => navigate("/ai-mentor")}
                        >

                            <FaRobot />
                            Ask AI Mentor

                        </button>

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <button
                            className="quick-action-btn"
                            onClick={() => navigate("/leaderboard")}
                        >

                            <FaMedal />
                            View Leaderboard

                        </button>

                    </div>

                </div>

            </div>

            <style>

                {`

                    .hero-section {

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #7C3AED
                        );

                        border-radius: 18px;

                        padding: 30px;

                        display: flex;

                        justify-content: space-between;

                        align-items: center;
                    }

                    .hero-icon {
                        font-size: 55px;
                    }

                    .stats-card {

                        background: white;

                        border-radius: 16px;

                        padding: 25px;

                        box-shadow:
                        0 4px 15px rgba(0,0,0,0.05);
                    }

                    .stats-icon {

                        width: 45px;

                        height: 45px;

                        border-radius: 12px;

                        display: flex;

                        align-items: center;

                        justify-content: center;

                        color: white;
                    }

                    .blue {
                        background: #3B82F6;
                    }

                    .green {
                        background: #10B981;
                    }

                    .orange {
                        background: #F59E0B;
                    }

                    .purple {
                        background: #8B5CF6;
                    }

                    .dashboard-card {

                        background: white;

                        border-radius: 16px;

                        padding: 25px;

                        box-shadow:
                        0 4px 15px rgba(0,0,0,0.05);
                    }

                    .learning-progress-box {

                        background: #F9FAFB;

                        border: 1px solid #E5E7EB;

                        border-radius: 14px;

                        padding: 18px;
                    }

                    .course-mini-icon {

                        width: 50px;

                        height: 50px;

                        border-radius: 12px;

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #7C3AED
                        );

                        display: flex;

                        align-items: center;

                        justify-content: center;

                        color: white;
                    }

                    .progress {

                        height: 10px;

                        border-radius: 20px;

                        background: #E5E7EB;
                    }

                    .progress-bar {

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #7C3AED
                        );
                    }

                    .profile-avatar {

                        width: 42px;

                        height: 42px;

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
                    }

                    .user-profile-box {

                        display: flex;

                        align-items: center;

                        gap: 10px;
                    }

                    .notification-badge {

                        width: 40px;

                        height: 40px;

                        border-radius: 50%;

                        background: white;

                        display: flex;

                        align-items: center;

                        justify-content: center;

                        box-shadow:
                        0 4px 15px rgba(0,0,0,0.08);

                        color: #7C3AED;
                    }

                    .quick-action-btn {

                        width: 100%;

                        border: none;

                        background: white;

                        border-radius: 16px;

                        padding: 20px;

                        font-weight: 600;

                        font-size: 15px;

                        display: flex;

                        align-items: center;

                        justify-content: center;

                        gap: 12px;

                        transition: 0.3s;

                        box-shadow:
                        0 4px 12px rgba(0,0,0,0.05);

                        color: #111827;
                    }

                    .quick-action-btn:hover {

                        transform:
                        translateY(-4px);

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #7C3AED
                        );

                        color: white;
                    }

                `}

            </style>

        </PageLayout>
    );
}
