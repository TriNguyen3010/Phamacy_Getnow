import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import OrdersPage from './components/OrdersPage';
import OrderDetailPage from './components/OrderDetailPage';
import OrderDetailAntd from './components/OrderDetailAntd';

import { AnimatePresence, motion } from 'framer-motion';

function App() {
    const [currentView, setCurrentView] = useState('list'); // 'list' or 'detail'
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [notificationTab, setNotificationTab] = useState(null);

    const handleConfirm = () => {
        setCurrentView('list');
        setNotificationTab('Pending');
    }

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-[#F9FAFB]">
            <Sidebar />
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
                            <OrdersPage onNavigateToDetail={(order) => { setSelectedOrder(order); setCurrentView('detail'); }} notificationTab={notificationTab} />
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
                            <OrderDetailAntd onBack={() => setCurrentView('list')} onConfirm={handleConfirm} order={selectedOrder} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default App;
