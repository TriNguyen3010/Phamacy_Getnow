import React, { useState } from 'react';
import { Search, Calendar, Download } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import StatsCard from './StatsCard';
import OrderCard from './OrderCard';

import omeprazoleImg from '../assets/products/omeprazole.png';
import sucralfateImg from '../assets/products/sucralfate.png';
import gastropulgiteImg from '../assets/products/gastropulgite.png';
import probioticsImg from '../assets/products/probiotics.png';

export default function OrdersPage({ onNavigateToDetail, notificationTab }) {
    const [activeTab, setActiveTab] = useState('All');

    const tabs = [
        { id: 'All', label: 'All' },
        { id: 'New', label: 'New', badge: true },
        { id: 'Pending', label: 'Pending payment' },
        { id: 'Packing', label: 'Packing' },
        { id: 'Shipping', label: 'Shipping' },
        { id: 'Return', label: 'Cancellation/Return' },
    ];

    const mockOrders = [
        {
            id: 'ORD-1009',
            customer: 'Sarah Connor',
            date: '2026-01-19',
            isNew: true,
            status: 'New',
            category: 'Antibiotics',
            itemsCount: 1,
            items: [
                { name: 'Gastropulgite', qty: 2, type: 'Prescription', price: '450,000', isDraft: true, image: gastropulgiteImg }
            ],
            deliveryMethod: '-',
        },
        {
            id: 'ORD-1008',
            customer: 'John Smith',
            date: '2026-01-18',
            isNew: true,
            status: 'Reviewing',
            category: 'Stomachache',
            itemsCount: 3,
            items: [
                { name: 'Omeprazole 20mg', qty: 3, type: 'Prescription', price: '256,000', isDraft: true, image: omeprazoleImg },
                { name: 'Sucralfate 1g', qty: 1, type: '', price: '', image: sucralfateImg }
            ],
            moreItems: '1',
            deliveryMethod: '-',
        },
        {
            id: 'ORD-1007',
            customer: 'Emily Blunt',
            date: '2026-01-17',
            isNew: false,
            status: 'Waiting for Payment',
            category: 'Skin Care',
            itemsCount: 2,
            items: [
                { name: 'Sucralfate 1g', qty: 2, type: 'Non-Prescription', price: '240,000', image: sucralfateImg }
            ],
            deliveryMethod: 'Standard'
        },
        {
            id: 'ORD-1006',
            customer: 'Michael Chen',
            date: '2026-01-16',
            isNew: false,
            status: 'Packing',
            category: 'Supplements',
            itemsCount: 4,
            items: [
                { name: 'Probiotics', qty: 2, type: 'Non-Prescription', price: '1,180,000', image: probioticsImg },
                { name: 'Vitamin C', qty: 1, type: '', price: '', image: omeprazoleImg }
            ],
            moreItems: 2,
            deliveryMethod: 'Standard'
        },
        {
            id: 'ORD-1005',
            customer: 'Jessica Jones',
            date: '2026-01-16',
            isNew: false,
            status: 'Ready to Ship',
            category: 'Cough',
            itemsCount: 1,
            items: [
                { name: 'Omeprazole 20mg', qty: 1, type: 'Prescription', price: '257,000', image: omeprazoleImg }
            ],
            deliveryMethod: 'Standard'
        },
        {
            id: 'ORD-1004',
            customer: 'Tony Stark',
            date: '2026-01-15',
            isNew: false,
            status: 'Driver Picking Up',
            category: 'Emergency',
            itemsCount: 1,
            items: [
                { name: 'Probiotics', qty: 1, type: 'Non-Prescription', price: '590,000', image: probioticsImg }
            ],
            deliveryMethod: 'Instant',
            deliveryTime: '00:45:00'
        },
        {
            id: 'ORD-1003',
            customer: 'Bruce Wayne',
            date: '2026-01-14',
            isNew: false,
            status: 'Out for Delivery',
            category: 'Chronic',
            itemsCount: 5,
            items: [
                { name: 'Gastropulgite', qty: 2, type: 'Prescription', price: '1,158,200', image: gastropulgiteImg },
                { name: 'Omeprazole', qty: 1, type: '', price: '', image: omeprazoleImg }
            ],
            moreItems: 3,
            deliveryMethod: 'Standard',
            deliveryTime: 'Today, 14:00'
        },
        {
            id: 'ORD-1002',
            customer: 'Clark Kent',
            date: '2026-01-12',
            isNew: false,
            status: 'Completed',
            category: 'General',
            itemsCount: 1,
            items: [
                { name: 'Sucralfate 1g', qty: 5, type: 'Non-Prescription', price: '600,000', image: sucralfateImg }
            ],
            deliveryMethod: 'Standard'
        },
        {
            id: 'ORD-1001',
            customer: 'Diana Prince',
            date: '2026-01-10',
            isNew: false,
            status: 'Cancelled',
            category: 'Flu',
            itemsCount: 2,
            items: [
                { name: 'Probiotics', qty: 1, type: 'Non-Prescription', price: '590,000', image: probioticsImg }
            ],
            deliveryMethod: 'Standard'
        },
        {
            id: 'ORD-1000',
            customer: 'Peter Parker',
            date: '2026-01-08',
            isNew: false,
            status: 'Returned',
            category: 'Allergy',
            itemsCount: 2,
            items: [
                { name: 'Omeprazole 20mg', qty: 1, type: 'Prescription', price: '257,000', image: omeprazoleImg }
            ],
            deliveryMethod: 'Standard'
        }
    ];

    const getStatusForTab = (tabId) => {
        switch (tabId) {
            case 'New': return ['New', 'Reviewing'];
            case 'Pending': return ['Pending payment', 'Waiting for Payment'];
            case 'Packing': return ['Packing', 'Ready to Ship'];
            case 'Shipping': return ['Shipping', 'Driver Picking Up', 'Out for Delivery'];
            case 'Return': return ['Cancelled', 'Returned'];
            default: return [];
        }
    };

    const filteredOrders = activeTab === 'All'
        ? mockOrders
        : mockOrders.filter(order => getStatusForTab(activeTab).includes(order.status));

    return (
        <div className="flex-1 overflow-y-auto bg-gray-100 h-screen">
            <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search order, customer..."
                                className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white hover:bg-gray-50 text-gray-700 font-medium">
                            <Calendar size={18} />
                            This Month
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white hover:bg-gray-50 text-gray-700 font-medium">
                            Export
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                    <StatsCard title="Total" value="124" trend="+3% from last month" subtext="from last month" />
                    <StatsCard title="Prescription" value="80" />
                    <StatsCard title="Non-Prescription" value="44" />
                </div>

                {/* Main Content Area */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[500px]">
                    {/* Tabs */}
                    {/* Tabs */}
                    <div className="border-b border-gray-200 px-8 sticky top-0 bg-white z-20 shadow-sm">
                        <div className="flex w-full">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 py-5 text-[15px] transition-all duration-200 relative flex items-center justify-center gap-2 ${activeTab === tab.id
                                        ? 'text-blue-600 font-semibold'
                                        : 'text-gray-500 hover:text-gray-700 font-medium'
                                        }`}
                                >
                                    {tab.label}
                                    {((tab.badge) || (notificationTab === tab.id)) && (
                                        <span className="w-2 h-2 rounded-full bg-blue-500 mb-0.5"></span>
                                    )}
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 rounded-t-full"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>



                    {/* Orders List */}
                    <div className="p-6 bg-gray-100">
                        {filteredOrders.map((order, idx) => (
                            <OrderCard key={idx} order={order} onClick={() => onNavigateToDetail(order)} />
                        ))}

                        {/* Pagination */}
                        <div className="flex justify-end gap-2 mt-6">
                            <button className="w-8 h-8 flex items-center justify-center border rounded bg-white text-gray-400 hover:text-gray-600">&lt;</button>
                            <button className="w-8 h-8 flex items-center justify-center border rounded bg-white text-blue-600 border-blue-200 font-medium">1</button>
                            <button className="w-8 h-8 flex items-center justify-center border rounded bg-white text-gray-600 hover:bg-gray-50">2</button>
                            <button className="w-8 h-8 flex items-center justify-center border rounded bg-white text-gray-600 hover:bg-gray-50">3</button>
                            <button className="w-8 h-8 flex items-center justify-center border rounded bg-white text-gray-400">...</button>
                            <button className="w-8 h-8 flex items-center justify-center border rounded bg-white text-gray-600 hover:bg-gray-50">12</button>
                            <button className="w-8 h-8 flex items-center justify-center border rounded bg-white text-gray-400 hover:text-gray-600">&gt;</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
