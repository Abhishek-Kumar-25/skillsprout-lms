import { useEffect, useState } from "react";

import PageLayout from "../components/PageLayout";

import API from "../services/api";

import {
    FaBookOpen,
    FaSignal,
    FaLayerGroup,
    FaPlayCircle
} from "react-icons/fa";

export default function Courses() {

    const [courses, setCourses] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchCourses();

    }, []);

    const fetchCourses = async () => {

        try {

            const response =
                await API.get(
                    "/user/courses"
                );

            setCourses(
                response.data.content
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    const enrollCourse = async (
        courseId
    ) => {

        try {

            await API.post(
                `/user/enroll/${courseId}`
            );

            alert(
                "Enrolled Successfully 😄"
            );

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message
                ||
                "Enrollment Failed"
            );
        }
    };

    const difficultyColor = (
        difficulty
    ) => {

        switch (
            difficulty?.toLowerCase()
        ) {

            case "beginner":

                return "#22C55E";

            case "intermediate":

                return "#F59E0B";

            case "advanced":

                return "#EF4444";

            default:

                return "#6366F1";
        }
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
                    "d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4"
                >

                    <div>

                        <h2
                            className=
                            "fw-bold mb-1"
                        >

                            Explore Courses 🚀

                        </h2>

                        <p className="text-secondary m-0">

                            Upgrade your skills with
                            premium learning paths

                        </p>

                    </div>

                    <div
                        className=
                        "courses-count-box"
                    >

                        📚 {courses.length} Courses

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

                            Loading Courses...

                        </h4>

                    </div>

                    :

                    <div className="row g-4">

                        {
                            courses.map(course => (

                                <div
                                    className=
                                    "col-lg-4 col-md-6"
                                    key={course.id}
                                >

                                    <div
                                        className=
                                        "course-card h-100"
                                    >

                                        {/* <img

                                            src={
                                                course.thumbnailUrl
                                                ||
                                                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
                                            }

                                            alt="course"

                                            className=
                                            "course-image"
                                        /> */}

                                        <div className="p-4">

                                            <div
                                                className=
                                                "d-flex justify-content-between align-items-start mb-3"
                                            >

                                                <span
                                                    className=
                                                    "category-badge"
                                                >

                                                    <FaLayerGroup />

                                                    {course.category}

                                                </span>

                                                <span

                                                    className=
                                                    "difficulty-badge"

                                                    style={{

                                                        background:
                                                        difficultyColor(
                                                            course.difficulty
                                                        )
                                                    }}
                                                >

                                                    <FaSignal />

                                                    {course.difficulty}

                                                </span>

                                            </div>

                                            <h4
                                                className=
                                                "fw-bold mb-3"
                                            >

                                                {course.title}

                                            </h4>

                                            <p
                                                className=
                                                "text-secondary"
                                            >

                                                {course.description}

                                            </p>

                                            <div
                                                className=
                                                "d-flex justify-content-between align-items-center mt-4"
                                            >

                                                <div
                                                    className=
                                                    "d-flex align-items-center gap-2 text-secondary"
                                                >

                                                    <FaBookOpen />

                                                    <small>

                                                        SkillSprout

                                                    </small>

                                                </div>

                                                <button

                                                    className=
                                                    "enroll-btn"

                                                    onClick={() =>
                                                        enrollCourse(
                                                            course.id
                                                        )
                                                    }
                                                >

                                                    Enroll

                                                </button>

                                            </div>

                                            {

                                                course.videoUrl

                                                &&

                                                <a

                                                    href={
                                                        course.videoUrl
                                                    }

                                                    target="_blank"

                                                    rel="noreferrer"

                                                    className=
                                                    "watch-btn mt-3"
                                                >

                                                    <FaPlayCircle />

                                                    Watch Intro

                                                </a>
                                            }

                                        </div>

                                    </div>

                                </div>
                            ))
                        }

                    </div>
                }

            </div>

            <style>

                {`

                    .courses-count-box {

                        background: white;

                        padding: 14px 20px;

                        border-radius: 14px;

                        font-weight: 600;

                        box-shadow:
                        0 4px 12px rgba(0,0,0,0.05);
                    }

                    .course-card {

                        background: white;

                        border-radius: 22px;

                        overflow: hidden;

                        transition: 0.3s;

                        box-shadow:
                        0 6px 20px rgba(0,0,0,0.06);
                    }

                    .course-card:hover {

                        transform:
                        translateY(-6px);

                        box-shadow:
                        0 10px 30px rgba(0,0,0,0.12);
                    }

                    .course-image {

                        width: 100%;

                        height: 220px;

                        object-fit: cover;
                    }

                    .category-badge {

                        display: flex;

                        align-items: center;

                        gap: 6px;

                        background: #EEF2FF;

                        color: #4F46E5;

                        padding: 8px 14px;

                        border-radius: 999px;

                        font-size: 13px;

                        font-weight: 600;
                    }

                    .difficulty-badge {

                        display: flex;

                        align-items: center;

                        gap: 6px;

                        color: white;

                        padding: 8px 14px;

                        border-radius: 999px;

                        font-size: 13px;

                        font-weight: 600;
                    }

                    .enroll-btn {

                        border: none;

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #7C3AED
                        );

                        color: white;

                        padding: 10px 18px;

                        border-radius: 12px;

                        font-weight: 600;

                        transition: 0.3s;
                    }

                    .enroll-btn:hover {

                        transform:
                        scale(1.05);
                    }

                    .watch-btn {

                        width: 100%;

                        display: flex;

                        align-items: center;

                        justify-content: center;

                        gap: 10px;

                        text-decoration: none;

                        background: #111827;

                        color: white;

                        padding: 12px;

                        border-radius: 12px;

                        font-weight: 600;

                        transition: 0.3s;
                    }

                    .watch-btn:hover {

                        background: #2563EB;

                        color: white;
                    }

                `}
            </style>

        </PageLayout>
    );
}