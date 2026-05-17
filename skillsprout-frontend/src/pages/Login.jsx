import { useState } from "react";

import API from "../services/api";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    FaEnvelope,
    FaLock,
    FaArrowRight,
    FaGraduationCap,
    FaRocket,
    FaRobot
} from "react-icons/fa";

export default function Login() {

    const navigate =
        useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const handleLogin =
        async (e) => {

            e.preventDefault();

            try {

                setLoading(true);

                const response =
                    await API.post(
                        "/auth/login",
                        {
                            email,
                            password
                        }
                    );

                localStorage.setItem(
                    "token",
                    response.data.token
                );

                localStorage.setItem(
                    "role",
                    response.data.role
                );

                localStorage.setItem(
                    "name",
                    response.data.name
                );

                if (
                    response.data.role ===
                    "ROLE_ADMIN"
                ) {

                    navigate("/admin");

                } else {

                    navigate("/dashboard");
                }

            } catch (error) {

                console.log(error);

                alert(
                    "Invalid Credentials"
                );

            } finally {

                setLoading(false);
            }
        };

    return (

        <div className="login-page">

            {/* LEFT SIDE */}

            <div className="login-left">

                <div className="overlay"></div>

                <div className="left-content">

                    <div className="brand-logo">

                        <FaGraduationCap />

                    </div>

                    <h1>

                        Welcome Back 👋

                    </h1>

                    <p>

                        Continue your learning
                        journey with SkillSprout
                        and unlock AI powered
                        education.

                    </p>

                    <div className="feature-list">

                        <div className="feature-item">

                            <FaRocket />

                            Learn Modern Technologies

                        </div>

                        <div className="feature-item">

                            <FaRobot />

                            MentorX AI Assistance

                        </div>

                        <div className="feature-item">

                            <FaRocket />

                            Track XP & Streaks

                        </div>

                    </div>

                </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="login-right">

                <div className="login-card">

                    <div className="card-top">

                        <h2>

                            Login

                        </h2>

                        <p>

                            Access your learning dashboard

                        </p>

                    </div>

                    <form
                        onSubmit={
                            handleLogin
                        }
                    >

                        {/* EMAIL */}

                        <div className="input-group">

                            <FaEnvelope />

                            <input
                                type="email"

                                placeholder=
                                "Email Address"

                                value={email}

                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }

                                required
                            />

                        </div>

                        {/* PASSWORD */}

                        <div className="input-group">

                            <FaLock />

                            <input
                                type="password"

                                placeholder=
                                "Password"

                                value={password}

                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }

                                required
                            />

                        </div>

                        {/* BUTTON */}

                        <button
                            type="submit"

                            className=
                            "login-btn"

                            disabled={loading}
                        >

                            {

                                loading

                                    ?

                                    "Logging In..."

                                    :

                                    <>
                                        Login

                                        <FaArrowRight />
                                    </>
                            }

                        </button>

                    </form>

                    {/* REGISTER */}

                    <div className="register-link">

                        Don’t have an account?

                        <Link to="/register">

                            Register

                        </Link>

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

                    .login-page {

                        min-height: 100vh;

                        display: flex;

                        overflow: hidden;
                    }

                    /* LEFT SIDE */

                    .login-left {

                        flex: 1;

                        position: relative;

                        background:
                        radial-gradient(
                            circle at top left,
                            #312E81,
                            #0F172A 50%,
                            #020617 100%
                        );

                        display: flex;

                        align-items: center;

                        justify-content: center;

                        padding: 60px;

                        overflow: hidden;
                    }

                    .overlay {

                        position: absolute;

                        inset: 0;

                        background:
                        radial-gradient(
                            circle at bottom right,
                            rgba(124,58,237,0.3),
                            transparent 40%
                        );
                    }

                    .left-content {

                        position: relative;

                        z-index: 2;

                        color: white;

                        max-width: 550px;
                    }

                    .brand-logo {

                        width: 90px;

                        height: 90px;

                        border-radius: 28px;

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #8B5CF6
                        );

                        display: flex;

                        align-items: center;

                        justify-content: center;

                        font-size: 40px;

                        margin-bottom: 30px;

                        box-shadow:
                        0 0 35px rgba(124,58,237,0.45);
                    }

                    .left-content h1 {

                        font-size: 68px;

                        line-height: 1.1;

                        margin-bottom: 24px;

                        font-weight: 900;
                    }

                    .left-content p {

                        font-size: 18px;

                        color: #CBD5E1;

                        line-height: 1.8;

                        margin-bottom: 40px;
                    }

                    .feature-list {

                        display: flex;

                        flex-direction: column;

                        gap: 18px;
                    }

                    .feature-item {

                        display: flex;

                        align-items: center;

                        gap: 14px;

                        background:
                        rgba(255,255,255,0.06);

                        border:
                        1px solid rgba(255,255,255,0.08);

                        padding: 18px 22px;

                        border-radius: 18px;

                        backdrop-filter: blur(16px);
                    }

                    .feature-item svg {

                        color: #C4B5FD;
                    }

                    /* RIGHT SIDE */

                    .login-right {

                        width: 600px;

                        background: #F8FAFC;

                        display: flex;

                        align-items: center;

                        justify-content: center;

                        padding: 40px;
                    }

                    .login-card {

                        width: 100%;

                        max-width: 430px;

                        background: white;

                        border-radius: 30px;

                        padding: 42px;

                        box-shadow:
                        0 20px 45px rgba(0,0,0,0.08);
                    }

                    .card-top {

                        margin-bottom: 34px;
                    }

                    .card-top h2 {

                        font-size: 42px;

                        font-weight: 800;

                        margin-bottom: 10px;

                        color: #111827;
                    }

                    .card-top p {

                        color: #6B7280;

                        font-size: 15px;
                    }

                    /* INPUTS */

                    .input-group {

                        display: flex;

                        align-items: center;

                        gap: 14px;

                        background: #F8FAFC;

                        border:
                        2px solid transparent;

                        padding: 18px 20px;

                        border-radius: 18px;

                        margin-bottom: 22px;

                        transition: 0.3s;
                    }

                    .input-group:focus-within {

                        border-color: #6366F1;

                        background: white;

                        box-shadow:
                        0 0 0 5px rgba(99,102,241,0.08);
                    }

                    .input-group svg {

                        color: #6B7280;

                        font-size: 18px;
                    }

                    .input-group input {

                        flex: 1;

                        border: none;

                        outline: none;

                        background: transparent;

                        font-size: 15px;
                    }

                    /* BUTTON */

                    .login-btn {

                        width: 100%;

                        height: 60px;

                        border: none;

                        border-radius: 18px;

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #8B5CF6
                        );

                        color: white;

                        font-size: 16px;

                        font-weight: 700;

                        display: flex;

                        align-items: center;

                        justify-content: center;

                        gap: 12px;

                        margin-top: 10px;

                        transition: 0.3s;

                        cursor: pointer;
                    }

                    .login-btn:hover {

                        transform:
                        translateY(-2px);

                        box-shadow:
                        0 0 28px rgba(124,58,237,0.35);
                    }

                    /* REGISTER */

                    .register-link {

                        margin-top: 28px;

                        text-align: center;

                        color: #6B7280;
                    }

                    .register-link a {

                        margin-left: 8px;

                        text-decoration: none;

                        color: #4F46E5;

                        font-weight: 700;
                    }

                    /* RESPONSIVE */

                    @media (max-width: 1100px) {

                        .login-page {

                            flex-direction: column;
                        }

                        .login-right {

                            width: 100%;
                        }

                        .left-content h1 {

                            font-size: 54px;
                        }
                    }

                    @media (max-width: 768px) {

                        .login-left {

                            padding: 40px 24px;
                        }

                        .login-right {

                            padding: 24px;
                        }

                        .login-card {

                            padding: 32px 24px;
                        }

                        .left-content h1 {

                            font-size: 42px;
                        }

                        .card-top h2 {

                            font-size: 34px;
                        }
                    }

                `}

            </style>

        </div>
    );
}