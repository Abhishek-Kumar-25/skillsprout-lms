import { useState } from "react";

import PageLayout from "../components/PageLayout";

import API from "../services/api";

import {
    FaPaperPlane,
    FaRobot,
    FaBolt
} from "react-icons/fa";

export default function AiMentor() {

    const [question, setQuestion] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [messages, setMessages] =
        useState([
            {
                role: "assistant",

                content:
                    "Hi 👋 I am MentorX. Ask me anything about Java, Spring Boot, React, DSA, interviews, debugging, or placements."
            }
        ]);

    const askAI = async () => {

        if (!question.trim()) {

            return;
        }

        const userMessage = {

            role: "user",

            content: question
        };

        setMessages(prev => [

            ...prev,

            userMessage
        ]);

        const currentQuestion =
            question;

        setQuestion("");

        try {

            setLoading(true);

            const response =
                await API.post(
                    "/user/ai/ask",
                    {
                        question:
                            currentQuestion
                    }
                );

            const aiMessage = {

                role: "assistant",

                content:
                    response.data.answer
            };

            setMessages(prev => [

                ...prev,

                aiMessage
            ]);

        } catch (error) {

            console.log(error);

            setMessages(prev => [

                ...prev,

                {
                    role: "assistant",

                    content:
                        "Something went wrong 😅"
                }
            ]);

        } finally {

            setLoading(false);
        }
    };

    return (

        <PageLayout>

            <div className="mentor-wrapper">

                {/* SIDEBAR */}

                <div className="mentor-sidebar">

                    <div>

                        <div className="sidebar-logo">

                            <div className="logo-box">

                                <FaRobot />

                            </div>

                            <div>

                                <h3>

                                    MentorX

                                </h3>

                                <p>

                                    Futuristic AI Mentor

                                </p>

                            </div>

                        </div>

                        {/* FEATURES */}

                        <div className="mentor-features">

                            <div className="feature-item">

                                <div className="feature-icon">

                                    🧠

                                </div>

                                <div>

                                    <h6>

                                        Smart Explanations

                                    </h6>

                                    <p>

                                        Learn concepts deeply

                                    </p>

                                </div>

                            </div>

                            <div className="feature-item">

                                <div className="feature-icon">

                                    ⚡

                                </div>

                                <div>

                                    <h6>

                                        Instant Answers

                                    </h6>

                                    <p>

                                        AI powered guidance

                                    </p>

                                </div>

                            </div>

                            <div className="feature-item">

                                <div className="feature-icon">

                                    🚀

                                </div>

                                <div>

                                    <h6>

                                        Placement Prep

                                    </h6>

                                    <p>

                                        Interview & DSA help

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* STATUS */}

                    <div className="sidebar-bottom">

                        <div className="ai-status">

                            <FaBolt />

                            Smart Learning Enabled

                        </div>

                    </div>

                </div>

                {/* CHAT SECTION */}

                <div className="chat-container">

                    {/* HEADER */}

                    <div className="chat-topbar">

                        <div>

                            <h2>

                                MentorX AI

                            </h2>

                            <p>

                                Your futuristic learning companion 🚀

                            </p>

                        </div>

                    </div>

                    {/* CHAT */}

                    <div className="chat-messages">

                        {

                            messages.map(
                                (
                                    message,
                                    index
                                ) => (

                                    <div

                                        key={index}

                                        className={

                                            message.role
                                            ===
                                            "user"

                                            ?

                                            "message-row user-row"

                                            :

                                            "message-row ai-row"
                                        }
                                    >

                                        <div

                                            className={

                                                message.role
                                                ===
                                                "user"

                                                ?

                                                "message-bubble user-bubble"

                                                :

                                                "message-bubble ai-bubble"
                                            }
                                        >

                                            {
                                                message.content
                                            }

                                        </div>

                                    </div>
                                )
                            )
                        }

                        {

                            loading && (

                                <div className="message-row ai-row">

                                    <div className="message-bubble ai-bubble">

                                        Thinking...

                                    </div>

                                </div>
                            )
                        }

                    </div>

                    {/* INPUT */}

                    <div className="chat-input-wrapper">

                        <div className="chat-input-box">

                            <textarea

                                className=
                                "chat-input"

                                rows="1"

                                placeholder=
                                "Ask MentorX anything..."

                                value={question}

                                onChange={(e) =>
                                    setQuestion(
                                        e.target.value
                                    )
                                }

                                onKeyDown={(e) => {

                                    if (
                                        e.key === "Enter"
                                        &&
                                        !e.shiftKey
                                    ) {

                                        e.preventDefault();

                                        askAI();
                                    }
                                }}
                            />

                            <button

                                className=
                                "send-btn"

                                onClick={askAI}

                                disabled={loading}
                            >

                                <FaPaperPlane />

                            </button>

                        </div>

                    </div>

                </div>

            </div>

            <style>

                {`

                    * {

                        scrollbar-width: none;
                    }

                    *::-webkit-scrollbar {

                        display: none;
                    }

                    .mentor-wrapper {

                        display: flex;

                        height: 100vh;

                        width: 100%;

                        overflow: hidden;

                        gap: 0;

                        background:
                        radial-gradient(
                            circle at top left,
                            #312E81,
                            #0F172A 40%,
                            #020617 100%
                        );
                    }

                    /* SIDEBAR */

                    .mentor-sidebar {

                        width: 300px;

                        background:
                        rgba(15,23,42,0.8);

                        backdrop-filter: blur(18px);

                        border-right:
                        1px solid rgba(255,255,255,0.06);

                        padding: 26px;

                        display: flex;

                        flex-direction: column;

                        justify-content: space-between;
                    }

                    .sidebar-logo {

                        display: flex;

                        align-items: center;

                        gap: 16px;

                        margin-bottom: 35px;
                    }

                    .logo-box {

                        width: 68px;

                        height: 68px;

                        border-radius: 22px;

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #8B5CF6
                        );

                        display: flex;

                        align-items: center;

                        justify-content: center;

                        color: white;

                        font-size: 28px;

                        box-shadow:
                        0 0 30px rgba(99,102,241,0.45);
                    }

                    .sidebar-logo h3 {

                        font-size: 32px;

                        font-weight: 800;

                        color: white;

                        margin: 0;
                    }

                    .sidebar-logo p {

                        margin: 0;

                        color: #94A3B8;

                        font-size: 13px;
                    }

                    /* FEATURES */

                    .mentor-features {

                        display: flex;

                        flex-direction: column;

                        gap: 18px;
                    }

                    .feature-item {

                        display: flex;

                        align-items: center;

                        gap: 16px;

                        padding: 18px;

                        border-radius: 22px;

                        background:
                        rgba(255,255,255,0.05);

                        border:
                        1px solid rgba(255,255,255,0.05);

                        transition: 0.3s;

                        cursor: pointer;
                    }

                    .feature-item:hover {

                        transform:
                        translateY(-3px);

                        background:
                        linear-gradient(
                            135deg,
                            rgba(37,99,235,0.2),
                            rgba(124,58,237,0.2)
                        );

                        border:
                        1px solid rgba(124,58,237,0.4);
                    }

                    .feature-icon {

                        width: 52px;

                        height: 52px;

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

                        font-size: 22px;

                        color: white;

                        box-shadow:
                        0 0 20px rgba(124,58,237,0.4);
                    }

                    .feature-item h6 {

                        margin: 0;

                        font-weight: 700;

                        font-size: 15px;

                        color: white;
                    }

                    .feature-item p {

                        margin: 4px 0 0;

                        color: #94A3B8;

                        font-size: 13px;
                    }

                    .sidebar-bottom {

                        margin-top: 20px;
                    }

                    .ai-status {

                        background:
                        linear-gradient(
                            135deg,
                            rgba(37,99,235,0.2),
                            rgba(124,58,237,0.2)
                        );

                        border:
                        1px solid rgba(124,58,237,0.3);

                        color: #C4B5FD;

                        padding: 16px;

                        border-radius: 20px;

                        display: flex;

                        align-items: center;

                        gap: 10px;

                        font-weight: 600;

                        font-size: 14px;
                    }

                    /* CHAT SECTION */

                    .chat-container {

                        flex: 1;

                        display: flex;

                        flex-direction: column;

                        overflow: hidden;
                    }

                    .chat-topbar {

                        padding: 26px 34px;

                        border-bottom:
                        1px solid rgba(255,255,255,0.06);

                        background:
                        rgba(255,255,255,0.02);

                        backdrop-filter: blur(14px);
                    }

                    .chat-topbar h2 {

                        font-size: 30px;

                        font-weight: 800;

                        color: white;

                        margin: 0;
                    }

                    .chat-topbar p {

                        margin: 6px 0 0;

                        color: #94A3B8;

                        font-size: 14px;
                    }

                    /* CHAT BODY */

                    .chat-messages {

                        flex: 1;

                        overflow-y: auto;

                        padding: 28px 34px;
                    }

                    .message-row {

                        display: flex;

                        margin-bottom: 22px;
                    }

                    .user-row {

                        justify-content: flex-end;
                    }

                    .ai-row {

                        justify-content: flex-start;
                    }

                    .message-bubble {

                        max-width: 75%;

                        padding: 18px 22px;

                        border-radius: 24px;

                        line-height: 1.8;

                        font-size: 15px;

                        white-space: pre-line;

                        animation:
                        fadeUp 0.3s ease;
                    }

                    .user-bubble {

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #7C3AED
                        );

                        color: white;

                        border-bottom-right-radius: 8px;

                        box-shadow:
                        0 8px 24px rgba(99,102,241,0.3);
                    }

                    .ai-bubble {

                        background:
                        rgba(255,255,255,0.06);

                        color: #E2E8F0;

                        border:
                        1px solid rgba(255,255,255,0.06);

                        border-bottom-left-radius: 8px;

                        backdrop-filter: blur(12px);
                    }

                    /* INPUT */

                    .chat-input-wrapper {

                        padding: 22px 34px;

                        border-top:
                        1px solid rgba(255,255,255,0.06);

                        background:
                        rgba(255,255,255,0.02);

                        backdrop-filter: blur(14px);
                    }

                    .chat-input-box {

                        display: flex;

                        align-items: flex-end;

                        gap: 14px;

                        background:
                        rgba(255,255,255,0.05);

                        border:
                        1px solid rgba(255,255,255,0.08);

                        border-radius: 24px;

                        padding: 14px 18px;

                        transition: 0.3s;
                    }

                    .chat-input-box:focus-within {

                        border:
                        1px solid rgba(124,58,237,0.5);

                        box-shadow:
                        0 0 22px rgba(124,58,237,0.18);
                    }

                    .chat-input {

                        flex: 1;

                        border: none;

                        background: transparent;

                        resize: none;

                        outline: none;

                        font-size: 15px;

                        color: white;

                        max-height: 120px;
                    }

                    .chat-input::placeholder {

                        color: #94A3B8;
                    }

                    .send-btn {

                        width: 52px;

                        height: 52px;

                        border: none;

                        border-radius: 18px;

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #8B5CF6
                        );

                        color: white;

                        display: flex;

                        align-items: center;

                        justify-content: center;

                        font-size: 17px;

                        transition: 0.3s;

                        box-shadow:
                        0 0 24px rgba(124,58,237,0.3);
                    }

                    .send-btn:hover {

                        transform:
                        scale(1.08);

                        box-shadow:
                        0 0 32px rgba(124,58,237,0.55);
                    }

                    @keyframes fadeUp {

                        from {

                            opacity: 0;

                            transform:
                            translateY(10px);
                        }

                        to {

                            opacity: 1;

                            transform:
                            translateY(0);
                        }
                    }

                `}

            </style>

        </PageLayout>
    );
}