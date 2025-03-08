import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";
import Unauthorized from "./pages/Unauthorized";
import { ToastProvider } from "./context/ToastContext";
import Loader from "./components/Loader";
import Sidebar from "./components/Sidebar";
import { adminNavItems, employeeNavItems } from "./types/sidebar.data";
import EmployeeLogin from "./pages/EmployeeLogin";
import ManagerLogin from "./pages/ManagerLogin";
import Home from "./pages/Home";
import EmployeesManagement from "./Modules/Admin/Pages/Employees";
import DevicesManagement from "./Modules/Admin/Pages/Devices";
import EmployeeDashboard from "./Modules/Admin/Pages/EmployeeDashboard";

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

                            {/* <Route
                                path="/manager/dashboard"
                                element={
                                    <ProtectedRoute requiredRole={['manager']}>
                                        <Sidebar navItems={adminNavItems} type={'manager'} /> <div className=" pt-20"><Dashboard /></div>
                                    </ProtectedRoute>
                                }
                            /> */}
                            <Route
                                path="/manager/employees"
                                element={
                                    <ProtectedRoute requiredRole={['manager']}>
                                        <Sidebar navItems={adminNavItems} type={'manager'} /> <div className=" pt-20"><EmployeesManagement /></div>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/manager/devices"
                                element={
                                    <ProtectedRoute requiredRole={['manager']}>
                                        <Sidebar navItems={adminNavItems} type={'manager'} /> <div className=" pt-20"><DevicesManagement /></div>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/employee/dashboard"
                                element={
                                    <ProtectedRoute requiredRole={['employee']}>
                                        <Sidebar navItems={employeeNavItems} type={'employee'} /> <div className=" pt-20"><EmployeeDashboard /></div>
                                    </ProtectedRoute>
                                }
                            />
                            
                            {/* <Route
                                path="/admin/customers"
                                element={
                                    <ProtectedRoute requiredRole={['manager']}>
                                        <Sidebar navItems={adminNavItems} type={'manager'} /> <div className=" pt-16"><Customers /></div>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/admin/drivers"
                                element={
                                    <ProtectedRoute requiredRole={['manager']}>
                                        <Sidebar navItems={adminNavItems} type={'manager'} /> <div className=" pt-16"><Drivers /></div>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/admin/services"
                                element={
                                    <ProtectedRoute requiredRole={['manager']}>
                                        <Sidebar navItems={adminNavItems} type={'manager'} /> <div className=" pt-16"><Services /></div>
                                    </ProtectedRoute>
                                }
                            /> */}

                        </Routes>
                    </Router>
                </Suspense>
            </ToastProvider>
        </AuthProvider>
    );
};

export default AppRoutes;
