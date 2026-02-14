import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';

export function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const success = await register(name, email, password, 'student');
        if (success) {
            alert("Registration successful! Please login.");
            navigate('/login');
        } else {
            setError('Registration failed. Email might be taken.');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <Card className="w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
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
                    {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
                    <Button type="submit" className="w-full">Register</Button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                </p>
            </Card>
        </div>
    );
}
