import React, { createContext, useContext, useState, useEffect } from 'react';
import config from '../config';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for user data on load
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${config.API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            setUser(data);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(data));
            // Token is handled by cookie (httpOnly) or we can store accessToken if needed
            // The backend returns accessToken, let's store it if needed for subsequent requests
            if (data.accessToken) {
                localStorage.setItem('token', data.accessToken);
            }
            return { success: true };
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, message: error.message };
        }
    };

    const logout = async () => {
        try {
            await fetch(`${config.API_BASE_URL}/api/auth/logout`, {
                method: 'POST',
            });
        } catch (error) {
            console.error("Logout error:", error);
        }

        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const signup = async (firstName, lastName, email, password) => {
        try {
            const username = `${firstName} ${lastName}`;
            const response = await fetch(`${config.API_BASE_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Signup failed');
            }

            setUser(data);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(data));
            if (data.accessToken) {
                localStorage.setItem('token', data.accessToken);
            }
            return { success: true };
        } catch (error) {
            console.error("Signup error:", error);
            return { success: false, message: error.message };
        }
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        signup,
        updateUser: (userData) => {
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        }
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
