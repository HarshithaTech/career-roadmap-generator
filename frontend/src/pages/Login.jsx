import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await login(email, password);
        if (result) {
            // Check email for role to redirect correctly (matches backend auto-reg logic)
            if (email.toLowerCase().includes("admin")) {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } else {
            setError('Login failed. Please try again.');
        }
    };

    const handleQuickLogin = (role) => {
        const randomId = Math.floor(Math.random() * 10000);
        if (role === 'admin') {
            setEmail(`admin${randomId}@test.com`);
            setPassword('password123');
        } else {
            setEmail(`student${randomId}@test.com`);
            setPassword('password123');
        }
    };

    return (
        <Card className="w-full">
            <div className="flex gap-4 mb-6">
                <Button
                    variant="outline"
                    onClick={() => handleQuickLogin('student')}
                    className="flex-1 text-xs py-1 border-blue-500 text-blue-400 hover:bg-blue-500/10"
                    type="button"
                >
                    Student Demo
                </Button>
                <Button
                    variant="outline"
                    onClick={() => handleQuickLogin('admin')}
                    className="flex-1 text-xs py-1 border-purple-500 text-purple-400 hover:bg-purple-500/10"
                    type="button"
                >
                    Admin Demo
                </Button>
            </div>

            <form onSubmit={handleSubmit}>
                <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
                <Button type="submit" className="w-full">Sign In / Auto-Register</Button>
            </form>
            <p className="mt-4 text-center text-sm text-[var(--text-secondary)]">
                Don't have an account? No worries, we'll create one automatically!
            </p>
        </Card>
    );
}
