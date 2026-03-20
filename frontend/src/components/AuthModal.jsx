import React, { useState } from 'react';
import { AiOutlineClose, AiFillFacebook, AiFillApple, AiOutlineMail } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const { login, signup } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock authentication
        const mockUser = {
            name: formData.name || 'User',
            email: formData.email
        };
        const mockToken = 'mock-jwt-token';

        if (isLogin) {
            login(mockUser, mockToken);
        } else {
            signup(mockUser, mockToken);
        }
        onClose();
        navigate('/dashboard');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-fade-in mx-4">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition">
                        <AiOutlineClose size={18} />
                    </button>
                    <h2 className="text-base font-bold text-gray-800">
                        {isLogin ? 'Log in or sign up' : 'Sign up'}
                    </h2>
                    <div className="w-8"></div> {/* Spacer for centering */}
                </div>

                {/* Body */}
                <div className="p-6">
                    <h3 className="text-xl font-semibold mb-6 text-gray-800">Welcome to Mytrip</h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-gray-400 rounded-lg px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black transition"
                                required
                            />
                        )}
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-400 rounded-lg px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black transition"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-400 rounded-lg px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black transition"
                            required
                        />

                        <div className="text-xs text-gray-500 my-4">
                            We’ll call or text you to confirm your number. Standard message and data rates apply. <a href="#" className="underline font-semibold text-black">Privacy Policy</a>
                        </div>

                        <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg transition active:scale-95">
                            {isLogin ? 'Continue' : 'Agree and continue'}
                        </button>
                    </form>

                    <div className="flex items-center my-6">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="px-3 text-xs text-gray-500">or</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    <div className="space-y-3">
                        <button className="w-full border border-gray-800 py-3 rounded-lg flex items-center justify-between px-4 hover:bg-gray-50 transition relative">
                            <FcGoogle size={20} className="absolute left-4" />
                            <span className="flex-1 font-semibold text-sm text-center">Continue with Google</span>
                        </button>
                        <button className="w-full border border-gray-800 py-3 rounded-lg flex items-center justify-between px-4 hover:bg-gray-50 transition relative">
                            <AiFillFacebook size={20} className="absolute left-4 text-[#1877F2]" />
                            <span className="flex-1 font-semibold text-sm text-center">Continue with Facebook</span>
                        </button>
                        <button className="w-full border border-gray-800 py-3 rounded-lg flex items-center justify-between px-4 hover:bg-gray-50 transition relative">
                            <AiFillApple size={20} className="absolute left-4" />
                            <span className="flex-1 font-semibold text-sm text-center">Continue with Apple</span>
                        </button>
                        <button className="w-full border border-gray-800 py-3 rounded-lg flex items-center justify-between px-4 hover:bg-gray-50 transition relative">
                            <AiOutlineMail size={20} className="absolute left-4" />
                            <span className="flex-1 font-semibold text-sm text-center">Continue with email</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
