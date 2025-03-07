import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";
import Unauthorized from "./pages/Unauthorized";
import { ToastProvider } from "./context/ToastContext";
import Loader from "./components/Loader";
import Dashboard from "./Modules/Admin/Pages/Dashboard";
import Sidebar from "./components/Sidebar";
import { adminNavItems } from "./types/sidebar.data";
import Customers from "./Modules/Admin/Pages/Customers";
import Drivers from "./Modules/Admin/Pages/Drivers";
import Services from "./Modules/Admin/Pages/Services";
import EmployeeLogin from "./pages/EmployeeLogin";
import ManagerLogin from "./pages/ManagerLogin";
import Home from "./pages/Home";
import EmployeesManagement from "./Modules/Admin/Pages/Employees";

const AppRoutes = () => {
    return (
        <AuthProvider>
            <ToastProvider>
                <Suspense fallback={<Loader />}>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<EmployeeLogin />} />
                            <Route path="/manager/login" element={<ManagerLogin />} />
                            <Route path="/unauthorized" element={<Unauthorized />} />

                            <Route
                                path="/manager/dashboard"
                                element={
                                    <ProtectedRoute requiredRole={['manager']}>
                                        <Sidebar navItems={adminNavItems} /> <div className=" pt-24"><Dashboard /></div>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/manager/employees"
                                element={
                                    <ProtectedRoute requiredRole={['manager']}>
                                        <Sidebar navItems={adminNavItems} /> <div className=" pt-24"><EmployeesManagement /></div>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/admin/customers"
                                element={
                                    <ProtectedRoute requiredRole={['manager']}>
                                        <Sidebar navItems={adminNavItems} /> <div className=" pt-16"><Customers /></div>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/admin/drivers"
                                element={
                                    <ProtectedRoute requiredRole={['manager']}>
                                        <Sidebar navItems={adminNavItems} /> <div className=" pt-16"><Drivers /></div>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/admin/services"
                                element={
                                    <ProtectedRoute requiredRole={['manager']}>
                                        <Sidebar navItems={adminNavItems} /> <div className=" pt-16"><Services /></div>
                                    </ProtectedRoute>
                                }
                            />

                        </Routes>
                    </Router>
                </Suspense>
            </ToastProvider>
        </AuthProvider>
    );
};

export default AppRoutes;
