// --- Order Returned Layout ---
const OrderReturnedLayout = ({ orderData, onBack }) => {
    const defaultActiveKey = ['2', '3', '4']; // Prescription, Refund, Payment
    const [checkedItems, setCheckedItems] = useState({});

    // Helper to render collapsible header
    const renderHeader = (title, extra) => (
        <div className="flex justify-between items-center w-full">
            <Text strong style={{ fontSize: '14px' }}>{title}</Text>
            {extra}
        </div>
    );

    // Toggle item check
    const handleItemCheck = (idx) => {
        setCheckedItems(prev => ({
            ...prev,
            [idx]: !prev[idx]
        }));
    };

    return (
        <div className="flex flex-col h-full bg-white">
            <OrderHeader
                onBack={onBack}
                currentStep={5}
                orderId={orderData.id}
                createdDate={orderData.created}
            />

            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Returned Banner - Fixed */}
                <div className="z-20 shrink-0 px-8 pt-0 bg-white">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white border rounded-lg border-gray-200 shadow-sm overflow-hidden mb-4">
                            {/* Header */}
                            <div className="bg-[#E5E7EB] px-4 py-2 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <DropboxOutlined />
                                    <span className="font-medium">Order returned</span>
                                </div>
                            </div>

                            <div className="p-4">
                                {/* Main Headline */}
                                <div className="flex justify-between items-start mb-4">
                                    <Title level={4} style={{ margin: 0 }}>Order was returned.</Title>
                                    <div className="flex flex-col items-end">
                                        <Text type="secondary" className="text-xs mb-1">Reason of return</Text>
                                        <Tag className="m-0 bg-white border border-gray-300 text-gray-700">Wrong / Missing item</Tag>
                                    </div>
                                </div>

                                {/* Driver Note */}
                                <div className="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-100 flex gap-3">
                                    <div className="w-16 h-12 bg-gray-200 rounded border border-gray-300 overflow-hidden flex-shrink-0">
                                        {/* Placeholder for driver's proof image */}
                                        <img src="https://placehold.co/600x400/png" alt="Proof" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <Text type="secondary" className="text-[10px] block font-medium text-blue-600 mb-1">Driver's note</Text>
                                        <Text className="text-sm text-gray-800">Customer checked and said expiration date of Gastropulgite is passed.</Text>
                                    </div>
                                    <Button size="small" className="bg-white border-gray-300 shadow-sm text-xs">View full image</Button>
                                </div>

                                {/* Driver Info & Shipping */}
                                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=TaiPham" alt="Driver" />
                                            </div>
                                            <div>
                                                <Text type="secondary" className="text-[10px] block">Driver's name</Text>
                                                <Text strong className="text-xs">Tai Pham</Text>
                                            </div>
                                        </div>
                                        <div>
                                            <Text type="secondary" className="text-[10px] block">Phone number</Text>
                                            <Text strong className="text-xs">078 389 270</Text>
                                        </div>
                                        <div>
                                            <Text type="secondary" className="text-[10px] block">License plate</Text>
                                            <Text strong className="text-xs">59-X1 123.45</Text>
                                        </div>
                                    </div>
                                    <Button size="small" icon={<ExportOutlined />} className="text-xs">Track shipment</Button>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-3">
                                    <div>
                                        <Text type="secondary" className="text-[10px] block">Shipping method</Text>
                                        <div className="flex items-center gap-1">
                                            <TruckIconSmall />
                                            <Text className="text-xs font-medium">Standard - Receive within 24hrs</Text>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <Text type="secondary" className="text-[10px] block">Delivered on</Text>
                                        <Text strong className="text-xs">2026-01-15, 17:18:15 PM</Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-8 pb-8 pt-2">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <Collapse
                            defaultActiveKey={defaultActiveKey}
                            expandIconPosition="end"
                            ghost
                            className="site-collapse-custom-collapse"
                        >
                            {/* Customer Details */}
                            <Panel header={renderHeader("Customer details")} key="1" className="border border-gray-200 rounded-lg mb-4 bg-white overflow-hidden py-2">
                                <div className="pl-0 pb-2">
                                    <CustomerInfoSimple customer={orderData.customer} />
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
                                className="border border-gray-200 rounded-lg mb-4 bg-white overflow-hidden py-2"
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

                                        {/* Info Alert */}
                                        <div className="bg-blue-50 border border-blue-100 rounded-md p-3 mb-4 flex items-center gap-2 text-blue-800 text-xs">
                                            <InfoCircleOutlined />
                                            <span>Check and verified your returned items.</span>
                                        </div>

                                        <div className="space-y-3">
                                            {orderData.items.map((item, idx) => (
                                                <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200">
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
                                                            className="scale-110"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Panel>

                            {/* Refund Details */}
                            <Panel header={renderHeader("Refund details")} key="4" className="border border-gray-200 rounded-lg mb-4 bg-white overflow-hidden py-2">
                                <div className="pl-0">
                                    {/* Info Alert */}
                                    <div className="bg-blue-50 border border-blue-100 rounded-md p-3 mb-4 flex items-start gap-2 text-blue-800 text-xs shadow-sm">
                                        <InfoCircleOutlined className="mt-0.5" />
                                        <div className="flex-1 flex justify-between">
                                            <span>Funds are frozen. Refund will be auto-release to the customer when you confirm return receipt.</span>
                                            <a href="#" className="font-medium hover:underline text-blue-700 flex items-center gap-1">Refund policy <ExportOutlined style={{ fontSize: '10px' }} /></a>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-end mb-2">
                                        <Text className="text-gray-600 text-xs">Total refund</Text>
                                        <Title level={3} style={{ margin: 0 }}>791,800₫</Title>
                                    </div>
                                    <div className="flex justify-between mb-1">
                                        <Text className="text-gray-600 text-xs">Order total</Text>
                                        <Text strong className="text-xs">791,800₫</Text>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <Text className="text-gray-600 text-xs">Shipping fee</Text>
                                        <Text strong className="text-xs">0₫</Text>
                                    </div>
                                    <div className="flex justify-between pt-2 border-t border-gray-100">
                                        <Text className="text-gray-600 text-xs">Refund to</Text>
                                        <Text strong className="text-xs">Bank account</Text>
                                    </div>
                                </div>
                            </Panel>

                            {/* Payment Details */}
                            <Panel header={renderHeader("Payment details")} key="3" className="border border-gray-200 rounded-lg mb-4 bg-white overflow-hidden py-2">
                                {/* ... Standard Payment Details Content ... */}
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
                                    <div className="flex justify-between pt-2 border-t border-gray-100 mt-2">
                                        <Text className="text-gray-600">Payment method</Text>
                                        <Text className="text-gray-900 font-medium">Bank transfer</Text>
                                    </div>
                                </div>
                            </Panel>
                        </Collapse>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-white border-t border-[#F0F0F0] px-8 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-10 sticky bottom-0">
                    <div className="max-w-4xl mx-auto flex justify-end items-center gap-3">
                        <div className="mr-auto">
                            <Button type="link" className="text-blue-600 p-0 font-medium hover:text-blue-700">Contact support</Button>
                        </div>
                        <Button danger className="border-red-500 text-red-500 bg-white">Report issue</Button>
                        <Button type="default" disabled className="bg-gray-100 text-gray-400 border-gray-200 font-medium">Confirm Return & Refund</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
