import React, { useState } from 'react';
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
    CalendarOutlined
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
    Collapse
} from 'antd';
import { ChevronRight } from 'lucide-react';

const { Header, Content } = Layout;
const { Title, Text, Link } = Typography;
const { Panel } = Collapse;

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
        { id: 1, name: "Omeprazole 20mg", price: 128000, qty: "1 box", image: omeprazoleImg },
        { id: 2, name: "Sucralfate 1g", price: 150000, qty: "1 box", image: sucralfateImg },
        { id: 3, name: "Gastropulgite", price: 124800, qty: "1 box", image: gastropulgiteImg },
        { id: 4, name: "Probiotics", price: 381000, qty: "1 box", warning: "Insufficient stock", image: probioticsImg }
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

// --- Waiting Payment Components ---
const WaitingPaymentLayout = ({ orderData, onBack }) => {
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
                    <Button type="primary" size="large" className="bg-blue-600">Confirm payment manually</Button>
                </div>
            </div>
        </div>
    );
}

// --- Original Components (Review Mode) ---

const CustomerInfo = ({ customer }) => {
    return (
        <Card bordered={false} className="shadow-[0_1px_2px_rgba(0,0,0,0.03)] mb-4">
            <div className="flex justify-between items-center mb-4">
                <Title level={5} style={{ margin: 0 }}>Customer details</Title>
            </div>
            <Row gutter={[24, 16]}>
                <Col span={12}>
                    <Text type="secondary" style={{ fontSize: '12px', display: 'block' }}>Name</Text>
                    <Text strong>{customer.name}</Text>
                </Col>
                <Col span={12}>
                    <Text type="secondary" style={{ fontSize: '12px', display: 'block' }}>Phone number</Text>
                    <Space>
                        <Text strong>{customer.phone}</Text>
                        <MessageOutlined style={{ color: '#1890FF' }} />
                    </Space>
                </Col>
                <Col span={24}>
                    <Text type="secondary" style={{ fontSize: '12px', display: 'block' }}>Ship to</Text>
                    <Text strong>{customer.address}</Text>
                </Col>
            </Row>
        </Card>
    );
};

const ProductList = ({ items }) => {
    return (
        <Card bordered={false} className="shadow-[0_1px_2px_rgba(0,0,0,0.03)] mb-4" bodyStyle={{ padding: 0 }}>
            {/* Card Header area (custom) */}
            <div className="px-6 py-4 border-b border-[#F0F0F0] flex justify-between items-center">
                <Space>
                    <Title level={5} style={{ margin: 0 }}>Prescription</Title>
                </Space>
                <Space>
                    <Text type="secondary" style={{ fontSize: '12px' }}>No. <Text strong>BN000000002</Text></Text>
                    <MessageOutlined style={{ color: '#BFBFBF' }} />
                </Space>
            </div>

            <div className="p-6">
                <div className="mb-4">
                    <Text type="secondary" style={{ fontSize: '12px', marginRight: 8 }}>Diagnosis</Text>
                    <Tag style={{ background: '#FFF7E6', color: '#D46B08', border: '1px solid #FFD591' }}>Stomachache</Tag>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <Space>
                        <Text strong>Items: {items.length}</Text>
                        <Tag color="gold" style={{ border: 'none', background: '#FFFBE6' }}>Drafted by AI. Verify carefully.</Tag>
                    </Space>
                    <Button type="link" icon={<PlusOutlined />} style={{ padding: 0, fontWeight: 500 }}>Add item</Button>
                </div>

                <div className="flex flex-col gap-4">
                    {items.map((item) => (
                        <div key={item.id}>
                            <div className={`flex gap-4 p-3 rounded-lg border ${item.warning ? 'bg-[#FFF1F0] border-[#FFCCC7]' : 'bg-white border-transparent hover:border-[#1890FF]'}`}>
                                {/* Thumbnail */}
                                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-[#F0F0F0] overflow-hidden p-1">
                                    {item.image && item.image !== 'img' ? (
                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                    ) : (
                                        <div className="w-10 h-10 bg-[#F5F5F5] rounded"></div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <Text strong style={{ fontSize: '14px', display: 'block' }}>{item.name}</Text>
                                            <Text type="secondary" style={{ fontSize: '12px' }}>Qty: {item.qty}</Text>
                                        </div>
                                        <div className="text-right">
                                            <Text type="secondary" style={{ fontSize: '10px', display: 'block' }}>Price</Text>
                                            <Text strong className={item.warning ? "line-through text-gray-400" : ""}>{item.price.toLocaleString()}đ</Text>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col justify-center gap-2 pl-2 border-l border-[#F0F0F0] ml-2">
                                    <Button type="text" size="small" icon={<EditOutlined className="text-gray-400" />} />
                                    <Button type="text" size="small" icon={<DeleteOutlined className="text-gray-400" />} />
                                </div>
                            </div>

                            {/* Special Warning Box Logic */}
                            {item.warning && (
                                <div className="mt-2 bg-[#F9FAFB] border border-[#F0F0F0] rounded-lg p-3 ml-0">
                                    <Space align="start">
                                        <InfoCircleOutlined className="text-red-500 mt-1" />
                                        <div>
                                            <Text strong style={{ fontSize: '12px', display: 'block' }}>This item cannot be fulfilled due to insufficient stock.</Text>
                                            <div className="mt-1 text-xs">
                                                Change to: <Text strong>Blackmores {item.name}?</Text>
                                            </div>
                                            <div className="mt-1 text-xs text-gray-500">
                                                Price gap: <Text strong>+8,000</Text>
                                            </div>
                                        </div>
                                    </Space>
                                    <div className="flex justify-end gap-2 mt-2">
                                        <Button size="small" danger icon={<DislikeOutlined />}>Disagree</Button>
                                        <Button size="small" type="default" className="text-green-600 border-green-200 hover:text-green-700 hover:border-green-300 bg-white" icon={<LikeOutlined />}>Agree</Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

const DocumentViewer = () => {
    return (
        <div className="h-full bg-[#1F1F1F] flex flex-col relative border-r border-[#303030]">
            <div className="absolute top-4 right-4 z-10 flex gap-2">
                <Button icon={<PrinterOutlined />} ghost className="text-white bg-black/50 border-none" />
                <Button icon={<DownloadOutlined />} ghost className="text-white bg-black/50 border-none" />
            </div>

            <div className="flex-1 flex items-center justify-center p-8 bg-[#1F1F1F] overflow-hidden">
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
        <Card bordered={false} className="shadow-sm mb-4" bodyStyle={{ padding: '20px' }}>
            <div className="flex justify-between items-center mb-0">
                <Title level={5} style={{ margin: 0 }}>Shipping method</Title>
                <Button type="link" icon={<PlusOutlined />} size="small">Add</Button>
            </div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
                <InfoCircleOutlined className="mr-1" /> Check with customer during consultancy
            </Text>
        </Card>
        <Card bordered={false} className="shadow-sm mb-4" bodyStyle={{ padding: '20px' }}>
            <div className="flex justify-between items-center mb-0">
                <Title level={5} style={{ margin: 0 }}>Payment method</Title>
                <Button type="link" icon={<PlusOutlined />} size="small">Add</Button>
            </div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
                <InfoCircleOutlined className="mr-1" /> Check with customer during consultancy
            </Text>
        </Card>
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

export default function OrderDetailAntd({ onBack, onConfirm, order }) {
    const [isConfirmed, setIsConfirmed] = useState(false);

    // Determine which order data to use (prop or default mock)
    // Also ensuring items are valid if using props
    const effectiveOrder = order ? {
        ...defaultOrderData,
        ...order,
        id: order.id,
        items: order.items || defaultOrderData.items,
        created: `Created on ${order.date}`
    } : defaultOrderData;

    const isPaymentStatus = effectiveOrder.status === 'Waiting for Payment' || effectiveOrder.status === 'Pending payment';

    const handleConfirmOrder = () => {
        if (onConfirm) {
            onConfirm();
        }
    };

    if (isPaymentStatus) {
        return (
            <WaitingPaymentLayout orderData={effectiveOrder} onBack={onBack} />
        );
    }

    // Default Review Layout
    return (
        <div className="h-screen flex flex-col bg-[#F9FAFB] overflow-hidden font-inter">
            <GlobalHeader />
            <OrderHeader
                onBack={onBack}
                currentStep={1}
                statusText="Reviewing"
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
