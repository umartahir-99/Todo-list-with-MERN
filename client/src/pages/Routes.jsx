import { Route, Routes, Navigate } from "react-router-dom";

import FrontHome from "./Frontend/Home";
import FrontAbout from "./Frontend/About";
import FrontContact from "./Frontend/Contact";

import Login from "./Auth/Login";
import Register from "./Auth/Register";
import ForgotPassword from "./Auth/ForgotPassword";

import DashHome from "./Dashboard/Home";
import DashAbout from "./Dashboard/About";
import DashContact from "./Dashboard/Contact";
import TodosAll from "./Dashboard/Todos/All";
import TodosAdd from "./Dashboard/Todos/Add";
import TodosEdit from "./Dashboard/Todos/Edit";

import PublicLayout from "../components/Layout/PublicLayout";
import AuthLayout from "../components/Layout/AuthLayout";
import DashboardLayout from "../components/Layout/DashboardLayout";

import NoPage from "../components/Misc/NoPage";
import ProtectedRoute from '../components/Misc/ProtectedRoute'
import { useAuth } from '../context/Auth'

const Index = () => {
  const {isAuth} = useAuth()
  return (
    <Routes>
        {/* Public site (header + footer) */}
        <Route element={<PublicLayout />}>
          <Route index element={<FrontHome />} />
          <Route path="about" element={<FrontAbout />} />
          <Route path="contact" element={<FrontContact />} />
        </Route>

        {/* Auth (no header/footer) */}
        <Route
          path="/auth"
          element={!isAuth ? <AuthLayout /> : <Navigate to="/dashboard" />}
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Dashboard (header only, protected) */}
        <Route
          path="/dashboard"
          element={isAuth ? <DashboardLayout /> : <Navigate to="/auth/login" />}
        >
          <Route index element={<DashHome />} />
          <Route path="about" element={<DashAbout />} />
          <Route path="contact" element={<DashContact />} />
          <Route path="todos" element={<TodosAll />} />
          <Route path="todos/add" element={<TodosAdd />} />
          <Route path="todos/edit/:id" element={<TodosEdit />} />
        </Route>

        <Route path="*" element={<NoPage />} />
    </Routes>
  )
}

export default Index
