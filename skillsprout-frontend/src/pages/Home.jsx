import { Link } from "react-router-dom";

import {
    FaGraduationCap,
    FaRobot,
    FaChartLine,
    FaTrophy,
    FaArrowRight,
    FaPlayCircle,
    FaBrain,
    FaCode,
    FaBolt
} from "react-icons/fa";

export default function Home() {

    return (

        <div className="home-page">

            {/* NAVBAR */}

            <nav className="home-navbar">

                <div className="logo-section">

                    <div className="logo-icon">

                        <FaGraduationCap />

                    </div>

                    <h2>

                        SkillSprout

                    </h2>

                </div>

                <div className="nav-buttons">

                    <Link
                        to="/login"
                        className="login-btn"
                    >

                        Login

                    </Link>

                    <Link
                        to="/register"
                        className="register-btn"
                    >

                        Get Started

                    </Link>

                </div>

            </nav>

            {/* HERO SECTION */}

            <section className="hero-section">

                <div className="hero-left">

                    <div className="hero-badge">

                        <FaBolt />

                        AI Powered Learning Platform

                    </div>

                    <h1>

                        Learn Smarter
                        with AI Driven
                        Education 🚀

                    </h1>

                    <p>

                        Master Java, Spring Boot,
                        React, DSA and placements
                        with interactive courses,
                        AI mentorship and futuristic
                        learning experience.

                    </p>

                    <div className="hero-buttons">

                        <Link
                            to="/register"
                            className="primary-btn"
                        >

                            Start Learning

                            <FaArrowRight />

                        </Link>

                        <button
                            className=
                            "secondary-btn"
                        >

                            <FaPlayCircle />

                            Watch Demo

                        </button>

                    </div>

                    {/* STATS */}

                    <div className="hero-stats">

                        <div>

                            <h3>

                                10K+

                            </h3>

                            <p>

                                Learners

                            </p>

                        </div>

                        <div>

                            <h3>

                                120+

                            </h3>

                            <p>

                                Courses

                            </p>

                        </div>

                        <div>

                            <h3>

                                24/7

                            </h3>

                            <p>

                                AI Support

                            </p>

                        </div>

                    </div>

                </div>

                {/* RIGHT SIDE */}

                <div className="hero-right">

                    <div className="floating-card card-one">

                        <FaRobot />

                        <div>

                            <h4>

                                MentorX AI

                            </h4>

                            <p>

                                Instant coding help

                            </p>

                        </div>

                    </div>

                    <div className="floating-card card-two">

                        <FaTrophy />

                        <div>

                            <h4>

                                Leaderboards

                            </h4>

                            <p>

                                Compete with learners

                            </p>

                        </div>

                    </div>

                    <div className="main-glass-card">

                        <div className="glass-top">

                            <div className="glass-circle red"></div>

                            <div className="glass-circle yellow"></div>

                            <div className="glass-circle green"></div>

                        </div>

                        <div className="glass-content">

                            <div className="glass-icon">

                                <FaBrain />

                            </div>

                            <h2>

                                SkillSprout AI

                            </h2>

                            <p>

                                Personalized AI powered
                                learning experience for
                                modern developers.

                            </p>

                            <div className="glass-progress">

                                <div className="progress-fill"></div>

                            </div>

                            <small>

                                Learning Progress 85%

                            </small>

                        </div>

                    </div>

                </div>

            </section>

            {/* FEATURES */}

            <section className="features-section">

                <div className="section-header">

                    <h2>

                        Why Choose SkillSprout?

                    </h2>

                    <p>

                        Everything you need to become
                        industry ready.

                    </p>

                </div>

                <div className="features-grid">

                    <div className="feature-card">

                        <div className="feature-icon blue-bg">

                            <FaRobot />

                        </div>

                        <h3>

                            AI Mentor

                        </h3>

                        <p>

                            Get instant coding help
                            and explanations with
                            MentorX AI assistant.

                        </p>

                    </div>

                    <div className="feature-card">

                        <div className="feature-icon purple-bg">

                            <FaCode />

                        </div>

                        <h3>

                            Real Projects

                        </h3>

                        <p>

                            Build industry level
                            projects using modern
                            technologies.

                        </p>

                    </div>

                    <div className="feature-card">

                        <div className="feature-icon orange-bg">

                            <FaChartLine />

                        </div>

                        <h3>

                            Progress Tracking

                        </h3>

                        <p>

                            Track XP, streaks,
                            levels and achievements
                            visually.

                        </p>

                    </div>

                </div>

            </section>

            <style>

                {`

                    * {

                        margin: 0;

                        padding: 0;

                        box-sizing: border-box;
                    }

                    body {

                        overflow-x: hidden;
                    }

                    .home-page {

                        min-height: 100vh;

                        background:
                        radial-gradient(
                            circle at top left,
                            #312E81,
                            #0F172A 45%,
                            #020617 100%
                        );

                        color: white;

                        overflow: hidden;
                    }

                    /* NAVBAR */

                    .home-navbar {

                        width: 100%;

                        height: 90px;

                        padding: 0 60px;

                        display: flex;

                        align-items: center;

                        justify-content: space-between;

                        position: sticky;

                        top: 0;

                        z-index: 100;

                        backdrop-filter: blur(16px);

                        background:
                        rgba(2,6,23,0.4);

                        border-bottom:
                        1px solid rgba(255,255,255,0.06);
                    }

                    .logo-section {

                        display: flex;

                        align-items: center;

                        gap: 14px;
                    }

                    .logo-icon {

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

                        box-shadow:
                        0 0 25px rgba(124,58,237,0.45);
                    }

                    .logo-section h2 {

                        font-size: 30px;

                        font-weight: 800;
                    }

                    .nav-buttons {

                        display: flex;

                        gap: 16px;
                    }

                    .login-btn {

                        padding: 12px 24px;

                        border-radius: 14px;

                        border:
                        1px solid rgba(255,255,255,0.1);

                        text-decoration: none;

                        color: white;

                        transition: 0.3s;
                    }

                    .login-btn:hover {

                        background:
                        rgba(255,255,255,0.08);
                    }

                    .register-btn {

                        padding: 12px 24px;

                        border-radius: 14px;

                        text-decoration: none;

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #8B5CF6
                        );

                        color: white;

                        font-weight: 700;

                        transition: 0.3s;
                    }

                    .register-btn:hover {

                        transform:
                        translateY(-2px);

                        box-shadow:
                        0 0 28px rgba(124,58,237,0.45);
                    }

                    /* HERO */

                    .hero-section {

                        min-height:
                        calc(100vh - 90px);

                        display: flex;

                        align-items: center;

                        justify-content: space-between;

                        padding: 60px;

                        gap: 60px;
                    }

                    .hero-left {

                        flex: 1;
                    }

                    .hero-badge {

                        display: inline-flex;

                        align-items: center;

                        gap: 10px;

                        background:
                        rgba(255,255,255,0.08);

                        border:
                        1px solid rgba(255,255,255,0.08);

                        padding: 12px 18px;

                        border-radius: 999px;

                        margin-bottom: 28px;

                        color: #C4B5FD;

                        font-size: 14px;
                    }

                    .hero-left h1 {

                        font-size: 72px;

                        line-height: 1.1;

                        font-weight: 900;

                        margin-bottom: 24px;
                    }

                    .hero-left p {

                        font-size: 18px;

                        color: #CBD5E1;

                        line-height: 1.8;

                        max-width: 650px;

                        margin-bottom: 34px;
                    }

                    .hero-buttons {

                        display: flex;

                        gap: 18px;

                        margin-bottom: 50px;
                    }

                    .primary-btn {

                        display: flex;

                        align-items: center;

                        gap: 12px;

                        padding: 18px 30px;

                        border-radius: 18px;

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #8B5CF6
                        );

                        text-decoration: none;

                        color: white;

                        font-weight: 700;

                        transition: 0.3s;
                    }

                    .primary-btn:hover {

                        transform:
                        translateY(-3px);

                        box-shadow:
                        0 0 30px rgba(124,58,237,0.45);
                    }

                    .secondary-btn {

                        display: flex;

                        align-items: center;

                        gap: 10px;

                        padding: 18px 28px;

                        border-radius: 18px;

                        background:
                        rgba(255,255,255,0.08);

                        border:
                        1px solid rgba(255,255,255,0.08);

                        color: white;

                        cursor: pointer;

                        transition: 0.3s;
                    }

                    .secondary-btn:hover {

                        background:
                        rgba(255,255,255,0.12);
                    }

                    /* STATS */

                    .hero-stats {

                        display: flex;

                        gap: 50px;
                    }

                    .hero-stats h3 {

                        font-size: 38px;

                        font-weight: 800;

                        margin-bottom: 6px;
                    }

                    .hero-stats p {

                        color: #94A3B8;

                        margin: 0;
                    }

                    /* RIGHT SIDE */

                    .hero-right {

                        flex: 1;

                        position: relative;

                        display: flex;

                        align-items: center;

                        justify-content: center;
                    }

                    .main-glass-card {

                        width: 420px;

                        background:
                        rgba(255,255,255,0.06);

                        border:
                        1px solid rgba(255,255,255,0.08);

                        backdrop-filter: blur(18px);

                        border-radius: 32px;

                        overflow: hidden;

                        box-shadow:
                        0 0 40px rgba(0,0,0,0.3);
                    }

                    .glass-top {

                        height: 60px;

                        padding: 20px;

                        display: flex;

                        gap: 10px;

                        border-bottom:
                        1px solid rgba(255,255,255,0.06);
                    }

                    .glass-circle {

                        width: 14px;

                        height: 14px;

                        border-radius: 50%;
                    }

                    .red {

                        background: #EF4444;
                    }

                    .yellow {

                        background: #F59E0B;
                    }

                    .green {

                        background: #10B981;
                    }

                    .glass-content {

                        padding: 40px;

                        text-align: center;
                    }

                    .glass-icon {

                        width: 90px;

                        height: 90px;

                        border-radius: 24px;

                        margin: auto;

                        margin-bottom: 24px;

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #8B5CF6
                        );

                        display: flex;

                        align-items: center;

                        justify-content: center;

                        font-size: 36px;

                        box-shadow:
                        0 0 35px rgba(124,58,237,0.4);
                    }

                    .glass-content h2 {

                        font-size: 36px;

                        margin-bottom: 14px;
                    }

                    .glass-content p {

                        color: #CBD5E1;

                        line-height: 1.7;

                        margin-bottom: 30px;
                    }

                    .glass-progress {

                        width: 100%;

                        height: 14px;

                        background:
                        rgba(255,255,255,0.08);

                        border-radius: 999px;

                        overflow: hidden;

                        margin-bottom: 14px;
                    }

                    .progress-fill {

                        width: 85%;

                        height: 100%;

                        border-radius: 999px;

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #8B5CF6
                        );
                    }

                    .glass-content small {

                        color: #94A3B8;
                    }

                    /* FLOATING CARDS */

                    .floating-card {

                        position: absolute;

                        display: flex;

                        align-items: center;

                        gap: 14px;

                        padding: 18px 20px;

                        background:
                        rgba(255,255,255,0.08);

                        border:
                        1px solid rgba(255,255,255,0.08);

                        border-radius: 22px;

                        backdrop-filter: blur(18px);

                        animation:
                        float 4s ease-in-out infinite;
                    }

                    .floating-card svg {

                        font-size: 24px;

                        color: #C4B5FD;
                    }

                    .floating-card h4 {

                        margin-bottom: 4px;
                    }

                    .floating-card p {

                        color: #CBD5E1;

                        font-size: 13px;

                        margin: 0;
                    }

                    .card-one {

                        top: 80px;

                        left: 0;
                    }

                    .card-two {

                        bottom: 90px;

                        right: 0;
                    }

                    @keyframes float {

                        0% {

                            transform:
                            translateY(0px);
                        }

                        50% {

                            transform:
                            translateY(-10px);
                        }

                        100% {

                            transform:
                            translateY(0px);
                        }
                    }

                    /* FEATURES */

                    .features-section {

                        padding: 80px 60px;
                    }

                    .section-header {

                        text-align: center;

                        margin-bottom: 60px;
                    }

                    .section-header h2 {

                        font-size: 52px;

                        margin-bottom: 16px;
                    }

                    .section-header p {

                        color: #CBD5E1;

                        font-size: 18px;
                    }

                    .features-grid {

                        display: grid;

                        grid-template-columns:
                        repeat(3,1fr);

                        gap: 28px;
                    }

                    .feature-card {

                        background:
                        rgba(255,255,255,0.06);

                        border:
                        1px solid rgba(255,255,255,0.08);

                        border-radius: 30px;

                        padding: 36px;

                        backdrop-filter: blur(18px);

                        transition: 0.3s;
                    }

                    .feature-card:hover {

                        transform:
                        translateY(-8px);

                        box-shadow:
                        0 0 30px rgba(124,58,237,0.18);
                    }

                    .feature-icon {

                        width: 80px;

                        height: 80px;

                        border-radius: 24px;

                        display: flex;

                        align-items: center;

                        justify-content: center;

                        color: white;

                        font-size: 30px;

                        margin-bottom: 24px;
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

                    .feature-card h3 {

                        font-size: 28px;

                        margin-bottom: 14px;
                    }

                    .feature-card p {

                        color: #CBD5E1;

                        line-height: 1.8;
                    }

                    /* RESPONSIVE */

                    @media (max-width: 1100px) {

                        .hero-section {

                            flex-direction: column;
                        }

                        .features-grid {

                            grid-template-columns:
                            1fr;
                        }

                        .hero-left h1 {

                            font-size: 54px;
                        }
                    }

                    @media (max-width: 768px) {

                        .home-navbar {

                            padding: 0 20px;
                        }

                        .hero-section {

                            padding: 40px 20px;
                        }

                        .features-section {

                            padding: 60px 20px;
                        }

                        .hero-left h1 {

                            font-size: 42px;
                        }

                        .hero-stats {

                            gap: 24px;
                        }

                        .main-glass-card {

                            width: 100%;
                        }
                    }

                `}

            </style>

        </div>
    );
}