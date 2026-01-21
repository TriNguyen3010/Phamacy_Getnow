import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import OrdersPage from './components/OrdersPage';
import OrderDetailPage from './components/OrderDetailPage';
import OrderDetailAntd from './components/OrderDetailAntd';
import { notification, Button } from 'antd';

import { AnimatePresence, motion } from 'framer-motion';


import lisinoprilImg from './assets/products/lisinopril.png';
import omeprazoleImg from './assets/products/omeprazole.png';
import sucralfateImg from './assets/products/sucralfate.png';
import gastropulgiteImg from './assets/products/gastropulgite.png';
import probioticsImg from './assets/products/probiotics.png';

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
        status: 'Reviewing',
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
        action: 'Consult'
    },
    {
        id: 'ORD-1013',
        customer: {
            name: 'Sarah Connor',
            phone: '0909 123 456',
            address: 'Unknown Location'
        },
        date: '2026-01-20',
        updated: 'Just now',
        status: 'Reviewing',
        category: 'Flu',
        itemsCount: 2,
        items: [
            { name: 'Panadol', image: gastropulgiteImg, qty: '1', unit: 'Box', price: 150000 },
            { name: 'Vitamin C', image: probioticsImg, qty: '1', unit: 'Bottle', price: 120000 }
        ],
        total: '270,000',
        delivery: 'Standard',
        note: 'New order received',
        noteType: 'info',
        action: 'Consult'
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
        action: 'Consult'
    },

    // --- Past Orders (Archived) ---
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

const GlobalHeader = () => (
    <div className="h-16 bg-white border-b border-[#F0F0F0] flex items-center justify-end px-6 gap-4 shrink-0 z-20 relative">
        <Button
            shape="circle"
            icon={<span role="img" aria-label="message" className="anticon anticon-message"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></span>}
            className="border-gray-200"
        />
        <Button
            shape="circle"
            icon={
                <div className="relative flex items-center justify-center">
                    <span className="absolute -top-1 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    <span role="img" aria-label="bell" className="anticon anticon-bell"><svg viewBox="64 64 896 896" focusable="false" data-icon="bell" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M816 768h-24V428c0-141.1-104.3-257.8-240-277.2V112c0-22.1-17.9-40-40-40s-40 17.9-40 40v38.8C336.3 170.2 232 286.9 232 428v340h-24c-17.7 0-32 14.3-32 32v16h736v-16c0-17.7-14.3-32-32-32zm-426-88h244V428c0-54.8-19.1-104.7-51.2-143.2a15.2 15.2 0 00-6.8-6.4C554.9 271.6 532.7 268 512 268c-20.7 0-42.9 3.6-62 10.4-3.5 1.2-6.5 3.5-8.8 6.4C408.9 323.3 390 373.2 390 428v252zM512 944c53 0 96-43 96-96h-192c0 53 43 96 96 96z"></path></svg></span>
                </div>
            }
            className="border-gray-200"
        />
    </div>
);

import LoginPage from './components/LoginPage';

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [orders, setOrders] = useState(mockOrders);
    const [currentView, setCurrentView] = useState('list'); // 'list' or 'detail'
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [notificationTab, setNotificationTab] = useState(null);
    const [homeScrollPos, setHomeScrollPos] = useState(0);



    const [activeTab, setActiveTab] = useState('All');
    const statusLabels = {
        'New': 'New Order',
        'Reviewing': 'Reviewing',
        'Waiting for Payment': 'Awaiting Payment',
        'Packing': 'Ready to Pack',
        'Ready to Ship': 'Ready to Ship',
        'Driver Picking Up': 'Driver Assigned',
        'Out for Delivery': 'Out for Delivery',
        'Completed': 'Completed',
        'Cancelled': 'Cancelled',
        'Returned': 'Returned'
    };

    const handleUpdateOrder = (orderId, newStatus) => {
        let newAction = 'Check details';
        if (['Reviewing', 'New'].includes(newStatus)) newAction = 'Consult';
        else if (newStatus === 'Packing') newAction = 'Print label';
        else if (['Driver Picking Up', 'Ready to Ship', 'Out for Delivery'].includes(newStatus)) newAction = 'Check details';

        setOrders(prevOrders => prevOrders.map(o =>
            o.id === orderId ? { ...o, status: newStatus, updated: 'Just now', action: newAction } : o
        ));

        // Trigger notification for manual updates
        const title = statusLabels[newStatus] || newStatus;
        notification.success({
            message: title,
            description: `${orderId} has been updated to ${newStatus}.`,
            placement: 'topRight',
            duration: 3,
        });
    };

    const handleConfirm = (updatedOrder) => {
        if (updatedOrder) {
            handleUpdateOrder(updatedOrder.id, updatedOrder.status);
        }
        setCurrentView('list');
        setNotificationTab('Queue');
    }

    const handleDemoCheat = (type) => {
        let updatedOrder = null;

        setOrders(prevOrders => {
            const newOrders = [...prevOrders];
            const idx = newOrders.findIndex(o =>
                (type === 'pickup' && (o.status === 'Ready to Ship' || o.status === 'Driver Picking Up')) ||
                (type === 'payment' && o.status === 'Waiting for Payment') ||
                (type === 'complete' && (o.status === 'Out for Delivery' || o.status === 'Driver Picking Up'))
            );

            if (idx !== -1) {
                const o = newOrders[idx];
                let newStatus = o.status;
                let newAction = o.action;

                if (type === 'pickup') {
                    newStatus = 'Out for Delivery';
                    newAction = 'Check details';
                } else if (type === 'payment') {
                    newStatus = 'Packing';
                    newAction = 'Print label';
                } else if (type === 'complete') {
                    newStatus = 'Completed';
                    newAction = 'Check details';
                }

                updatedOrder = { ...o, status: newStatus, updated: 'Just now', action: newAction };
                newOrders[idx] = updatedOrder;
            }
            return newOrders;
        });

        // Notification feedback with ID
        setTimeout(() => { // Slight delay to ensure state update logic is processed
            if (updatedOrder) {
                const title = statusLabels[updatedOrder.status] || updatedOrder.status;

                if (type === 'pickup') {
                    setNotificationTab('In transit');
                    notification.info({
                        message: title,
                        description: `${updatedOrder.id} has been picked up by driver.`,
                        placement: 'topRight',
                        duration: 4,
                    });
                }
                if (type === 'payment') {
                    setNotificationTab('Queue');
                    notification.success({
                        message: title,
                        description: `${updatedOrder.id} is now Packing.`,
                        placement: 'topRight',
                        duration: 4,
                    });
                }
                if (type === 'complete') {
                    setNotificationTab('Archived');
                    notification.success({
                        message: title,
                        description: `${updatedOrder.id} has been successfully delivered.`,
                        placement: 'topRight',
                        duration: 4,
                    });
                }
            }
        }, 50);
    };

    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    // Set hasLoaded to true after first render
    React.useEffect(() => {
        setHasLoaded(true);
    }, []);
    if (!isAuthenticated) {
        return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
    }

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-[#F9FAFB]">
            <Sidebar collapsed={isSidebarCollapsed} toggleSidebar={() => setSidebarCollapsed(!isSidebarCollapsed)} />
            <div className="flex-1 w-full min-w-0 relative flex flex-col">
                <GlobalHeader />
                <div className="flex-1 relative w-full overflow-hidden">
                    <AnimatePresence mode="wait">
                        {currentView === 'list' ? (
                            <motion.div
                                key="list"
                                initial={!hasLoaded ? { opacity: 0, x: -20 } : false}
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
                                    savedScrollPos={homeScrollPos}
                                    onSaveScroll={setHomeScrollPos}
                                    hasLoaded={hasLoaded}
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
        </div>
    );
}
