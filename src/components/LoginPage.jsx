import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
// Using Lucide icons as they are already imported. Eye/EyeOff for password visibility.

export default function LoginPage({ onLogin }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const savedPassword = localStorage.getItem('getnow_auth_pass');
        if (savedPassword) {
            setPassword(savedPassword);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === 'GetNow_Anduin@2026') {
            if (rememberMe) {
                localStorage.setItem('getnow_auth_pass', password);
            } else {
                localStorage.removeItem('getnow_auth_pass');
            }
            onLogin();
        } else {
            setError('Incorrect password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 font-inter">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 w-full max-w-md">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <Lock className="text-[#1D4ED8]" size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Protected Access</h1>
                    <p className="text-gray-500 text-sm mt-1">Please enter the password to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
                            placeholder="Enter password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent transition-all pr-12"
                            autoFocus
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {error && (
                        <p className="text-red-500 text-xs ml-1 animate-pulse">
                            {error}
                        </p>
                    )}

                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer select-none">
                            Remember password
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#1D4ED8] text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors shadow-sm"
                    >
                        Access Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
}
