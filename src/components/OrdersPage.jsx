import React, { useState, useEffect } from 'react';
import { Search, Calendar, ChevronDown, ChevronUp, Filter, Download } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import StatsCard from './StatsCard';
import OrderCard from './OrderCard';

import omeprazoleImg from '../assets/products/omeprazole.png';
import sucralfateImg from '../assets/products/sucralfate.png';
import gastropulgiteImg from '../assets/products/gastropulgite.png';
import probioticsImg from '../assets/products/probiotics.png';

export default function OrdersPage({ onNavigateToDetail, notificationTab, activeTab = 'All', onTabChange, lastSelectedOrder, orders = [], onDemoCheat }) {
    // const [activeTab, setActiveTab] = useState('All'); // Lifted to App.jsx
    const [expandedGroups, setExpandedGroups] = useState({
        'Needs action': true,
        'Queue': true,
        'In transit': true,
        'Archived': true
    });

    // Cheat Code Logic
    const [clickTracker, setClickTracker] = useState({ prescription: [], nonPrescription: [] });

    const handleStatsClick = (type) => {
        const now = Date.now();
        setClickTracker(prev => {
            const clicks = [...prev[type], now];
            // Keep only clicks within last 2 seconds
            const recentClicks = clicks.filter(t => now - t < 2000);

            if (recentClicks.length >= 3) {
                if (onDemoCheat) {
                    if (type === 'prescription') onDemoCheat('pickup');
                    if (type === 'nonPrescription') onDemoCheat('complete');
                }
                return { ...prev, [type]: [] }; // Reset after trigger
            }
            return { ...prev, [type]: recentClicks };
        });
    };

    const toggleGroup = (group) => {
        setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
    };

    const [highlightedId, setHighlightedId] = useState(null);

    useEffect(() => {
        if (lastSelectedOrder) {
            setHighlightedId(lastSelectedOrder.id);
            const timer = setTimeout(() => {
                setHighlightedId(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [lastSelectedOrder]);

    const tabs = [
        { id: 'All', label: 'All' },
        { id: 'Queue', label: 'Queue' },
        { id: 'In transit', label: 'In transit' },
        { id: 'Archived', label: 'Archived' },
    ];

    // Grouping Logic
    const groups = {
        'Needs action': ['New', 'Reviewing'],
        'Queue': ['Waiting for Payment', 'Packing', 'Ready to Ship'],
        'In transit': ['Driver Picking Up', 'Out for Delivery'],
        'Archived': ['Completed', 'Cancelled', 'Returned']
    };

    const getGroupForOrder = (status) => {
        for (const [group, statuses] of Object.entries(groups)) {
            if (statuses.includes(status)) return group;
        }
        return 'Other';
    };

    const groupedOrders = orders.reduce((acc, order) => {
        const group = getGroupForOrder(order.status);
        if (!acc[group]) acc[group] = [];
        acc[group].push(order);
        return acc;
    }, {});

    const displayGroups = activeTab === 'All'
        ? ['Needs action', 'Queue', 'In transit', 'Archived']
        : [activeTab === 'Queue' ? 'Queue' : activeTab === 'In transit' ? 'In transit' : 'Archived'];

    return (
        <div className="flex-1 overflow-y-auto bg-gray-50 h-screen font-inter">
            <div className="p-8 max-w-[1600px] mx-auto">
                {/* Header Row */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-bold text-gray-900">Orders Management</h1>
                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search order, customer..."
                                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg w-[300px] text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm">
                            <Calendar size={16} />
                            This month
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm">
                            Export
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                    <StatsCard title="Total" value="124" trend="+3% from last month" subtext="from last month" />
                    <StatsCard
                        title="Prescription"
                        value="80"
                        onClick={() => handleStatsClick('prescription')}
                    />
                    <StatsCard
                        title="Non-Prescription"
                        value="44"
                        onClick={() => handleStatsClick('nonPrescription')}
                    />
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[600px] flex flex-col">

                    {/* Tabs & Filter */}
                    <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 bg-white z-10 rounded-t-xl">
                        <div className="flex gap-8">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => onTabChange(tab.id)}
                                    className={`relative pb-0.5 text-sm font-medium transition-colors ${activeTab === tab.id ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {tab.label}
                                    {notificationTab === tab.id && (
                                        <span className="absolute -top-1 -right-2 flex h-2.5 w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                                        </span>
                                    )}
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="activeTabUnderline"
                                            className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-black"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50">
                            <Filter size={14} />
                            Filter
                        </button>
                    </div>

                    {/* Table Header */}
                    <div className="grid grid-cols-[2.5fr_1fr_1fr_1.5fr_1fr] gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500">
                        <div>Order(s)</div>
                        <div>Order total</div>
                        <div>Delivery method</div>
                        <div>System notes</div>
                        <div>Action</div>
                    </div>

                    {/* Orders List */}
                    <div className="p-6 space-y-8 flex-1">
                        {displayGroups.map(group => {
                            const orders = groupedOrders[group] || [];
                            if (orders.length === 0) return null;
                            const isExpanded = expandedGroups[group];

                            // Color mapping for Group Titles
                            const getGroupTitleColor = (grp) => {
                                switch (grp) {
                                    case 'Needs action': return 'text-red-600';
                                    case 'Queue': return 'text-yellow-600';
                                    case 'In transit': return 'text-green-600';
                                    case 'Archived': return 'text-gray-500';
                                    default: return 'text-gray-700';
                                }
                            };

                            return (
                                <div key={group}>
                                    <button
                                        onClick={() => toggleGroup(group)}
                                        className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity w-full text-left"
                                    >
                                        <div className={`transition-transform duration-200 ${isExpanded ? '' : '-rotate-90'}`}>
                                            <ChevronDown size={16} className="text-gray-500" />
                                        </div>
                                        <span className={`font-semibold text-sm ${getGroupTitleColor(group)}`}>{group}</span>
                                        <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">{orders.length}</span>
                                    </button>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="space-y-3"
                                            >
                                                {orders.map((order, idx) => (
                                                    <OrderCard
                                                        key={order.id}
                                                        order={order}
                                                        group={group}
                                                        onClick={() => onNavigateToDetail(order)}
                                                        highlighted={highlightedId === order.id}
                                                    />
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination */}
                    <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-2">
                        <button className="w-8 h-8 flex items-center justify-center border rounded bg-white text-gray-400 hover:bg-gray-50 text-sm">&lt;</button>
                        <button className="w-8 h-8 flex items-center justify-center border rounded bg-white text-gray-900 border-gray-300 font-medium text-sm">1</button>
                        <button className="w-8 h-8 flex items-center justify-center border rounded bg-white text-gray-600 hover:bg-gray-50 text-sm">2</button>
                        <button className="w-8 h-8 flex items-center justify-center border rounded bg-white text-gray-600 hover:bg-gray-50 text-sm">3</button>
                        <button className="w-8 h-8 flex items-center justify-center border rounded bg-white text-gray-400 text-sm">...</button>
                        <button className="w-8 h-8 flex items-center justify-center border rounded bg-white text-gray-600 hover:bg-gray-50 text-sm">12</button>
                        <button className="w-8 h-8 flex items-center justify-center border rounded bg-white text-gray-400 hover:text-gray-600 text-sm">&gt;</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
