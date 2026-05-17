import { useState } from "react";

import PageLayout from "../components/PageLayout";

import API from "../services/api";

import {
    FaBrain,
    FaBolt,
    FaCheckCircle,
    FaTimesCircle,
    FaRocket,
    FaFire,
    FaTrophy
} from "react-icons/fa";

export default function Quiz() {

    const [loading, setLoading] =
        useState(false);

    const [topic, setTopic] =
        useState("");

    const [quiz, setQuiz] =
        useState(null);

    const [answers, setAnswers] =
        useState({});

    const [result, setResult] =
        useState(null);

    const generateQuiz = async () => {

        if (!topic.trim()) {

            return;
        }

        try {

            setLoading(true);

            const response =
                await API.post(

                    "/user/quiz/generate",

                    {
                        topic: topic,
                        numberOfQuestions: 5
                    }
                );

            setQuiz(
                response.data
            );

            setAnswers({});

            setResult(null);

        } catch (error) {

            console.log(error);

            alert(
                "Quiz generation failed"
            );

        } finally {

            setLoading(false);
        }
    };

    const handleOptionChange = (
        questionId,
        selectedAnswer
    ) => {

        setAnswers(prev => ({

            ...prev,

            [questionId]:
                selectedAnswer
        }));
    };

    const submitQuiz = async () => {

        try {

            const formattedAnswers =

                Object.keys(answers)
                .map(questionId => ({

                    questionId:
                        Number(questionId),

                    selectedAnswer:
                        answers[questionId]
                }));

            const response =
                await API.post(

                    "/user/quiz/submit",

                    {
                        quizId:
                            quiz.quizId,

                        answers:
                            formattedAnswers
                    }
                );

            setResult(
                response.data
            );

        } catch (error) {

            console.log(error);

            alert(
                "Quiz submission failed"
            );
        }
    };

    return (

        <PageLayout>

            <div
                className=
                "container-fluid py-2"
            >

                {/* HERO SECTION */}

                <div
                    className=
                    "quiz-hero mb-5"
                >

                    <div>

                        <div className="quiz-badge">

                            <FaBolt />

                            AI Powered Quiz Arena

                        </div>

                        <h1
                            className=
                            "fw-bold mt-4"
                        >

                            Challenge Your Brain 🧠

                        </h1>

                        <p className="text-light mt-3">

                            Generate instant quizzes,
                            improve your XP,
                            and dominate the leaderboard 🚀

                        </p>

                    </div>

                    <div className="hero-icon">

                        <FaBrain />

                    </div>

                </div>

                {/* QUIZ GENERATOR */}

                <div className="quiz-generator-card">

                    <h3
                        className=
                        "fw-bold mb-4"
                    >

                        Generate Quiz

                    </h3>

                    <div className="row g-3">

                        <div className="col-lg-9">

                            <input

                                type="text"

                                className=
                                "form-control custom-input"

                                placeholder=
                                "Enter topic (Java, Spring Boot, React...)"

                                value={topic}

                                onChange={(e) =>
                                    setTopic(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="col-lg-3">

                            <button

                                className=
                                "generate-btn w-100"

                                onClick={generateQuiz}

                                disabled={loading}
                            >

                                {
                                    loading

                                    ?

                                    "Generating..."

                                    :

                                    <>
                                        <FaRocket />

                                        Generate
                                    </>
                                }

                            </button>

                        </div>

                    </div>

                </div>

                {/* QUIZ QUESTIONS */}

                {

                    quiz && (

                        <div className="mt-5">

                            {

                                quiz.questions.map(
                                    (
                                        question,
                                        index
                                    ) => (

                                        <div
                                            key={
                                                question.id
                                            }

                                            className=
                                            "question-card"
                                        >

                                            <h4
                                                className=
                                                "fw-bold mb-4"
                                            >

                                                Q{index + 1}.
                                                {" "}
                                                {
                                                    question.question
                                                }

                                            </h4>

                                            <div className="options-grid">

                                                {

                                                    [
                                                        question.optionA,
                                                        question.optionB,
                                                        question.optionC,
                                                        question.optionD
                                                    ].map(
                                                        (
                                                            option,
                                                            i
                                                        ) => (

                                                            <label

                                                                key={i}

                                                                className=
                                                                {`

                                                                    option-card

                                                                    ${answers[question.id] === option

                                                                        ?

                                                                        "selected-option"

                                                                        :

                                                                        ""
                                                                    }

                                                                `}
                                                            >

                                                                <input

                                                                    type="radio"

                                                                    name={
                                                                        question.id
                                                                    }

                                                                    value={
                                                                        option
                                                                    }

                                                                    checked={

                                                                        answers[question.id]
                                                                        ===
                                                                        option
                                                                    }

                                                                    onChange={() =>
                                                                        handleOptionChange(
                                                                            question.id,
                                                                            option
                                                                        )
                                                                    }
                                                                />

                                                                <span>

                                                                    {option}

                                                                </span>

                                                            </label>
                                                        )
                                                    )
                                                }

                                            </div>

                                        </div>
                                    )
                                )
                            }

                            <button

                                className=
                                "submit-btn"

                                onClick={submitQuiz}
                            >

                                <FaTrophy />

                                Submit Quiz

                            </button>

                        </div>
                    )
                }

                {/* RESULT */}

                {

                    result && (

                        <div className="result-card">

                            <div className="result-icon">

                                {

                                    result.score >= 3

                                    ?

                                    <FaCheckCircle />

                                    :

                                    <FaTimesCircle />
                                }

                            </div>

                            <h2
                                className=
                                "fw-bold mt-3"
                            >

                                Quiz Completed 🎉

                            </h2>

                            <h1 className="score-text">

                                {result.score}
                                /
                                {result.totalQuestions}

                            </h1>

                            <p className="text-secondary">

                                Keep practicing and
                                level up your learning 🚀

                            </p>

                        </div>
                    )
                }

            </div>

            <style>

                {`

                    .quiz-hero {

                        background:
                        linear-gradient(
                            135deg,
                            #111827,
                            #2563EB,
                            #7C3AED
                        );

                        border-radius: 28px;

                        padding: 50px;

                        color: white;

                        display: flex;

                        justify-content: space-between;

                        align-items: center;

                        flex-wrap: wrap;

                        gap: 30px;

                        box-shadow:
                        0 10px 30px rgba(0,0,0,0.15);
                    }

                    .quiz-badge {

                        display: inline-flex;

                        align-items: center;

                        gap: 10px;

                        background:
                        rgba(255,255,255,0.15);

                        padding: 12px 18px;

                        border-radius: 999px;

                        font-weight: 600;
                    }

                    .hero-icon {

                        font-size: 120px;

                        opacity: 0.15;
                    }

                    .quiz-generator-card {

                        background: white;

                        padding: 30px;

                        border-radius: 24px;

                        box-shadow:
                        0 8px 24px rgba(0,0,0,0.06);
                    }

                    .custom-input {

                        height: 58px;

                        border-radius: 16px;

                        border:
                        2px solid #E5E7EB;

                        padding-left: 20px;

                        font-size: 16px;
                    }

                    .custom-input:focus {

                        box-shadow: none;

                        border-color: #6366F1;
                    }

                    .generate-btn {

                        height: 58px;

                        border: none;

                        border-radius: 16px;

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #7C3AED
                        );

                        color: white;

                        font-weight: 700;

                        display: flex;

                        align-items: center;

                        justify-content: center;

                        gap: 10px;

                        transition: 0.3s;
                    }

                    .generate-btn:hover {

                        transform:
                        translateY(-2px);
                    }

                    .question-card {

                        background: white;

                        border-radius: 24px;

                        padding: 30px;

                        margin-bottom: 30px;

                        box-shadow:
                        0 8px 24px rgba(0,0,0,0.05);
                    }

                    .options-grid {

                        display: grid;

                        grid-template-columns:
                        repeat(auto-fit,minmax(280px,1fr));

                        gap: 18px;
                    }

                    .option-card {

                        border:
                        2px solid #E5E7EB;

                        border-radius: 18px;

                        padding: 18px;

                        cursor: pointer;

                        display: flex;

                        align-items: center;

                        gap: 12px;

                        transition: 0.3s;

                        font-weight: 500;
                    }

                    .option-card:hover {

                        border-color: #6366F1;

                        transform:
                        translateY(-2px);
                    }

                    .selected-option {

                        background:
                        linear-gradient(
                            135deg,
                            #EEF2FF,
                            #EDE9FE
                        );

                        border-color: #6366F1;
                    }

                    .option-card input {

                        width: 18px;

                        height: 18px;
                    }

                    .submit-btn {

                        width: 100%;

                        border: none;

                        border-radius: 18px;

                        padding: 18px;

                        background:
                        linear-gradient(
                            135deg,
                            #111827,
                            #2563EB,
                            #7C3AED
                        );

                        color: white;

                        font-weight: 700;

                        font-size: 18px;

                        display: flex;

                        align-items: center;

                        justify-content: center;

                        gap: 12px;

                        transition: 0.3s;
                    }

                    .submit-btn:hover {

                        transform:
                        translateY(-2px);
                    }

                    .result-card {

                        background: white;

                        border-radius: 30px;

                        padding: 60px 30px;

                        text-align: center;

                        margin-top: 40px;

                        box-shadow:
                        0 10px 30px rgba(0,0,0,0.08);
                    }

                    .result-icon {

                        font-size: 70px;

                        color: #22C55E;
                    }

                    .score-text {

                        font-size: 80px;

                        font-weight: 800;

                        background:
                        linear-gradient(
                            135deg,
                            #2563EB,
                            #7C3AED
                        );

                        -webkit-background-clip: text;

                        -webkit-text-fill-color: transparent;
                    }

                `}
            </style>

        </PageLayout>
    );
}