import React from 'react';

export default function StatsCard({ title, value, subtext, trend, onClick, cheatDescription }) {
    return (
        <div
            onClick={onClick}
            className={`relative group bg-white p-4 rounded-lg border shadow-sm flex flex-col justify-between h-32 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow select-none' : ''}`}
        >
            {onClick && cheatDescription && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                    {cheatDescription}
                </div>
            )}
            <h3 className="text-gray-500 font-medium text-sm">{title}</h3>
            <div className="mt-2">
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">{value}</span>
                    {trend && (
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                            {trend}
                        </span>
                    )}
                </div>
                {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
            </div>
        </div>
    );
}
