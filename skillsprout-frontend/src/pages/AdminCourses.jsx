import { useEffect, useState } from "react";

import API from "../services/api";

import {
    FaBook,
    FaTrash,
    FaPlus,
    FaSearch
} from "react-icons/fa";

export default function AdminCourses() {

    const [courses, setCourses] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [showModal, setShowModal] =
        useState(false);

    const [editingCourse, setEditingCourse] =
        useState(null);

    const [formData, setFormData] =
        useState({

            title: "",

            description: "",

            category: "",

            difficulty: "",

            thumbnailUrl: "",

            videoUrl: ""
        });

    useEffect(() => {

        fetchCourses();

    }, []);

    // FETCH COURSES

    const fetchCourses = async () => {

        try {

            const response =
                await API.get(
                    "/admin/courses"
                );

            setCourses(
                response.data || []
            );

        } catch (error) {

            console.log(error);
        }
    };

    // DELETE COURSE

    const deleteCourse = async (id) => {

        const confirmDelete =
            window.confirm(
                "Delete this course?"
            );

        if (!confirmDelete) return;

        try {

            await API.delete(
                `/admin/courses/${id}`
            );

            fetchCourses();

        } catch (error) {

            console.log(error);
        }
    };

    // CREATE + UPDATE COURSE

    const saveCourse = async () => {

        try {

            // UPDATE

            if (editingCourse) {

                await API.put(

                    `/admin/courses/${editingCourse.id}`,

                    formData
                );

                alert(
                    "Course updated successfully 😄"
                );
            }

            // CREATE

            else {

                await API.post(

                    "/admin/courses",

                    formData
                );

                alert(
                    "Course created successfully 😄"
                );
            }

            fetchCourses();

            setShowModal(false);

            setEditingCourse(null);

            setFormData({

                title: "",

                description: "",

                category: "",

                difficulty: "",

                thumbnailUrl: "",

                videoUrl: ""
            });

        } catch (error) {

            console.log(error);

            alert(
                "Operation failed"
            );
        }
    };

    // FILTER COURSES

    const filteredCourses =
        courses.filter((course) =>

            course.title
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (

        <div
            className="container-fluid p-4"
            style={{
                background:
                    "#f5f7fb",

                minHeight:
                    "100vh"
            }}
        >

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h1 className="fw-bold d-flex align-items-center gap-3">

                        <div
                            className="p-3 rounded-4 text-white"
                            style={{
                                background:
                                    "linear-gradient(135deg,#4f46e5,#7c3aed)"
                            }}
                        >

                            <FaBook />

                        </div>

                        Manage Courses

                    </h1>

                    <p className="text-muted">

                        Manage all platform courses

                    </p>

                </div>

                <button

                    className="btn btn-primary px-4 py-3 rounded-4 shadow"

                    onClick={() => {

                        setEditingCourse(null);

                        setFormData({

                            title: "",

                            description: "",

                            category: "",

                            difficulty: "",

                            thumbnailUrl: "",

                            videoUrl: ""
                        });

                        setShowModal(true);
                    }}
                >

                    <FaPlus />
                    {" "}
                    Create Course

                </button>

            </div>

            {/* SEARCH */}

            <div
                className="card border-0 shadow-sm mb-4"
                style={{
                    borderRadius:
                        "25px"
                }}
            >

                <div className="card-body">

                    <div className="input-group">

                        <span className="input-group-text bg-white border-0">

                            <FaSearch />

                        </span>

                        <input

                            type="text"

                            className="form-control border-0 shadow-none"

                            placeholder="Search courses..."

                            value={search}

                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                </div>

            </div>

            {/* TABLE */}

            <div
                className="card border-0 shadow-lg"
                style={{
                    borderRadius:
                        "30px"
                }}
            >

                <div className="card-body">

                    <table className="table align-middle">

                        <thead>

                            <tr>

                                <th>
                                    Course
                                </th>

                                <th>
                                    Description
                                </th>

                                <th>
                                    Category
                                </th>

                                <th>
                                    Difficulty
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                filteredCourses.length > 0 ?

                                filteredCourses.map(
                                    (course) => (

                                    <tr
                                        key={course.id}
                                    >

                                        <td
                                            className="fw-semibold"
                                        >

                                            {course.title}

                                        </td>

                                        <td>

                                            {course.description}

                                        </td>

                                        <td>

                                            <span className="badge bg-primary">

                                                {course.category}

                                            </span>

                                        </td>

                                        <td>

                                            <span className="badge bg-dark">

                                                {course.difficulty}

                                            </span>

                                        </td>

                                        <td className="d-flex gap-2">

                                            {/* EDIT */}

                                            <button

                                                className="btn btn-warning text-white"

                                                onClick={() => {

                                                    setEditingCourse(course);

                                                    setFormData({

                                                        title:
                                                            course.title || "",

                                                        description:
                                                            course.description || "",

                                                        category:
                                                            course.category || "",

                                                        difficulty:
                                                            course.difficulty || "",

                                                        thumbnailUrl:
                                                            course.thumbnailUrl || "",

                                                        videoUrl:
                                                            course.videoUrl || ""
                                                    });

                                                    setShowModal(true);
                                                }}
                                            >

                                                Edit

                                            </button>

                                            {/* DELETE */}

                                            <button

                                                className="btn btn-danger"

                                                onClick={() =>
                                                    deleteCourse(course.id)
                                                }
                                            >

                                                <FaTrash />

                                            </button>

                                        </td>

                                    </tr>
                                ))

                                :

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="text-center py-5 text-muted"
                                    >

                                        No courses found 😄

                                    </td>

                                </tr>
                            }

                        </tbody>

                    </table>

                </div>

            </div>

            {/* MODAL */}

            {
                showModal && (

                    <div
                        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                        style={{
                            background:
                                "rgba(0,0,0,0.5)",

                            zIndex:
                                9999
                        }}
                    >

                        <div
                            className="bg-white p-4 shadow-lg"
                            style={{
                                width:
                                    "700px",

                                borderRadius:
                                    "25px"
                            }}
                        >

                            <div className="d-flex justify-content-between align-items-center mb-4">

                                <h2 className="fw-bold">

                                    {
                                        editingCourse
                                            ? "Update Course"
                                            : "Create Course"
                                    }

                                </h2>

                                <button

                                    className="btn-close"

                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                />

                            </div>

                            <div className="row g-3">

                                <div className="col-md-6">

                                    <input

                                        type="text"

                                        className="form-control p-3"

                                        placeholder="Course Title"

                                        value={formData.title}

                                        onChange={(e) =>
                                            setFormData({

                                                ...formData,

                                                title:
                                                    e.target.value
                                            })
                                        }
                                    />

                                </div>

                                <div className="col-md-6">

                                    <input

                                        type="text"

                                        className="form-control p-3"

                                        placeholder="Category"

                                        value={formData.category}

                                        onChange={(e) =>
                                            setFormData({

                                                ...formData,

                                                category:
                                                    e.target.value
                                            })
                                        }
                                    />

                                </div>

                                <div className="col-12">

                                    <textarea

                                        className="form-control p-3"

                                        rows="4"

                                        placeholder="Description"

                                        value={formData.description}

                                        onChange={(e) =>
                                            setFormData({

                                                ...formData,

                                                description:
                                                    e.target.value
                                            })
                                        }
                                    />

                                </div>

                                <div className="col-md-6">

                                    <input

                                        type="text"

                                        className="form-control p-3"

                                        placeholder="Difficulty"

                                        value={formData.difficulty}

                                        onChange={(e) =>
                                            setFormData({

                                                ...formData,

                                                difficulty:
                                                    e.target.value
                                            })
                                        }
                                    />

                                </div>

                                <div className="col-md-6">

                                    <input

                                        type="text"

                                        className="form-control p-3"

                                        placeholder="Thumbnail URL"

                                        value={formData.thumbnailUrl}

                                        onChange={(e) =>
                                            setFormData({

                                                ...formData,

                                                thumbnailUrl:
                                                    e.target.value
                                            })
                                        }
                                    />

                                </div>

                                <div className="col-12">

                                    <input

                                        type="text"

                                        className="form-control p-3"

                                        placeholder="Video URL"

                                        value={formData.videoUrl}

                                        onChange={(e) =>
                                            setFormData({

                                                ...formData,

                                                videoUrl:
                                                    e.target.value
                                            })
                                        }
                                    />

                                </div>

                            </div>

                            <div className="d-flex justify-content-end gap-3 mt-4">

                                <button

                                    className="btn btn-secondary px-4"

                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                >

                                    Cancel

                                </button>

                                <button

                                    className="btn btn-primary px-4"

                                    onClick={saveCourse}
                                >

                                    {
                                        editingCourse
                                            ? "Update Course"
                                            : "Create Course"
                                    }

                                </button>

                            </div>

                        </div>

                    </div>
                )
            }

        </div>
    );
}