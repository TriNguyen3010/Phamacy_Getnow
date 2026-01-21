import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import OrdersPage from './components/OrdersPage';
import OrderDetailPage from './components/OrderDetailPage';
import OrderDetailAntd from './components/OrderDetailAntd';

import { AnimatePresence, motion } from 'framer-motion';


import lisinoprilImg from './assets/products/lisinopril.png';
import omeprazoleImg from './assets/products/omeprazole.png';
import sucralfateImg from './assets/products/sucralfate.png';
import gastropulgiteImg from './assets/products/gastropulgite.png';
import probioticsImg from './assets/products/probiotics.png';

// Extended mock data to cover ALL statuses
const mockOrders = [
    // --- Needs Action ---
    {
        id: 'ORD-1012',
        customer: {
            name: 'Alex Johnson',
            phone: '0901 222 333',
            address: '123 Le Loi, District 1, HCMC'
        },
        date: '2026-01-20',
        updated: 'Just now',
        status: 'New',
        category: 'Stomachache',
        itemsCount: 4,
        items: [
            { name: 'Lisinopril 10mg', image: lisinoprilImg, qty: '1', unit: 'Strip', price: 128000, warning: 'Out of stock' },
            { name: 'Gastropulgite', image: gastropulgiteImg, qty: '2', unit: 'Box', price: 250000 },
            { name: 'Vitamin C 500mg', image: probioticsImg, qty: '1', unit: 'Bottle', price: 150000 },
            { name: 'Pain Relief Patch', image: sucralfateImg, qty: '5', unit: 'Pack', price: 100000 }
        ],
        total: '628,000',
        delivery: 'Not defined',
        note: 'New order received',
        noteType: 'info',
        action: 'Review & Consult'
    },
    {
        id: 'ORD-1011',
        customer: {
            name: 'Maria Garcia',
            phone: '0909 888 777',
            address: '456 Nguyen Hue, District 1, HCMC'
        },
        date: '2026-01-20',
        updated: '5m ago',
        status: 'Reviewing',
        category: 'Dermatology',
        itemsCount: 3,
        items: [
            { name: 'Skin Cream', image: sucralfateImg, qty: '1', unit: 'Tube', price: 450000 },
            { name: 'Moisturizer', image: omeprazoleImg, qty: '1', unit: 'Jar', price: 200000 },
            { name: 'Sunscreen SPF 50', image: probioticsImg, qty: '1', unit: 'Tube', price: 300000 }
        ],
        total: '950,000',
        delivery: 'Standard',
        note: 'Pharmacist is reviewing',
        noteType: 'warning',
        action: 'Review & Consult'
    },

    // --- Queue ---
    {
        id: 'ORD-1010',
        customer: {
            name: 'John Doe',
            phone: '0912 345 678',
            address: '789 Vo Van Kiet, District 5, HCMC'
        },
        date: '2026-01-19',
        updated: '10m ago',
        status: 'Waiting for Payment',
        category: 'Supplementary',
        itemsCount: 3,
        items: [
            { name: 'Vitamins', image: probioticsImg, qty: '1', unit: 'Bottle', price: 320000 },
            { name: 'Fish Oil', image: gastropulgiteImg, qty: '1', unit: 'Bottle', price: 450000 },
            { name: 'Calcium Supplements', image: sucralfateImg, qty: '2', unit: 'Box', price: 200000 }
        ],
        total: '970,000',
        delivery: 'Standard',
        note: 'Payment link sent',
        noteType: 'neutral',
        action: 'Check details'
    },
    {
        id: 'ORD-1009',
        customer: {
            name: 'Sarah Smith',
            phone: '0987 654 321',
            address: '101 Dien Bien Phu, Binh Thanh, HCMC'
        },
        date: '2026-01-19',
        updated: '15m ago',
        status: 'Packing',
        category: 'Flu',
        itemsCount: 5,
        items: [
            { name: 'Cold Medicine', image: gastropulgiteImg, qty: '2', unit: 'Box', price: 150000 },
            { name: 'Cough Syrup', image: omeprazoleImg, qty: '1', unit: 'Bottle', price: 85000 },
            { name: 'Throat Lozenges', image: probioticsImg, qty: '3', unit: 'Pack', price: 90000 },
            { name: 'Nasal Spray', image: sucralfateImg, qty: '1', unit: 'Bottle', price: 60000 },
            { name: 'Vitamin C', image: probioticsImg, qty: '1', unit: 'Box', price: 120000 }
        ],
        total: '505,000',
        delivery: 'Instant',
        note: 'Packing in progress',
        noteType: 'info',
        action: 'Print label'
    },
    {
        id: 'ORD-1008',
        customer: {
            name: 'Michael Chen',
            phone: '0933 444 555',
            address: '202 Cach Mang Thang 8, District 3, HCMC'
        },
        date: '2026-01-19',
        updated: '30m ago',
        status: 'Ready to Ship',
        category: 'Cough',
        itemsCount: 4,
        items: [
            { name: 'Cough Syrup', image: gastropulgiteImg, qty: '1', unit: 'Bottle', price: 85000 },
            { name: 'Herbal Tea', image: omeprazoleImg, qty: '2', unit: 'Box', price: 100000 },
            { name: 'Honey', image: probioticsImg, qty: '1', unit: 'Jar', price: 200000 },
            { name: 'Ginger Candy', image: sucralfateImg, qty: '3', unit: 'Pack', price: 45000 }
        ],
        total: '430,000',
        delivery: 'Standard',
        note: 'Ready for pickup',
        noteType: 'neutral',
        action: 'Check details'
    },
    // Duplicate Ready to Ship
    {
        id: 'ORD-1008-2',
        customer: {
            name: 'Robert Downey',
            phone: '0933 666 777',
            address: 'Malibu Drive, CA'
        },
        date: '2026-01-19',
        updated: 'Just now',
        status: 'Ready to Ship',
        category: 'First Aid',
        itemsCount: 5,
        items: [
            { name: 'Medical Kit', image: gastropulgiteImg, qty: '1', unit: 'Kit', price: 450000 },
            { name: 'Bandages', image: sucralfateImg, qty: '5', unit: 'Pack', price: 50000 },
            { name: 'Antiseptic', image: omeprazoleImg, qty: '2', unit: 'Bottle', price: 80000 },
            { name: 'Cotton Balls', image: probioticsImg, qty: '3', unit: 'Bag', price: 30000 },
            { name: 'Tweezers', image: sucralfateImg, qty: '1', unit: 'Pair', price: 25000 }
        ],
        total: '635,000',
        delivery: 'Standard',
        note: 'Ready for pickup',
        noteType: 'neutral',
        action: 'Check details'
    },

    // --- In Transit ---
    {
        id: 'ORD-1007',
        customer: {
            name: 'Emily White',
            phone: '0905 111 222',
            address: '303 Hai Ba Trung, District 1, HCMC'
        },
        date: '2026-01-18',
        updated: '1h ago',
        status: 'Driver Picking Up',
        category: 'General',
        itemsCount: 3,
        items: [
            { name: 'Bandages', image: sucralfateImg, qty: '2', unit: 'Pack', price: 45000 },
            { name: 'Pain Reliever', image: omeprazoleImg, qty: '1', unit: 'Box', price: 120000 },
            { name: 'Ice Pack', image: probioticsImg, qty: '1', unit: 'Pack', price: 50000 }
        ],
        total: '215,000',
        delivery: 'Instant',
        note: 'Driver assigned: Tai Pham',
        noteType: 'info',
        action: 'Check details'
    },
    {
        id: 'ORD-1006',
        customer: {
            name: 'David Brown',
            phone: '0944 666 777',
            address: '404 Pham Van Dong, Go Vap, HCMC'
        },
        date: '2026-01-18',
        updated: '2h ago',
        status: 'Out for Delivery',
        category: 'Prescription',
        itemsCount: 4,
        items: [
            { name: 'Antibiotics', image: omeprazoleImg, qty: '1', unit: 'Box', price: 560000 },
            { name: 'Probiotics', image: probioticsImg, qty: '2', unit: 'Box', price: 400000 },
            { name: 'Vitamin B Complex', image: gastropulgiteImg, qty: '1', unit: 'Bottle', price: 250000 },
            { name: 'Mineral Water', image: sucralfateImg, qty: '6', unit: 'Bottle', price: 30000 }
        ],
        total: '1,240,000',
        delivery: 'Standard',
        note: 'Arriving by 5:00 PM',
        noteType: 'neutral',
        action: 'Check details'
    },
    // Duplicate Out for Delivery
    {
        id: 'ORD-1006-2',
        customer: {
            name: 'Steve Rogers',
            phone: '0911 222 333',
            address: 'Brooklyn, NY'
        },
        date: '2026-01-18',
        updated: '3h ago',
        status: 'Out for Delivery',
        category: 'Supplements',
        itemsCount: 3,
        items: [
            { name: 'Whey Protein', image: probioticsImg, qty: '1', unit: 'Tub', price: 900000 },
            { name: 'Pre-Workout', image: gastropulgiteImg, qty: '1', unit: 'Tub', price: 600000 },
            { name: 'Shaker Bottle', image: sucralfateImg, qty: '1', unit: 'Piece', price: 150000 }
        ],
        total: '1,650,000',
        delivery: 'Instant',
        note: 'Arriving soon',
        noteType: 'neutral',
        action: 'Check details'
    },

    // --- Archived ---
    {
        id: 'ORD-1005',
        customer: {
            name: 'Jessica Green',
            phone: '0918 999 000',
            address: '505 Hong Bang, District 5, HCMC'
        },
        date: '2026-01-17',
        updated: '1d ago',
        status: 'Completed',
        category: 'Beauty',
        itemsCount: 4,
        items: [
            { name: 'Moisturizer', image: sucralfateImg, qty: '1', unit: 'Jar', price: 210000 },
            { name: 'Face Wash', image: omeprazoleImg, qty: '1', unit: 'Tube', price: 150000 },
            { name: 'Toner', image: probioticsImg, qty: '1', unit: 'Bottle', price: 180000 },
            { name: 'Cotton Pads', image: gastropulgiteImg, qty: '2', unit: 'Pack', price: 60000 }
        ],
        total: '600,000',
        delivery: 'Standard',
        note: 'Delivered successfully',
        noteType: 'neutral',
        action: 'Check details'
    },
    {
        id: 'ORD-1004',
        customer: {
            name: 'Tony Stark',
            phone: '0909 000 111',
            address: 'Malibu Point, 10880, 90265'
        },
        date: '2026-01-16',
        updated: '2d ago',
        status: 'Cancelled',
        category: 'Emergency',
        itemsCount: 5,
        items: [
            { name: 'First Aid Kit', image: probioticsImg, qty: '1', unit: 'Kit', price: 1200000 },
            { name: 'Flashlight', image: gastropulgiteImg, qty: '2', unit: 'Piece', price: 300000 },
            { name: 'Batteries', image: sucralfateImg, qty: '4', unit: 'Pack', price: 100000 },
            { name: 'Emergency Blanket', image: omeprazoleImg, qty: '2', unit: 'Pack', price: 150000 },
            { name: 'Whistle', image: probioticsImg, qty: '2', unit: 'Piece', price: 50000 }
        ],
        total: '1,800,000',
        delivery: 'Instant',
        note: 'Customer cancelled',
        noteType: 'warning',
        action: 'Check details'
    },
    {
        id: 'ORD-1003',
        customer: {
            name: 'Bruce Wayne',
            phone: '0901 999 888',
            address: 'Wayne Manor, Gotham'
        },
        date: '2026-01-15',
        updated: '3d ago',
        status: 'Returned',
        category: 'Supplements',
        itemsCount: 3,
        items: [
            { name: 'Protein Powder', image: probioticsImg, qty: '1', unit: 'Tub', price: 890000 },
            { name: 'BCAAs', image: omeprazoleImg, qty: '1', unit: 'Tub', price: 450000 },
            { name: 'Creatine', image: gastropulgiteImg, qty: '1', unit: 'Tub', price: 300000 }
        ],
        total: '1,640,000',
        delivery: 'Standard',
        note: 'Return processed',
        noteType: 'warning',
        action: 'Check details'
    }
];

export default function App() {
    const [orders, setOrders] = useState(mockOrders);
    const [currentView, setCurrentView] = useState('list'); // 'list' or 'detail'
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [notificationTab, setNotificationTab] = useState(null);

    const [activeTab, setActiveTab] = useState('All');
    const handleUpdateOrder = (orderId, newStatus) => {
        let newAction = 'Check details';
        if (['Reviewing', 'New'].includes(newStatus)) newAction = 'Review & Consult';
        else if (newStatus === 'Packing') newAction = 'Print label';
        else if (['Driver Picking Up', 'Ready to Ship', 'Out for Delivery'].includes(newStatus)) newAction = 'Check details';

        setOrders(prevOrders => prevOrders.map(o =>
            o.id === orderId ? { ...o, status: newStatus, updated: 'Just now', action: newAction } : o
        ));
    };

    const handleConfirm = (updatedOrder) => {
        if (updatedOrder) {
            handleUpdateOrder(updatedOrder.id, updatedOrder.status);
        }
        setCurrentView('list');
        setNotificationTab('Queue');
    }

    const handleDemoCheat = (type) => {
        console.log('Cheat triggered:', type);
        setOrders(prevOrders => {
            const newOrders = prevOrders.map(o => {
                if (type === 'pickup' && o.status === 'Ready to Ship') {
                    return { ...o, status: 'Driver Picking Up', updated: 'Just now', action: 'Track shipment' };
                }
                if (type === 'complete' && o.status === 'Out for Delivery') {
                    return { ...o, status: 'Completed', updated: 'Just now', action: 'Check details' };
                }
                return o;
            });
            return newOrders;
        });

        // Notification feedback
        if (type === 'pickup') setNotificationTab('In transit');
        if (type === 'complete') setNotificationTab('Archived');
    };

    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-[#F9FAFB]">
            <Sidebar collapsed={isSidebarCollapsed} toggleSidebar={() => setSidebarCollapsed(!isSidebarCollapsed)} />
            <div className="flex-1 w-full min-w-0 relative">
                <AnimatePresence mode="wait">
                    {currentView === 'list' ? (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.15 }}
                            className="h-full w-full absolute top-0 left-0"
                        >
                            <OrdersPage
                                orders={orders}
                                onNavigateToDetail={(order) => { setSelectedOrder(order); setCurrentView('detail'); }}
                                notificationTab={notificationTab}
                                activeTab={activeTab}
                                onTabChange={setActiveTab}
                                lastSelectedOrder={selectedOrder}
                                onDemoCheat={handleDemoCheat}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="detail"
                            initial={{ opacity: 0, x: "20%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "20%" }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="h-full w-full absolute top-0 left-0 bg-[#F9FAFB] z-10"
                        >
                            <OrderDetailAntd
                                onBack={() => setCurrentView('list')}
                                onConfirm={handleConfirm}
                                onUpdate={handleUpdateOrder}
                                order={selectedOrder}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}


