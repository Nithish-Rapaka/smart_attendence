import { BrowserRouter, Routes, Route } from "react-router-dom";
import AcademicClasses from "../pages/AcademicClasses/AcademicClasses";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Students from "../pages/Students/Students";
import Attendance from "../pages/Attendance/Attendance";
import Reports from "../pages/Reports/Reports";
import Profile from "../pages/Profile/Profile";
import RoleProtectedRoute from "./RoleProtectedRoute";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/academic-classes"
          element={
            <ProtectedRoute>
              <AcademicClasses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students"
          element={
            <RoleProtectedRoute allowedRoles={["ADMIN"]}>
              <Students />
            </RoleProtectedRoute>
          }
        />
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
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
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
