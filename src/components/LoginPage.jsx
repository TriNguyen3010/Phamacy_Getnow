import React, { useState } from 'react';
import { Lock } from 'lucide-react';

export default function LoginPage({ onLogin }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === 'GetNow_Anduin@2026') {
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
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
                            placeholder="Enter password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent transition-all"
                            autoFocus
                        />
                        {error && (
                            <p className="text-red-500 text-xs mt-2 ml-1 animate-pulse">
                                {error}
                            </p>
                        )}
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
