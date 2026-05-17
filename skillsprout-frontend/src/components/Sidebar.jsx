import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";

import {
    FaHome,
    FaBookOpen,
    FaGraduationCap,
    FaTrophy,
    FaBrain,
    FaRobot,
    FaUser,
    FaSignOutAlt,
    FaSeedling
} from "react-icons/fa";

export default function Sidebar() {

    const location = useLocation();

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/login");
    };

    const navItems = [

        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <FaHome />
        },

        {
            name: "Courses",
            path: "/courses",
            icon: <FaBookOpen />
        },

        {
            name: "Learning",
            path: "/my-enrollments",
            icon: <FaGraduationCap />
        },

        {
            name: "Leaderboard",
            path: "/leaderboard",
            icon: <FaTrophy />
        },

        {
            name: "Quiz",
            path: "/quiz",
            icon: <FaBrain />
        },

        {
            name: "AI Mentor",
            path: "/ai-mentor",
            icon: <FaRobot />
        },

        {
            name: "Profile",
            path: "/profile",
            icon: <FaUser />
        }
    ];

    return (

        <div

            style={{

                width: "260px",

                height: "100vh",

                background: "white",

                borderRight:
                "1px solid #E5E7EB",

                position: "fixed",

                left: 0,

                top: 0,

                padding: "24px 18px",

                display: "flex",

                flexDirection: "column",

                justifyContent: "space-between",

                zIndex: 1000
            }}
        >

            <div>

                {/* LOGO */}

                <div
                    className=
                    "d-flex align-items-center gap-3 mb-5"
                >

                    <div

                        style={{

                            width: "52px",

                            height: "52px",

                            borderRadius: "16px",

                            background:
                            "linear-gradient(135deg,#2563EB,#7C3AED)",

                            display: "flex",

                            alignItems: "center",

                            justifyContent: "center",

                            color: "white",

                            fontSize: "24px"
                        }}
                    >

                        <FaSeedling />

                    </div>

                    <div>

                        <h4
                            className=
                            "fw-bold m-0"
                        >

                            SkillSprout

                        </h4>

                        <small
                            className=
                            "text-secondary"
                        >

                            Learning Platform

                        </small>

                    </div>

                </div>

                {/* NAVIGATION */}

                <div
                    className=
                    "d-flex flex-column gap-2"
                >

                    {

                        navItems.map(item => (

                            <Link

                                key={item.path}

                                to={item.path}

                                style={{

                                    textDecoration:
                                    "none",

                                    padding:
                                    "14px 18px",

                                    borderRadius:
                                    "14px",

                                    display: "flex",

                                    alignItems:
                                    "center",

                                    gap: "14px",

                                    fontWeight: "600",

                                    transition:
                                    "0.3s",

                                    background:

                                    location.pathname ===
                                    item.path

                                    ?

                                    "linear-gradient(135deg,#2563EB,#7C3AED)"

                                    :

                                    "transparent",

                                    color:

                                    location.pathname ===
                                    item.path

                                    ?

                                    "white"

                                    :

                                    "#374151"
                                }}
                            >

                                <span
                                    style={{
                                        fontSize: "18px"
                                    }}
                                >

                                    {item.icon}

                                </span>

                                {item.name}

                            </Link>
                        ))
                    }

                </div>

            </div>

            {/* LOGOUT */}

            <button

                onClick={logout}

                className="btn"

                style={{

                    background:
                    "#F3F4F6",

                    borderRadius: "14px",

                    padding: "14px",

                    fontWeight: "600",

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    gap: "10px"
                }}
            >

                <FaSignOutAlt />

                Logout

            </button>

        </div>
    );
}