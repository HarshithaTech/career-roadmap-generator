import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in on load
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Ideally call a /me endpoint here to get user details
            // For now we decode or just assume logged in, picking up where we left off
            // Simplification: We'll decode JWT or fetch user
            // Let's assume we store user info in localStorage for demo
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const formData = new URLSearchParams();
            formData.append('username', email);
            formData.append('password', password);

            const response = await api.post('/auth/login', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            const { access_token } = response.data;
            localStorage.setItem('token', access_token);

            // Fetch user details mostly needed for role
            // But for now, let's just push them to dashboards and fetch user there, 
            // or simulate setting user
            // Hack for demo: set basic user
            const userObj = { email, role: email.includes('admin') ? 'admin' : 'student' };
            setUser(userObj);
            localStorage.setItem('user', JSON.stringify(userObj));
            return true;
        } catch (error) {
            console.error("Login failed", error);
            return false;
        }
    };

    const register = async (name, email, password, role) => {
        try {
            await api.post('/auth/register', { name, email, password, role });
            return true;
        } catch (error) {
            console.error("Registration failed", error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
