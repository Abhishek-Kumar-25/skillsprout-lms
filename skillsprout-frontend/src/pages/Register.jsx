import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaGraduationCap,
    FaArrowRight,
    FaRocket
} from "react-icons/fa";

export default function Register() {

    const navigate =
        useNavigate();

    const [formData, setFormData] =
        useState({

            name: "",

            email: "",

            password: ""
        });

    const [loading, setLoading] =
        useState(false);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
            e.target.value
        });
    };

    const handleSubmit =
        async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await API.post(
                "/auth/register",
                formData
            );

            alert(
                "Registration Successful 🚀"
            );

            navigate("/login");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message
                ||
                "Registration Failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="register-page">

            {/* LEFT SIDE */}

            <div className="register-left">

                <div className="overlay"></div>

                <div className="left-content">

                    <div className="brand-logo">

                        <FaGraduationCap />

                    </div>

                    <h1>

                        Join SkillSprout 🚀

                    </h1>

                    <p>

                        Learn smarter with AI powered
                        education, coding mentorship,
                        real projects and placement prep.

                    </p>

                    <div className="feature-list">

                        <div className="feature-item">

                            <FaRocket />

                            AI Powered Learning

                        </div>

                        <div className="feature-item">

                            <FaRocket />

                            Interactive Coding Courses

                        </div>

                        <div className="feature-item">

                            <FaRocket />

                            MentorX AI Assistant

                        </div>

                    </div>

                </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="register-right">

                <div className="register-card">

                    <div className="card-top">

                        <h2>

                            Create Account

                        </h2>

                        <p>

                            Start your learning journey today

                        </p>

                    </div>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        {/* NAME */}

                        <div className="input-group">

                            <FaUser />

                            <input
                                type="text"

                                name="name"

                                placeholder=
                                "Full Name"

                                value={
                                    formData.name
                                }

                                onChange={
                                    handleChange
                                }

                                required
                            />

                        </div>

                        {/* EMAIL */}

                        <div className="input-group">

                            <FaEnvelope />

                            <input
                                type="email"

                                name="email"

                                placeholder=
                                "Email Address"

                                value={
                                    formData.email
                                }

                                onChange={
                                    handleChange
                                }

                                required
                            />

                        </div>

                        {/* PASSWORD */}

                        <div className="input-group">

                            <FaLock />

                            <input
                                type="password"

                                name="password"

                                placeholder=
                                "Password"

                                value={
                                    formData.password
                                }

                                onChange={
                                    handleChange
                                }

                                required
                            />

                        </div>

                        {/* BUTTON */}

                        <button
                            type="submit"

                            className=
                            "register-btn"

                            disabled={loading}
                        >

                            {

                                loading

                                ?

                                "Creating Account..."

                                :

                                <>
                                    Create Account

                                    <FaArrowRight />
                                </>
                            }

                        </button>

                    </form>

                    <div className="login-link">

                        Already have an account?

                        <Link to="/login">

                            Login

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

                    .register-page {

                        min-height: 100vh;

                        display: flex;

                        overflow: hidden;
                    }

                    /* LEFT SIDE */

                    .register-left {

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

                    .register-right {

                        width: 600px;

                        background: #F8FAFC;

                        display: flex;

                        align-items: center;

                        justify-content: center;

                        padding: 40px;
                    }

                    .register-card {

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

                    .register-btn {

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

                    .register-btn:hover {

                        transform:
                        translateY(-2px);

                        box-shadow:
                        0 0 28px rgba(124,58,237,0.35);
                    }

                    /* LOGIN LINK */

                    .login-link {

                        margin-top: 28px;

                        text-align: center;

                        color: #6B7280;
                    }

                    .login-link a {

                        margin-left: 8px;

                        text-decoration: none;

                        color: #4F46E5;

                        font-weight: 700;
                    }

                    /* RESPONSIVE */

                    @media (max-width: 1100px) {

                        .register-page {

                            flex-direction: column;
                        }

                        .register-right {

                            width: 100%;
                        }

                        .left-content h1 {

                            font-size: 54px;
                        }
                    }

                    @media (max-width: 768px) {

                        .register-left {

                            padding: 40px 24px;
                        }

                        .register-right {

                            padding: 24px;
                        }

                        .register-card {

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