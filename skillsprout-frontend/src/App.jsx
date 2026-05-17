import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home
  from "./pages/Home";

import Login
  from "./pages/Login";

import Register
  from "./pages/Register";

import Dashboard
  from "./pages/Dashboard";

import Courses
  from "./pages/Courses";

import Leaderboard
  from "./pages/Leaderboard";

import AiMentor
  from "./pages/AiMentor";

import Quiz
  from "./pages/Quiz";

import Profile
  from "./pages/Profile";

import MyEnrollments
  from "./pages/MyEnrollments";

import AdminDashboard
  from "./pages/AdminDashboard";

import ProtectedRoute
  from "./routes/ProtectedRoute";

import AdminRoute
  from "./components/AdminRoute";

import AdminUsers from "./pages/AdminUsers";

import AdminCourses from "./pages/AdminCourses";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* PUBLIC ROUTES */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* USER ROUTES */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-mentor"
          element={
            <ProtectedRoute>
              <AiMentor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-enrollments"
          element={
            <ProtectedRoute>
              <MyEnrollments />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTE */}

        <Route
          path="/admin"
          element={
            <AdminRoute>

              <AdminDashboard />

            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/courses"
          element={
            <AdminRoute>
              <AdminCourses />
            </AdminRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;