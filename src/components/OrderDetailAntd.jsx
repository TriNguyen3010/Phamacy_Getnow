import React, { useState, useEffect } from 'react';
import {
    ArrowLeftOutlined,
    PrinterOutlined,
    DownloadOutlined,
    MinusOutlined,
    PlusOutlined,
    ReloadOutlined,
    MessageOutlined,
    EditOutlined,
    DeleteOutlined,
    InfoCircleOutlined,
    LikeOutlined,
    DislikeOutlined,
    ClockCircleOutlined,
    WalletOutlined,
    DownOutlined,
    UpOutlined,
    CarOutlined,
    CalendarOutlined,
    EyeOutlined,
    DropboxOutlined,
    CheckCircleOutlined,
    FileTextOutlined,
    UserOutlined,
    ExportOutlined,
    StarOutlined,
    StarFilled,
    EnvironmentOutlined, // Driver Picking Up
    WarningOutlined,
    BulbOutlined
} from '@ant-design/icons';
import {
    Layout,
    Row,
    Col,
    Button,
    Tag,
    Steps,
    Card,
    Typography,
    Space,
    Divider,
    Checkbox,
    Input,
    Collapse,
    Select
} from 'antd';
import { ChevronRight } from 'lucide-react';

const { Header, Content } = Layout;
const { Title, Text, Link } = Typography;
const { Panel } = Collapse;

import lisinoprilImg from '../assets/products/lisinopril.png';
import omeprazoleImg from '../assets/products/omeprazole.png';
import sucralfateImg from '../assets/products/sucralfate.png';
import gastropulgiteImg from '../assets/products/gastropulgite.png';
import probioticsImg from '../assets/products/probiotics.png';
import prescriptionImage from '../assets/prescription_mockup.png';

// --- Mock Data ---
const defaultOrderData = {
    id: "ORD-1005",
    created: "Created on 2026-01-15, 12:51:52 PM",
    customer: {
        name: "John Smith",
        phone: "0912 267 868",
        address: "54 Đường B4, An Lợi Đông, Thủ Đức, Thành phố Hồ Chí Minh 700000"
    },
    items: [
        { id: 1, name: "Omeprazole 20mg", price: 128000, qty: "1", unit: "Box", image: omeprazoleImg },
        { id: 2, name: "Sucralfate 1g", price: 150000, qty: "1", unit: "Box", image: sucralfateImg },
        { id: 3, name: "Gastropulgite", price: 124800, qty: "1", unit: "Box", image: gastropulgiteImg },
        { id: 4, name: "Lisinopril 10mg", price: 128000, qty: "1", unit: "Strip", warning: "Out of stock", image: lisinoprilImg }
    ]
};

// --- Sub Components ---

const GlobalHeader = () => (
    <div className="h-16 bg-white border-b border-[#F0F0F0] flex items-center justify-end px-6 gap-4 shrink-0">
        <Button
            shape="circle"
            icon={<span role="img" aria-label="mail" className="anticon anticon-mail"><svg viewBox="64 64 896 896" focusable="false" data-icon="mail" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.6 42.8 33.3L643.1 484 912 240l22.9 39.4-38.9 31.4z"></path></svg></span>}
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

const OrderHeader = ({ onBack, currentStep, orderId, createdDate, statusText }) => {
    const stepItems = [
        { title: 'New', status: currentStep > 0 ? 'finish' : 'process' },
        { title: 'Review', status: currentStep > 1 ? 'finish' : (currentStep === 1 ? 'process' : 'wait') },
        { title: 'Payment', status: currentStep > 2 ? 'finish' : (currentStep === 2 ? 'process' : 'wait') },
        { title: 'Packing', status: currentStep > 3 ? 'finish' : (currentStep === 3 ? 'process' : 'wait') },
        { title: 'Delivering', status: currentStep > 4 ? 'finish' : (currentStep === 4 ? 'process' : 'wait') },
        { title: 'Complete', status: currentStep === 5 ? 'finish' : 'wait' },
    ];

    return (
        <div className="bg-white border-b border-[#F0F0F0] px-6 py-4">
            <Row justify="space-between" align="middle" style={{ height: '100%' }}>
                <Col flex="1">
                    <div className="flex items-start gap-4">
                        <Button
                            type="text"
                            icon={<ArrowLeftOutlined style={{ fontSize: '16px' }} />}
                            onClick={onBack}
                            className="text-gray-500 hover:bg-gray-100 rounded-full"
                        />
                        <div>
                            <Text type="secondary" style={{ fontSize: '12px' }}>Order number</Text>
                            <div className="flex items-center gap-2 mt-1">
                                <Title level={3} style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>{orderId}</Title>
                            </div>
                            <Text type="secondary" style={{ fontSize: '12px' }}>{createdDate}</Text>
                        </div>
                    </div>
                </Col>

                <Col flex="600px" className="pl-6">
                    <Steps
                        size="small"
                        current={currentStep}
                        items={stepItems}
                        labelPlacement="vertical"
                        className="custom-steps w-full"
                    />
                </Col>
            </Row>
        </div>
    );
};

// --- Ready To Pack Layout ---
// --- Ready To Pack Layout ---
const ReadyToPackLayout = ({ orderData, onBack, onNext, initialIsPacked = false }) => {
    const defaultActiveKey = ['2']; // Prescription open by default
    const [checkedItems, setCheckedItems] = useState({});
    const [isPacked, setIsPacked] = useState(initialIsPacked);

    useEffect(() => {
        // Only auto-advance if we are already in "Ready to Ship" mode (initialIsPacked=true)
        // OR if the user just clicked confirm (isPacked became true from false)
        // AND if onNext is provided.
        if (isPacked && onNext) {
            // If manual packing (initialIsPacked=false), we want to just set isPacked=true visually, 
            // then maybe wait?
            // Actually, if we are in 'Packing' status, onNext is 'Ready to Ship'.
            // We should call onNext immediately when user clicks button? 
            // No, user wants "Looking for Driver" visual state.

            // If we are 'Packing': User clicks -> setIsPacked(true) -> "Looking for Driver".
            // We delay calling onNext ('Ready to Ship')?
            // Or we call onNext immediately, and 'Ready to Ship' status renders this same component with initialIsPacked=true? -> Yes.

            // But if we call onNext immediately, the parent re-renders 'Ready to Ship' layout.
            // 'Ready to Ship' layout IS THIS component with initialIsPacked=true.
            // So visually it works.
            // BUT, 'Ready to Ship' -> 'Driver Picking Up' needs delay.

            // So:
            // 1. If initialIsPacked=false (Packing status):
            //    User clicks button -> setIsPacked(true).
            //    We DO NOT auto-call onNext via timer? 
            //    Or we do? If we do, we go to 'Ready to Ship'.
            //    If we go to 'Ready to Ship', we render with initialIsPacked=true.
            //    Then that runs timer -> 'Driver Picking Up'.

            // So flow: Packing -> (User click) -> Ready to Ship -> (Timer) -> Driver Picking Up.
            // That seems right.

            const timer = setTimeout(() => {
                onNext();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isPacked, onNext]);

    // Toggle item check
    const handleItemCheck = (idx) => {
        setCheckedItems(prev => ({
            ...prev,
            [idx]: !prev[idx]
        }));
    };

    // Check if all items are checked
    const allChecked = orderData.items.every((_, i) => checkedItems[i]);

    // Helper to render collapsible header
    const renderHeader = (title, extra) => (
        <div className="flex justify-between items-center w-full">
            <Text strong style={{ fontSize: '14px' }}>{title}</Text>
            {extra}
        </div>
    );

    return (
        <div className="flex flex-col h-screen bg-white">
            <GlobalHeader />
            <OrderHeader
                onBack={onBack}
                currentStep={3} // Packing Step Active (0-index base? 
                // New=0, Review=1, Payment=2, Packing=3. Yes.)
                orderId={orderData.id}
                createdDate={orderData.created}
            />

            <div className="flex-1 overflow-y-auto bg-white p-8">
                <div className="max-w-4xl mx-auto space-y-6">

                    {/* Ready to Pack Banner */}
                    <div className="border border-[#237804] rounded-t-lg overflow-hidden">
                        <div className="bg-[#13854e] px-4 py-2 flex items-center gap-2 text-white">
                            {isPacked ? <CarOutlined /> : <DropboxOutlined />}
                            <span className="font-medium">{isPacked ? "Ready to ship out" : "Ready to pack"}</span>
                        </div>
                        <div className="bg-white p-4 border-b border-l border-r border-[#F0F0F0] rounded-b-lg">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <CheckCircleOutlined className="text-2xl text-[#13854e]" />
                                    <div>
                                        <Title level={4} style={{ margin: 0 }}>
                                            {isPacked ? "We’ll assign a driver to pick up your order..." : "Payment confirmed. Safe to dispense."}
                                        </Title>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 items-end">
                                    <Button icon={<PrinterOutlined />}>Print Shipping Label</Button>
                                    <Button>Preview Shipping Label</Button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-gray-100 mt-4">
                                <div>
                                    <span className="text-gray-500 text-xs block">Shipping method</span>
                                    <div className="flex items-center gap-1 font-medium text-gray-900">
                                        <TruckIconSmall />
                                        Standard - Receive within 24hrs
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-gray-500 text-xs block">Delivery deadline</span>
                                    <span className="font-bold text-gray-900">12:51 PM tomorrow</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Collapsible Sections */}
                    <Collapse
                        defaultActiveKey={defaultActiveKey}
                        expandIconPosition="end"
                        ghost
                        className="site-collapse-custom-collapse"
                    >
                        {/* Customer Details */}
                        <Panel header={renderHeader("Customer details")} key="1" className="border-b border-gray-100 py-2">
                            <div className="pl-0 pb-2">
                                <CustomerInfoSimple customer={orderData.customer} />
                            </div>
                        </Panel>

                        {/* Prescription (Packing Checklist) */}
                        <Panel
                            header={
                                <div className="flex justify-between items-center w-full pr-4">
                                    <Text strong className="text-sm">Prescription</Text>
                                    <Text type="secondary" className="text-xs">No. <Text strong className="text-gray-900">BN000000002</Text></Text>
                                </div>
                            }
                            key="2"
                            className="border-b border-gray-100 py-2"
                        >
                            <div className="pl-0">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <Text type="secondary" className="text-xs mr-2">Diagnosis</Text>
                                        <span className="text-sm font-medium">Stomachache</span>
                                    </div>
                                    <Button size="small">View uploaded prescription</Button>
                                </div>
                                <div className="mb-2">
                                    <Text type="secondary" className="text-xs block mb-2">Total item(s): {orderData.items.length}</Text>
                                    <div className="space-y-3">
                                        {orderData.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-white rounded border border-gray-200 flex items-center justify-center p-1">
                                                        <img src={item.image} className="w-full h-full object-contain" alt={item.name} />
                                                    </div>
                                                    <div>
                                                        <Text strong className="block text-sm">{item.name}</Text>
                                                        <Text type="secondary" className="text-xs">Qty: {item.qty}</Text>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-8">
                                                    <div className="text-right">
                                                        <Text type="secondary" className="text-xs block">Price</Text>
                                                        <Text strong>{item.price.toLocaleString()}đ</Text>
                                                    </div>
                                                    <Checkbox
                                                        checked={!!checkedItems[idx]}
                                                        onChange={() => handleItemCheck(idx)}
                                                        className="scale-125"
                                                        disabled={isPacked}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Panel>

                        {/* Payment Details */}
                        <Panel header={renderHeader("Payment details")} key="3" className="border-b border-gray-100 py-2">
                            <div className="space-y-2 pl-0">
                                <div className="flex justify-between">
                                    <Text className="text-gray-600">Total order</Text>
                                    <Text strong>791,800₫</Text>
                                </div>
                                <div className="flex justify-between">
                                    <Text className="text-gray-600">Shipping fee</Text>
                                    <Text strong>0₫</Text>
                                </div>
                                <div className="flex justify-between items-end pt-2">
                                    <Text strong>Total payment</Text>
                                    <Title level={3} style={{ margin: 0 }}>791,800₫</Title>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-[#F0F0F0] px-8 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-10 sticky bottom-0">
                <div className="max-w-4xl mx-auto flex justify-end items-center gap-4">
                    <Button
                        type="primary"
                        size="large"
                        disabled={!allChecked || isPacked}
                        onClick={isPacked ? null : () => setIsPacked(true)}
                        className={allChecked && !isPacked ? "bg-blue-600" : (isPacked ? "bg-gray-400 border-gray-400" : "")}
                    >
                        {isPacked ? "Looking for Driver" : "Confirm Packed & Ready to Ship"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Helper for Truck Icon
const TruckIconSmall = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
)

// Helper Component for shared customer info used in collapse
const CustomerInfoSimple = ({ customer }) => (
    <div className="grid grid-cols-2 gap-4">
        <div>
            <Text type="secondary" className="block text-xs">Name</Text>
            <Text strong>{customer.name}</Text>
        </div>
        <div>
            <Text type="secondary" className="block text-xs">Phone</Text>
            <Text strong>{customer.phone}</Text>
        </div>
        <div className="col-span-2">
            <Text type="secondary" className="block text-xs">Address</Text>
            <Text strong>{customer.address}</Text>
        </div>
    </div>
)

// --- Driver Assigned Layout (Ready to Ship) ---
const DriverAssignedLayout = ({ orderData, onBack }) => {
    const defaultActiveKey = ['2'];

    // Helper to render collapsible header
    const renderHeader = (title, extra) => (
        <div className="flex justify-between items-center w-full">
            <Text strong style={{ fontSize: '14px' }}>{title}</Text>
            {extra}
        </div>
    );

    return (
        <div className="flex flex-col h-screen bg-white">
            <GlobalHeader />
            <OrderHeader
                onBack={onBack}
                currentStep={4} // Delivering Step Active
                orderId={orderData.id}
                createdDate={orderData.created}
            />

            <div className="flex-1 overflow-y-auto bg-white p-8">
                <div className="max-w-4xl mx-auto space-y-6">

                    {/* Driver Assigned Banner */}
                    <div className="border border-[#237804] rounded-t-lg overflow-hidden">
                        <div className="bg-[#13854e] px-4 py-2 flex items-center gap-2 text-white">
                            <CarOutlined />
                            <span className="font-medium">Ready to ship out</span>
                        </div>
                        <div className="bg-white p-4 border-b border-l border-r border-[#F0F0F0] rounded-b-lg">
                            {/* Headline & Reprint */}
                            <div className="flex justify-between items-start mb-6">
                                <Title level={4} style={{ margin: 0 }}>Driver Assigned: Tai Pham is arriving.</Title>
                                <Button icon={<PrinterOutlined />}>Reprint Shipping Label</Button>
                            </div>

                            {/* Driver Info Grid */}
                            <div className="grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-6 items-center mb-6">
                                {/* Avatar */}
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                                    {/* Mock Avatar */}
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=TaiPham" alt="Driver" />
                                </div>
                                {/* Name */}
                                <div>
                                    <Text type="secondary" className="block text-xs">Driver's name</Text>
                                    <Text strong>Tai Pham</Text>
                                </div>
                                {/* Phone */}
                                <div>
                                    <Text type="secondary" className="block text-xs">Phone number</Text>
                                    <Text strong>078 389 270</Text>
                                </div>
                                {/* License */}
                                <div>
                                    <Text type="secondary" className="block text-xs">License plate</Text>
                                    <Text strong>59-X1 123.45</Text>
                                </div>
                                {/* Location Button */}
                                <div>
                                    <Button icon={<ExportOutlined />}>View location</Button>
                                </div>
                            </div>

                            {/* Shipping Details */}
                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                <div>
                                    <span className="text-gray-500 text-xs block">Shipping method</span>
                                    <div className="flex items-center gap-1 font-medium text-gray-900">
                                        <TruckIconSmall />
                                        Standard - Receive within 24hrs
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-gray-500 text-xs block">Delivery deadline</span>
                                    <span className="font-bold text-gray-900">12:51 PM tomorrow</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Collapsible Sections */}
                    <Collapse
                        defaultActiveKey={defaultActiveKey}
                        expandIconPosition="end"
                        ghost
                        className="site-collapse-custom-collapse"
                    >
                        {/* Customer Details */}
                        <Panel header={renderHeader("Customer details")} key="1" className="border-b border-gray-100 py-2">
                            <div className="pl-0 pb-2">
                                <CustomerInfoSimple customer={orderData.customer} />
                            </div>
                        </Panel>

                        {/* Prescription (Read Only) */}
                        <Panel
                            header={
                                <div className="flex justify-between items-center w-full pr-4">
                                    <Text strong className="text-sm">Prescription</Text>
                                    <Text type="secondary" className="text-xs">No. <Text strong className="text-gray-900">BN000000002</Text></Text>
                                </div>
                            }
                            key="2"
                            className="border-b border-gray-100 py-2"
                        >
                            <div className="pl-0">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <Text type="secondary" className="text-xs mr-2">Diagnosis</Text>
                                        <span className="text-sm font-medium">Stomachache</span>
                                    </div>
                                    <Button size="small">View uploaded prescription</Button>
                                </div>
                                <div className="mb-2">
                                    <Text type="secondary" className="text-xs block mb-2">Total item(s): {orderData.items.length}</Text>
                                    <div className="space-y-3">
                                        {orderData.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-white rounded border border-gray-200 flex items-center justify-center p-1">
                                                        <img src={item.image} className="w-full h-full object-contain" alt={item.name} />
                                                    </div>
                                                    <div>
                                                        <Text strong className="block text-sm">{item.name}</Text>
                                                        <Text type="secondary" className="text-xs">Qty: {item.qty}</Text>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <Text type="secondary" className="text-xs block">Price</Text>
                                                    <Text strong>{item.price.toLocaleString()}đ</Text>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Panel>

                        {/* Payment Details */}
                        <Panel header={renderHeader("Payment details")} key="3" className="border-b border-gray-100 py-2">
                            <div className="space-y-2 pl-0">
                                <div className="flex justify-between">
                                    <Text className="text-gray-600">Total order</Text>
                                    <Text strong>791,800₫</Text>
                                </div>
                                <div className="flex justify-between">
                                    <Text className="text-gray-600">Shipping fee</Text>
                                    <Text strong>0₫</Text>
                                </div>
                                <div className="flex justify-between items-end pt-2">
                                    <Text strong>Total payment</Text>
                                    <Title level={3} style={{ margin: 0 }}>791,800₫</Title>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-[#F0F0F0] px-8 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-10 sticky bottom-0">
                <div className="max-w-4xl mx-auto flex flex-col items-end gap-2">
                    <Text type="secondary" style={{ fontSize: '12px' }}>Drivers usually scan, use this only if scanning fails</Text>
                    <Button size="large">
                        Contact Support
                    </Button>
                </div>
            </div>
        </div>
    );
};

// --- Out For Delivery Layout ---
const OutForDeliveryLayout = ({ orderData, onBack }) => {
    const defaultActiveKey = ['2'];

    // Helper to render collapsible header
    const renderHeader = (title, extra) => (
        <div className="flex justify-between items-center w-full">
            <Text strong style={{ fontSize: '14px' }}>{title}</Text>
            {extra}
        </div>
    );

    return (
        <div className="flex flex-col h-screen bg-white">
            <GlobalHeader />
            <OrderHeader
                onBack={onBack}
                currentStep={4} // Delivering is Step 4 (or 5? Stepper: New, Review, Payment, Packing, Delivering, Complete. 0,1,2,3,4,5. So 4 is correct.)
                orderId={orderData.id}
                createdDate={orderData.created}
            />

            <div className="flex-1 overflow-y-auto bg-white p-8">
                <div className="max-w-4xl mx-auto space-y-6">

                    {/* Out for Delivery Banner */}
                    <div className="border border-[#237804] rounded-t-lg overflow-hidden">
                        <div className="bg-[#13854e] px-4 py-2 flex items-center gap-2 text-white">
                            <TruckIconSmall />
                            <span className="font-medium">Out for delivery</span>
                        </div>
                        <div className="bg-white p-4 border-b border-l border-r border-[#F0F0F0] rounded-b-lg">
                            {/* Headline & Report */}
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <Title level={4} style={{ margin: 0 }}>Your order is on the way to deliver.</Title>
                                    <Text type="secondary" className="text-xs">Estimated arrival time: Today, before 7:00 PM</Text>
                                </div>
                                <Button>Report delivery issue</Button>
                            </div>

                            <Divider dashed style={{ margin: '16px 0' }} />

                            {/* Driver Info Grid */}
                            <div className="grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-6 items-center mb-6">
                                {/* Avatar */}
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=TaiPham" alt="Driver" />
                                </div>
                                {/* Name */}
                                <div>
                                    <Text type="secondary" className="block text-xs">Driver's name</Text>
                                    <Text strong>Tai Pham</Text>
                                </div>
                                {/* Phone */}
                                <div>
                                    <Text type="secondary" className="block text-xs">Phone number</Text>
                                    <Text strong>078 389 270</Text>
                                </div>
                                {/* License */}
                                <div>
                                    <Text type="secondary" className="block text-xs">License plate</Text>
                                    <Text strong>59-X1 123.45</Text>
                                </div>
                                {/* Track Button */}
                                <div>
                                    <Button icon={<ExportOutlined />}>Track shipment</Button>
                                </div>
                            </div>

                            {/* Shipping Details */}
                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                <div>
                                    <span className="text-gray-500 text-xs block">Shipping method</span>
                                    <div className="flex items-center gap-1 font-medium text-gray-900">
                                        <TruckIconSmall />
                                        Standard - Receive within 24hrs
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-gray-500 text-xs block">Delivery deadline</span>
                                    <span className="font-bold text-gray-900">12:51 PM tomorrow</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Collapsible Sections */}
                    <Collapse
                        defaultActiveKey={defaultActiveKey}
                        expandIconPosition="end"
                        ghost
                        className="site-collapse-custom-collapse"
                    >
                        {/* Customer Details */}
                        <Panel header={renderHeader("Customer details")} key="1" className="border-b border-gray-100 py-2">
                            <div className="pl-0 pb-2">
                                <CustomerInfoSimple customer={orderData.customer} />
                            </div>
                        </Panel>

                        {/* Prescription (Read Only) */}
                        <Panel
                            header={
                                <div className="flex justify-between items-center w-full pr-4">
                                    <Text strong className="text-sm">Prescription</Text>
                                    <Text type="secondary" className="text-xs">No. <Text strong className="text-gray-900">BN000000002</Text></Text>
                                </div>
                            }
                            key="2"
                            className="border-b border-gray-100 py-2"
                        >
                            <div className="pl-0">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <Text type="secondary" className="text-xs mr-2">Diagnosis</Text>
                                        <span className="text-sm font-medium">Stomachache</span>
                                    </div>
                                    <Button size="small">View uploaded prescription</Button>
                                </div>
                                <div className="mb-2">
                                    <Text type="secondary" className="text-xs block mb-2">Total item(s): {orderData.items.length}</Text>
                                    <div className="space-y-3">
                                        {orderData.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-white rounded border border-gray-200 flex items-center justify-center p-1">
                                                        <img src={item.image} className="w-full h-full object-contain" alt={item.name} />
                                                    </div>
                                                    <div>
                                                        <Text strong className="block text-sm">{item.name}</Text>
                                                        <Text type="secondary" className="text-xs">Qty: {item.qty}</Text>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <Text type="secondary" className="text-xs block">Price</Text>
                                                    <Text strong>{item.price.toLocaleString()}đ</Text>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Panel>

                        {/* Payment Details */}
                        <Panel header={renderHeader("Payment details")} key="3" className="border-b border-gray-100 py-2">
                            <div className="space-y-2 pl-0">
                                <div className="flex justify-between">
                                    <Text className="text-gray-600">Total order</Text>
                                    <Text strong>791,800₫</Text>
                                </div>
                                <div className="flex justify-between">
                                    <Text className="text-gray-600">Shipping fee</Text>
                                    <Text strong>0₫</Text>
                                </div>
                                <div className="flex justify-between items-end pt-2">
                                    <Text strong>Total payment</Text>
                                    <Title level={3} style={{ margin: 0 }}>791,800₫</Title>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-[#F0F0F0] px-8 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-10 sticky bottom-0">
                <div className="max-w-4xl mx-auto flex justify-end items-center gap-4">
                    <Button size="large">
                        Contact Support
                    </Button>
                </div>
            </div>
        </div>
    );
};

// --- Completed Layout ---
const CompletedLayout = ({ orderData, onBack }) => {
    const defaultActiveKey = ['2'];
    const [rating, setRating] = useState(5);

    // Helper to render collapsible header
    const renderHeader = (title, extra) => (
        <div className="flex justify-between items-center w-full">
            <Text strong style={{ fontSize: '14px' }}>{title}</Text>
            {extra}
        </div>
    );

    return (
        <div className="flex flex-col h-screen bg-white">
            <GlobalHeader />
            <OrderHeader
                onBack={onBack}
                currentStep={5} // Complete Step Active
                orderId={orderData.id}
                createdDate={orderData.created}
            />

            <div className="flex-1 overflow-y-auto bg-white p-8">
                <div className="max-w-4xl mx-auto space-y-6">

                    {/* Order Complete Banner */}
                    <div className="border border-[#237804] rounded-t-lg overflow-hidden">
                        <div className="bg-[#13854e] px-4 py-2 flex items-center gap-2 text-white">
                            <CheckCircleOutlined />
                            <span className="font-medium">Order complete</span>
                        </div>
                        <div className="bg-white p-4 border-b border-l border-r border-[#F0F0F0] rounded-b-lg">
                            {/* Headline & Print */}
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <Title level={4} style={{ margin: 0 }}>Order was successfully delivered.</Title>
                                    <Text type="secondary" className="text-xs">Delivered on: 2026-01-15, 17:18:15 PM</Text>
                                </div>
                                <Button icon={<PrinterOutlined />}>Print invoice</Button>
                            </div>

                            <Divider dashed style={{ margin: '16px 0' }} />

                            {/* Driver Info Row */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-6">
                                    {/* Avatar */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=TaiPham" alt="Driver" />
                                        </div>
                                        <div>
                                            <Text type="secondary" className="block text-xs">Driver's name</Text>
                                            <Text strong>Tai Pham</Text>
                                        </div>
                                    </div>
                                    {/* Phone */}
                                    <div>
                                        <Text type="secondary" className="block text-xs">Phone number</Text>
                                        <Text strong>078 389 270</Text>
                                    </div>
                                    {/* License */}
                                    <div>
                                        <Text type="secondary" className="block text-xs">License plate</Text>
                                        <Text strong>59-X1 123.45</Text>
                                    </div>
                                </div>
                                {/* Track Button */}
                                <Button icon={<ExportOutlined />}>Track shipment</Button>
                            </div>

                            {/* Rating Section */}
                            <div className="mb-6">
                                <Text type="secondary" className="block text-xs mb-1">Rating the pickup speed/attitude</Text>
                                <div className="flex gap-1 text-2xl cursor-pointer">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span key={star} onClick={() => setRating(star)} className="text-[#4F46E5] hover:scale-110 transition-transform">
                                            {star <= rating ? <StarFilled /> : <StarOutlined />}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Shipping Details */}
                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                <div>
                                    <span className="text-gray-500 text-xs block">Shipping method</span>
                                    <div className="flex items-center gap-1 font-medium text-gray-900">
                                        <TruckIconSmall />
                                        Standard - Receive within 24hrs
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-gray-500 text-xs block">Delivered on</span>
                                    <span className="font-bold text-gray-900">2026-01-15, 17:18:15 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Collapsible Sections */}
                    <Collapse
                        defaultActiveKey={defaultActiveKey}
                        expandIconPosition="end"
                        ghost
                        className="site-collapse-custom-collapse"
                    >
                        {/* Customer Details */}
                        <Panel header={renderHeader("Customer details")} key="1" className="border-b border-gray-100 py-2">
                            <div className="pl-0 pb-2">
                                <CustomerInfoSimple customer={orderData.customer} />
                            </div>
                        </Panel>

                        {/* Prescription (Read Only with Checks) */}
                        <Panel
                            header={
                                <div className="flex justify-between items-center w-full pr-4">
                                    <Text strong className="text-sm">Prescription</Text>
                                    <Text type="secondary" className="text-xs">No. <Text strong className="text-gray-900">BN000000002</Text></Text>
                                </div>
                            }
                            key="2"
                            className="border-b border-gray-100 py-2"
                        >
                            <div className="pl-0">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <Text type="secondary" className="text-xs mr-2">Diagnosis</Text>
                                        <span className="text-sm font-medium">Stomachache</span>
                                    </div>
                                    <Button size="small">View uploaded prescription</Button>
                                </div>
                                <div className="mb-2">
                                    <Text type="secondary" className="text-xs block mb-2">Total item(s): {orderData.items.length}</Text>
                                    <div className="space-y-3">
                                        {orderData.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-white rounded border border-gray-200 flex items-center justify-center p-1">
                                                        <img src={item.image} className="w-full h-full object-contain" alt={item.name} />
                                                    </div>
                                                    <div>
                                                        <Text strong className="block text-sm">{item.name}</Text>
                                                        <Text type="secondary" className="text-xs">Qty: {item.qty}</Text>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-8">
                                                    <div className="text-right">
                                                        <Text type="secondary" className="text-xs block">Price</Text>
                                                        <Text strong>{item.price.toLocaleString()}đ</Text>
                                                    </div>
                                                    <Checkbox checked disabled className="scale-110" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Panel>

                        {/* Payment Details */}
                        <Panel header={renderHeader("Payment details")} key="3" className="border-b border-gray-100 py-2">
                            <div className="space-y-2 pl-0">
                                <div className="flex justify-between">
                                    <Text className="text-gray-600">Total order</Text>
                                    <Text strong>791,800₫</Text>
                                </div>
                                <div className="flex justify-between">
                                    <Text className="text-gray-600">Shipping fee</Text>
                                    <Text strong>0₫</Text>
                                </div>
                                <div className="flex justify-between items-end pt-2">
                                    <Text strong>Total payment</Text>
                                    <Title level={3} style={{ margin: 0 }}>791,800₫</Title>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-[#F0F0F0] px-8 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-10 sticky bottom-0">
                <div className="max-w-4xl mx-auto flex justify-end items-center gap-4">
                    <Button size="large">
                        Contact Support
                    </Button>
                </div>
            </div>
        </div>
    );
};

// --- Waiting Payment Components ---
const WaitingPaymentLayout = ({ orderData, onBack, onConfirmPayment }) => {
    const defaultActiveKey = ['2', '3']; // Expands Prescription and Payment details by default

    // Helper to render collapsible header
    const renderHeader = (title, extra) => (
        <div className="flex justify-between items-center w-full">
            <Text strong style={{ fontSize: '14px' }}>{title}</Text>
            {extra}
        </div>
    );

    return (
        <div className="flex flex-col h-screen bg-white">
            <GlobalHeader />
            <OrderHeader
                onBack={onBack}
                currentStep={2} // Payment Step Active
                orderId={orderData.id}
                createdDate={orderData.created}
            />

            <div className="flex-1 overflow-y-auto bg-white p-8">
                <div className="max-w-4xl mx-auto space-y-6">

                    {/* Awaiting Payment Banner Card */}
                    <div className="border border-[#D48806] rounded-t-lg overflow-hidden">
                        <div className="bg-[#B45F06] px-4 py-2 flex items-center gap-2 text-white">
                            <WalletOutlined />
                            <span className="font-medium">Awaiting for payment</span>
                        </div>
                        <div className="bg-white p-4 border-b border-l border-r border-[#F0F0F0] rounded-b-lg">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="text-gray-500 text-xs">Total due:</div>
                                    <div className="text-2xl font-bold text-gray-900">791,800₫</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-gray-500 text-xs text-right">Holds order for:</div>
                                    <div className="text-xl font-bold text-gray-900">14:59</div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                <div>
                                    <span className="text-gray-500 text-xs block">Payment method</span>
                                    <span className="font-medium text-gray-900">Bank Transfer</span>
                                </div>
                                <Button size="middle">Remind Customer</Button>
                            </div>
                        </div>
                    </div>

                    {/* Collapsible Sections */}
                    <Collapse
                        defaultActiveKey={defaultActiveKey}
                        expandIconPosition="end"
                        ghost
                        className="site-collapse-custom-collapse"
                    >
                        {/* Customer Details */}
                        <Panel header={renderHeader("Customer details")} key="1" className="border-b border-gray-100 py-2">
                            <div className="pl-0 pb-2">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Text type="secondary" className="block text-xs">Name</Text>
                                        <Text strong>{orderData.customer.name}</Text>
                                    </div>
                                    <div>
                                        <Text type="secondary" className="block text-xs">Phone</Text>
                                        <Text strong>{orderData.customer.phone}</Text>
                                    </div>
                                    <div className="col-span-2">
                                        <Text type="secondary" className="block text-xs">Address</Text>
                                        <Text strong>{orderData.customer.address}</Text>
                                    </div>
                                </div>
                            </div>
                        </Panel>

                        {/* Prescription */}
                        <Panel
                            header={
                                <div className="flex justify-between items-center w-full pr-4">
                                    <Text strong className="text-sm">Prescription</Text>
                                    <Text type="secondary" className="text-xs">No. <Text strong className="text-gray-900">BN000000002</Text></Text>
                                </div>
                            }
                            key="2"
                            className="border-b border-gray-100 py-2"
                        >
                            <div className="pl-0">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <Text type="secondary" className="text-xs mr-2">Diagnosis</Text>
                                        <span className="text-sm font-medium">Stomachache</span>
                                    </div>
                                    <Button size="small">View uploaded prescription</Button>
                                </div>
                                <div className="mb-2">
                                    <Text type="secondary" className="text-xs block mb-2">Total item(s): {orderData.items.length}</Text>
                                    <div className="space-y-3">
                                        {orderData.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-white rounded border border-gray-200 flex items-center justify-center p-1">
                                                        <img src={item.image} className="w-full h-full object-contain" alt={item.name} />
                                                    </div>
                                                    <div>
                                                        <Text strong className="block text-sm">{item.name}</Text>
                                                        <Text type="secondary" className="text-xs">Qty: {item.qty}</Text>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <Text type="secondary" className="text-xs block">Price</Text>
                                                    <Text strong>{item.price.toLocaleString()}đ</Text>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Button type="link" icon={<PlusOutlined />} className="pl-0 mt-2">1 more</Button>
                                </div>
                            </div>
                        </Panel>

                        {/* Payment Details */}
                        <Panel header={renderHeader("Payment details")} key="3" className="border-b border-gray-100 py-2">
                            <div className="space-y-2 pl-0">
                                <div className="flex justify-between">
                                    <Text className="text-gray-600">Total order</Text>
                                    <Text strong>791,800₫</Text>
                                </div>
                                <div className="flex justify-between">
                                    <Text className="text-gray-600">Shipping fee</Text>
                                    <Text strong>0₫</Text>
                                </div>
                                <div className="flex justify-between items-end pt-2">
                                    <Text strong>Total payment</Text>
                                    <Title level={3} style={{ margin: 0 }}>791,800₫</Title>
                                </div>
                                <div className="flex justify-between pt-1">
                                    <Text className="text-gray-600">Payment method</Text>
                                    <Text className="text-gray-900">Bank transfer</Text>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>

                    {/* Shipping Method - Single Line */}
                    <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center bg-white">
                        <span className="font-medium text-gray-900">Shipping method</span>
                        <div className="flex items-center gap-2">
                            <CalendarOutlined className="text-gray-500" />
                            <span className="font-medium">Standard - Receive within 24hrs</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-[#F0F0F0] px-8 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-10 sticky bottom-0">
                <div className="max-w-4xl mx-auto flex justify-end items-center gap-4">
                    <Button type="text" danger>Cancel order</Button>
                    <Button type="primary" size="large" className="bg-blue-600" onClick={onConfirmPayment}>Confirm payment manually</Button>
                </div>
            </div>
        </div>
    );
}

// --- Original Components (Review Mode) ---

const CustomerInfo = ({ customer }) => {
    return (
        <Card bordered={false} className="shadow-sm mb-6" bodyStyle={{ padding: '0' }}>
            <div className="border-b border-gray-100 px-5 py-3">
                <Title level={5} style={{ margin: 0 }}>Customer details</Title>
            </div>
            <div className="p-5">
                <div className="grid grid-cols-[1.5fr_1fr] gap-x-8 gap-y-6">
                    <div>
                        <Text className="text-gray-500 text-xs block mb-1">Customer name</Text>
                        <Text strong className="text-base">{customer.name}</Text>
                    </div>
                    <div>
                        <Text className="text-gray-500 text-xs block mb-1">Phone number</Text>
                        <div className="flex items-center gap-2">
                            <Text strong className="text-base">{customer.phone}</Text>
                            <Button size="small" icon={<MessageOutlined />} className="text-gray-400 border-gray-200" />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <Text className="text-gray-500 text-xs block mb-1">Ship to</Text>
                        <Text strong className="block text-sm">{customer.address}</Text>
                    </div>
                </div>
            </div>
        </Card>
    );
};

const ProductList = ({ items }) => {
    return (
        <div className="mb-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <Title level={5} style={{ margin: 0 }}>Prescription</Title>
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded px-2 py-1">
                    <span className="text-gray-500 text-xs">No.</span>
                    <span className="font-bold text-xs text-gray-900">BN000000002</span>
                    <ExportOutlined className="text-gray-400 text-xs cursor-pointer" />
                </div>
            </div>

            {/* Diagnosis */}
            <div className="mb-6 bg-white border border-gray-200 rounded p-0 grid grid-cols-[100px_1fr] items-center">
                <div className="px-3 py-2 text-gray-500 text-sm border-r border-gray-200 bg-gray-50">Diagnosis</div>
                <div className="px-3 py-2 font-medium text-gray-900">Stomachache</div>
            </div>

            {/* Items Header */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm">Items: <strong className="text-gray-900">{items.length}</strong></span>
                    <span className="bg-[#FEF3C7] text-[#92400E] text-xs font-medium px-2 py-0.5 rounded border border-[#FDE68A]">
                        Drafted by AI. Verify carefully.
                    </span>
                </div>
                <Button type="link" icon={<PlusOutlined />} className="text-blue-600 font-medium px-0">Add item</Button>
            </div>

            {/* Items List */}
            <div className="flex flex-col gap-4">
                {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                        {/* Thumbnail */}
                        <div className="w-16 h-16 bg-white rounded border border-gray-200 flex items-center justify-center flex-shrink-0 p-1">
                            {item.image ? (
                                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                            ) : (
                                <FileTextOutlined className="text-2xl text-gray-300" />
                            )}
                        </div>

                        {/* Form Area */}
                        <div className="flex-1 space-y-3">
                            {/* Warning Banner inside item */}
                            {item.warning ? (
                                <div>
                                    {/* Name Row */}
                                    <div className="border border-gray-200 rounded px-3 py-1.5 flex items-center bg-white mb-2 relative hover:border-blue-300 transition-colors">
                                        <span className="text-gray-400 text-xs mr-2">Name</span>
                                        <span className="text-gray-900 font-bold flex-1">{item.name}</span>
                                        <DownOutlined className="text-gray-900 text-xs" />
                                    </div>

                                    {/* Warning Row */}
                                    <div className="text-[#DAA507] text-xs font-medium flex items-center gap-1.5 mb-2 pl-1">
                                        <WarningOutlined /> Out of stock
                                    </div>

                                    {/* Qty/Unit Row */}
                                    <div className="grid grid-cols-2 gap-3 mb-2">
                                        <div className="border border-gray-200 rounded px-3 py-1.5 flex items-center bg-gray-50 hover:border-blue-300 transition-colors">
                                            <span className="text-gray-400 text-xs mr-2">Qty</span>
                                            <span className="text-gray-900 font-medium flex-1">{item.qty}</span>
                                            <DownOutlined className="text-gray-400 text-xs" />
                                        </div>
                                        <div className="border border-gray-200 rounded px-3 py-1.5 flex items-center bg-gray-50 hover:border-blue-300 transition-colors">
                                            <span className="text-gray-400 text-xs mr-2">Unit</span>
                                            <span className="text-gray-900 font-medium flex-1">{item.unit}</span>
                                            <DownOutlined className="text-gray-400 text-xs" />
                                        </div>
                                    </div>

                                    {/* Price Row */}
                                    <div className="border border-gray-200 rounded px-3 py-1.5 flex items-center bg-gray-50 mb-4 opacity-75">
                                        <span className="text-gray-400 text-xs mr-2">Price</span>
                                        <span className="text-gray-600 font-medium">{item.price.toLocaleString()}</span>
                                    </div>

                                    {/* Suggestion Box */}
                                    <div className="bg-[#eff6ff] rounded-lg p-4 relative">
                                        <div className="flex gap-3">
                                            <BulbOutlined className="text-gray-900 mt-1 text-lg" />
                                            <div className="flex-1">
                                                <div className="text-sm text-gray-900 mb-2">
                                                    Change to: <span className="font-bold">Blackmores Probiotics?</span>
                                                </div>
                                                <div className="text-sm text-gray-900 mb-2 font-bold">
                                                    Price gap: +8,000
                                                </div>
                                                <div className="text-xs text-slate-500 italic mb-4">
                                                    Tips: Always consult with customer.
                                                </div>
                                                <div className="flex gap-3">
                                                    <Button size="middle" danger className="bg-white flex items-center gap-2">
                                                        <DislikeOutlined /> Keep original
                                                    </Button>
                                                    <Button size="middle" className="bg-white text-green-700 border-green-200 hover:text-green-800 hover:border-green-400 flex items-center gap-2">
                                                        <LikeOutlined /> Apply switch
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Row 1: Name */}
                                    <div className="border border-gray-200 rounded px-3 py-1.5 flex items-center bg-white hover:border-blue-300 transition-colors w-full relative">
                                        <span className="text-gray-400 text-xs mr-2">Name</span>
                                        <span className="text-gray-900 font-medium flex-1">{item.name}</span>
                                        <DownOutlined className="text-gray-400 text-xs" />
                                    </div>

                                    {/* Row 2: Qt / Unit / Price */}
                                    <div className="grid grid-cols-[1fr_1fr_1.5fr] gap-3">
                                        <div className="border border-gray-200 rounded px-3 py-1.5 flex items-center bg-white hover:border-blue-300 transition-colors focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                                            <span className="text-gray-400 text-xs mr-2">Qty</span>
                                            <input
                                                type="number"
                                                defaultValue={item.qty}
                                                className="flex-1 w-full min-w-0 outline-none text-gray-900 font-medium bg-transparent p-0 m-0"
                                            />
                                        </div>
                                        <div className="border border-gray-200 rounded px-3 py-1.5 flex items-center bg-white hover:border-blue-300 transition-colors">
                                            <span className="text-gray-400 text-xs mr-2">Unit</span>
                                            <span className="text-gray-900 font-medium flex-1">{item.unit}</span>
                                        </div>
                                        <div className="border border-gray-200 rounded px-3 py-1.5 flex items-center bg-white hover:border-blue-300 transition-colors">
                                            <span className="text-gray-400 text-xs mr-2">Price</span>
                                            <span className="text-gray-900 font-medium flex-1">{item.price.toLocaleString()}đ</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const DocumentViewer = () => {
    return (
        <div className="h-full bg-[#1F1F1F] flex flex-col relative border-r border-[#303030]">
            <div className="h-10 bg-black flex items-center justify-between px-4">
                <Text className="text-gray-400 text-xs">Prescription - Uploaded by John Smith</Text>
                <div className="flex gap-2">
                    <Button type="text" icon={<PrinterOutlined className="text-gray-400" />} size="small" />
                    <Button type="text" icon={<DownloadOutlined className="text-gray-400" />} size="small" />
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-8 bg-[#1F1F1F] overflow-hidden relative">
                <div className="h-full w-auto aspect-[3/4] max-w-full">
                    <img
                        src={prescriptionImage}
                        alt="Prescription"
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>

            <div className="h-12 bg-[#141414] border-t border-[#303030] flex justify-between items-center px-4">
                <Text className="text-gray-400">1 / 1</Text>
                <Space>
                    <Button type="text" icon={<MinusOutlined className="text-gray-400" />} />
                    <Text className="text-gray-400">100%</Text>
                    <Button type="text" icon={<PlusOutlined className="text-gray-400" />} />
                </Space>
                <Button type="text" icon={<ReloadOutlined className="text-gray-400" />} />
            </div>
        </div>
    )
}


const SummaryDetails = () => (
    <>
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <h3 className="font-bold text-gray-800 mb-2 text-sm">Shipping method</h3>
            <Select
                defaultValue="standard"
                style={{ width: '100%' }}
                size="large"
                className="mb-2"
                options={[
                    { value: 'standard', label: 'Standard - Free (Receive within the day)' },
                    { value: 'express', label: 'Express - 25,000đ (2 hours)' },
                ]}
            />
            <Text type="secondary" className="text-slate-500 text-xs">Check with customer during consultancy</Text>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <h3 className="font-bold text-gray-800 mb-2 text-sm">Payment method</h3>
            <Select
                defaultValue="bank"
                style={{ width: '100%' }}
                size="large"
                className="mb-2"
                options={[
                    { value: 'cod', label: 'Cash on Delivery (COD)' },
                    { value: 'bank', label: 'Bank Transfer' },
                    { value: 'momo', label: 'Momo Wallet' },
                ]}
            />
            <Text type="secondary" className="text-slate-500 text-xs">Check with customer during consultancy</Text>
        </div>
        <Card bordered={false} className="shadow-sm mb-4" bodyStyle={{ padding: '20px' }}>
            <div className="flex justify-between items-center mb-0">
                <Title level={5} style={{ margin: 0 }}>Voucher</Title>
                <Button type="link" icon={<PlusOutlined />} size="small">Add</Button>
            </div>
        </Card>

        <Card bordered={false} className="shadow-sm mb-8" bodyStyle={{ padding: '20px' }}>
            <Title level={5} style={{ margin: '0 0 16px 0' }}>Payment details</Title>
            <div className="flex justify-between mb-4">
                <Text>Total order</Text>
                <Text strong>783,800₫</Text>
            </div>
            <Divider dashed style={{ margin: '12px 0' }} />
            <div className="flex justify-between items-end">
                <Text strong>Total payment</Text>
                <Title level={3} style={{ margin: 0 }}>783,800₫</Title>
            </div>
        </Card>
    </>
)

export default function OrderDetailAntd({ onBack, onConfirm, onUpdate, order }) {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [localStatus, setLocalStatus] = useState(null);

    // Reset localStatus when order prop changes
    useEffect(() => {
        setLocalStatus(null);
    }, [order]);

    // Determine which order data to use (prop or default mock)
    // Also ensuring items are valid if using props
    const effectiveOrder = order ? {
        ...defaultOrderData,
        ...order,
        id: order.id,
        items: order.items || defaultOrderData.items,
        created: `Created on ${order.date}`
    } : defaultOrderData;

    const currentStatus = localStatus || effectiveOrder.status;

    const isPaymentStatus = ['Waiting for Payment', 'Pending payment', 'Awaiting payment'].includes(currentStatus);
    const isPackingStatus = ['Packing', 'Ready to pack'].includes(currentStatus);
    const isReadyToShipStatus = currentStatus === 'Ready to Ship'; // Maps to Wrapper 1 (Looking for driver logic) but initialPacked=true
    const isDriverPickingUpStatus = currentStatus === 'Driver Picking Up';
    const isOutForDeliveryStatus = currentStatus === 'Out for Delivery';
    const isCompletedStatus = currentStatus === 'Completed';

    const handleConfirmOrder = () => {
        if (onConfirm) {
            onConfirm({ ...effectiveOrder, status: 'Waiting for Payment' });
        }
    };

    const handleStatusChange = (newStatus) => {
        setLocalStatus(newStatus);
        if (onUpdate) {
            onUpdate(effectiveOrder.id, newStatus);
        }
    }

    if (isPaymentStatus) {
        return (
            <WaitingPaymentLayout
                orderData={effectiveOrder}
                onBack={onBack}
                onConfirmPayment={() => handleStatusChange('Packing')}
            />
        );
    }

    if (isPackingStatus) {
        return (
            <ReadyToPackLayout
                orderData={effectiveOrder}
                onBack={onBack}
                initialIsPacked={false}
                onNext={() => handleStatusChange('Ready to Ship')}
            />
        );
    }

    if (isReadyToShipStatus) {
        return (
            <ReadyToPackLayout
                orderData={effectiveOrder}
                onBack={onBack}
                initialIsPacked={true}
                onNext={() => handleStatusChange('Driver Picking Up')}
            />
        );
    }

    if (isDriverPickingUpStatus) {
        return (
            <DriverAssignedLayout orderData={effectiveOrder} onBack={onBack} />
        );
    }

    if (isOutForDeliveryStatus) {
        return (
            <OutForDeliveryLayout orderData={effectiveOrder} onBack={onBack} />
        );
    }

    if (isCompletedStatus) {
        return (
            <CompletedLayout orderData={effectiveOrder} onBack={onBack} />
        );
    }

    // Default Review Layout
    return (
        <div className="h-screen flex flex-col bg-[#F9FAFB] overflow-hidden font-inter">
            <GlobalHeader />
            <OrderHeader
                onBack={onBack}
                currentStep={1}
                statusText="New"
                statusColor="geekblue"
                orderId={effectiveOrder.id}
                createdDate={effectiveOrder.created}
            />

            <div className="flex-1 overflow-hidden">
                <Row style={{ height: '100%' }}>
                    {/* Left Column: Document Viewer (55% width) */}
                    <Col flex="1 1 55%" style={{ height: '100%' }}>
                        <DocumentViewer />
                    </Col>

                    {/* Right Column: Order Form (45% width) */}
                    <Col flex="0 1 45%" className="h-full overflow-y-auto bg-[#FAFAFA] border-l border-[#F0F0F0]">
                        <div className="p-6">
                            {/* Status Bar: Review needed */}
                            <div className="border border-purple-200 bg-purple-50 rounded-lg mb-6 overflow-hidden">
                                <div className="bg-purple-100 flex items-center gap-2 px-4 py-2 text-purple-900 border-b border-purple-200">
                                    <ClockCircleOutlined />
                                    <span className="font-medium">Review needed</span>
                                </div>
                                <div className="bg-white px-4 py-3">
                                    <span className="text-gray-900 font-medium">Pharmacist review of prescriptions is mandatory by health regulations.</span>
                                </div>
                            </div>

                            <CustomerInfo customer={effectiveOrder.customer} />
                            <ProductList items={effectiveOrder.items} />
                            <SummaryDetails />
                        </div>
                    </Col>
                </Row>
            </div>

            {/* Footer Actions */}
            <div className="bg-white border-t border-[#F0F0F0] px-8 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-10">
                <div className="flex flex-col items-end gap-3">
                    <Checkbox checked={isConfirmed} onChange={(e) => setIsConfirmed(e.target.checked)}>I have consulted the customer and carefully checked the order <span className="text-red-500">*</span></Checkbox>
                    <Space>
                        <Button size="large">Decline order</Button>
                        <Button size="large" type="primary" disabled={!isConfirmed} onClick={handleConfirmOrder}>Confirm order</Button>
                    </Space>
                </div>
            </div>
        </div>
    );
}
