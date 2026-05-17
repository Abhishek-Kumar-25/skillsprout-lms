import { useEffect, useState } from "react";

import PageLayout from "../components/PageLayout";

import API from "../services/api";

import {
    FaBookOpen,
    FaCheckCircle,
    FaPlayCircle,
    FaBolt
} from "react-icons/fa";

export default function MyEnrollments() {

    const [enrollments, setEnrollments] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchEnrollments();

    }, []);

    const fetchEnrollments = async () => {

        try {

            const response =
                await API.get(
                    "/user/progress"
                );

            setEnrollments(
                response.data
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    const updateProgress = async (
        enrollmentId,
        currentProgress
    ) => {

        try {

            let newProgress =
                currentProgress + 25;

            if (newProgress > 100) {

                newProgress = 100;
            }

            await API.patch(
                `/user/progress/${enrollmentId}?progress=${newProgress}`
            );

            fetchEnrollments();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message
                ||
                "Progress Update Failed"
            );
        }
    };

    const progressColor = (
        progress
    ) => {

        if (progress >= 100) {

            return (
                "linear-gradient(135deg,#22C55E,#16A34A)"
            );
        }

        if (progress >= 50) {

            return (
                "linear-gradient(135deg,#6366F1,#8B5CF6)"
            );
        }

        return (
            "linear-gradient(135deg,#F59E0B,#F97316)"
        );
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
                    "d-flex justify-content-between align-items-center flex-wrap gap-3 mb-5"
                >

                    <div>

                        <h1
                            className=
                            "fw-bold mb-2"
                            style={{
                                fontSize: "2.7rem"
                            }}
                        >

                            My Learning 🚀

                        </h1>

                        <p
                            className=
                            "text-secondary m-0"
                        >

                            Track progress and continue
                            your learning journey

                        </p>

                    </div>

                    <div className="courses-box">

                        📚 {enrollments.length}
                        {" "}
                        Active Courses

                    </div>

                </div>

                {/* LOADING */}

                {
                    loading

                    ?

                    <div
                        className=
                        "d-flex justify-content-center align-items-center"
                        style={{
                            height: "60vh"
                        }}
                    >

                        <h4 className="fw-bold">

                            Loading Learning Data...

                        </h4>

                    </div>

                    :

                    enrollments.length === 0

                    ?

                    <div className="empty-box">

                        <h3 className="fw-bold mb-3">

                            No Courses Yet 😄

                        </h3>

                        <p className="text-secondary">

                            Start learning by enrolling
                            in a course

                        </p>

                    </div>

                    :

                    <div className="row g-4">

                        {
                            enrollments.map(
                                enrollment => (

                                    <div
                                        className=
                                        "col-lg-6"

                                        key={
                                            enrollment.id
                                        }
                                    >

                                        <div
                                            className=
                                            "enrollment-card h-100"
                                        >

                                            <div
                                                className=
                                                "d-flex justify-content-between align-items-start mb-4"
                                            >

                                                <div>

                                                    <h3
                                                        className=
                                                        "fw-bold mb-2"
                                                    >

                                                        {
                                                            enrollment.courseTitle
                                                        }

                                                    </h3>

                                                    <div
                                                        className=
                                                        "d-flex align-items-center gap-2 text-secondary"
                                                    >

                                                        <FaBookOpen />

                                                        <small>

                                                            SkillSprout Course

                                                        </small>

                                                    </div>

                                                </div>

                                                {

                                                    enrollment.progress >= 100

                                                    &&

                                                    <div
                                                        className=
                                                        "completed-badge"
                                                    >

                                                        <FaCheckCircle />

                                                        Completed

                                                    </div>
                                                }

                                            </div>

                                            {/* PROGRESS */}

                                            <div className="mb-4">

                                                <div
                                                    className=
                                                    "d-flex justify-content-between mb-2"
                                                >

                                                    <span className="fw-semibold">

                                                        Progress

                                                    </span>

                                                    <span className="fw-bold">

                                                        {
                                                            enrollment.progress
                                                        }%

                                                    </span>

                                                </div>

                                                <div className="progress-bar-bg">

                                                    <div

                                                        className=
                                                        "progress-fill"

                                                        style={{

                                                            width:
                                                            `${enrollment.progress}%`,

                                                            background:
                                                            progressColor(
                                                                enrollment.progress
                                                            )
                                                        }}
                                                    />

                                                </div>

                                            </div>

                                            {/* ACTIONS */}

                                            <div
                                                className=
                                                "d-flex gap-3"
                                            >

                                                <button

                                                    className=
                                                    "continue-btn"

                                                    onClick={() =>
                                                        updateProgress(
                                                            enrollment.id,
                                                            enrollment.progress
                                                        )
                                                    }
                                                >

                                                    <FaBolt />

                                                    Continue Learning

                                                </button>

                                                {

                                                    enrollment.videoUrl

                                                    &&

                                                    <a

                                                        href={
                                                            enrollment.videoUrl
                                                        }

                                                        target="_blank"

                                                        rel="noreferrer"

                                                        className=
                                                        "watch-btn"
                                                    >

                                                        <FaPlayCircle />

                                                        Watch

                                                    </a>
                                                }

                                            </div>

                                        </div>

                                    </div>
                                )
                            )
                        }

                    </div>
                }

            </div>

            <style>

                {`

                    .courses-box {

                        background: white;

                        padding: 14px 22px;

                        border-radius: 14px;

                        font-weight: 600;

                        box-shadow:
                        0 4px 12px rgba(0,0,0,0.05);
                    }

                    .enrollment-card {

                        background: white;

                        border-radius: 22px;

                        padding: 28px;

                        box-shadow:
                        0 6px 20px rgba(0,0,0,0.06);

                        transition: 0.3s;
                    }

                    .enrollment-card:hover {

                        transform:
                        translateY(-5px);

                        box-shadow:
                        0 12px 30px rgba(0,0,0,0.12);
                    }

                    .completed-badge {

                        background:
                        linear-gradient(
                            135deg,
                            #22C55E,
                            #16A34A
                        );

                        color: white;

                        padding: 10px 16px;

                        border-radius: 999px;

                        display: flex;

                        align-items: center;

                        gap: 8px;

                        font-size: 13px;

                        font-weight: 600;
                    }

                    .progress-bar-bg {

                        width: 100%;

                        height: 12px;

                        background: #E5E7EB;

                        border-radius: 999px;

                        overflow: hidden;
                    }

                    .progress-fill {

                        height: 100%;

                        border-radius: 999px;

                        transition: 0.4s;
                    }

                    .continue-btn {

                        border: none;

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #7C3AED
                        );

                        color: white;

                        padding: 12px 20px;

                        border-radius: 14px;

                        font-weight: 600;

                        display: flex;

                        align-items: center;

                        gap: 10px;

                        transition: 0.3s;
                    }

                    .continue-btn:hover {

                        transform:
                        scale(1.05);
                    }

                    .watch-btn {

                        text-decoration: none;

                        background: #111827;

                        color: white;

                        padding: 12px 18px;

                        border-radius: 14px;

                        font-weight: 600;

                        display: flex;

                        align-items: center;

                        gap: 10px;

                        transition: 0.3s;
                    }

                    .watch-btn:hover {

                        background: #2563EB;

                        color: white;
                    }

                    .empty-box {

                        background: white;

                        border-radius: 24px;

                        padding: 80px 30px;

                        text-align: center;

                        box-shadow:
                        0 6px 20px rgba(0,0,0,0.05);
                    }

                `}
            </style>

        </PageLayout>
    );
}