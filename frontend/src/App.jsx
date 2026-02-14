import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthLayout } from './components/AuthLayout';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { StudentDashboard } from './pages/StudentDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Leaderboard } from './pages/Leaderboard';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Landing />} />

                        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
                            <Route path="dashboard" element={<StudentDashboard />} />
                            <Route path="leaderboard" element={<Leaderboard />} />
                        </Route>

                        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                            <Route path="admin" element={<AdminDashboard />} />
                        </Route>
                    </Route>

                    {/* Auth Routes with specific layout */}
                    <Route element={<Outlet />}>
                        <Route path="login" element={
                            <AuthLayout title="Welcome back" subtitle="Sign in to access your dashboard">
                                <Login />
                            </AuthLayout>
                        } />
                        <Route path="register" element={
                            <AuthLayout title="Create an account" subtitle="Start your career journey today">
                                <Register />
                            </AuthLayout>
                        } />
                    </Route>

                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
