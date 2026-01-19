import React, { useState } from 'react';
import {
    ChevronLeft, Printer, Download, Minus, Plus, RefreshCw,
    MessageSquare, Edit2, Trash2, AlertCircle, ThumbsDown, ThumbsUp, Check, Search
} from 'lucide-react';

const Stepper = () => {
    const steps = [
        { id: 1, label: 'New', status: 'complete' },
        { id: 2, label: 'Review', status: 'active' },
        { id: 3, label: 'Payment', status: 'pending' },
        { id: 4, label: 'Packing', status: 'pending' },
        { id: 5, label: 'Delivering', status: 'pending' },
        { id: 6, label: 'Complete', status: 'pending' },
    ];

    return (
        <div className="flex items-center w-full max-w-lg">
            {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center relative gap-1">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold z-10 
                            ${step.status === 'complete' ? 'bg-green-500 text-white' :
                                step.status === 'active' ? 'bg-green-600 text-white shadow-[0_0_0_4px_rgba(22,163,74,0.2)]' : 'bg-gray-300 text-white'}`}>
                            {step.status === 'complete' ? <Check size={12} strokeWidth={4} /> : step.id}
                        </div>
                        <span className={`text-[10px] absolute -bottom-5 whitespace-nowrap ${step.status === 'active' || step.status === 'complete' ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                            {step.label}
                        </span>
                    </div>
                    {index !== steps.length - 1 && (
                        <div className={`h-[2px] flex-1 mx-2 mb-4 ${step.status === 'complete' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default function OrderDetailPage({ onBack }) {
    const [zoomLevel, setZoomLevel] = useState(100);

    return (
        <div className="flex-1 h-screen bg-[#F9FAFB] flex flex-col overflow-hidden">
            {/* Top Header Section */}
            <div className="bg-white border-b px-6 py-4">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full text-gray-500">
                            <ChevronLeft size={20} />
                        </button>
                        <div>
                            <div className="text-xs text-gray-500 mb-1">Order number</div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-xl font-bold text-gray-900">ORD-1005</h1>
                                <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">Reviewing</span>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">Created on 2026-01-15, 12:51:52 PM</div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <Stepper />
                    </div>
                </div>
            </div>

            {/* Main Content Details */}
            <div className="flex-1 overflow-hidden">
                <div className="h-full flex">

                    {/* Left Column: Document Viewer */}
                    <div className="w-[55%] h-full bg-[#1e1e1e] flex flex-col relative border-r border-gray-200">
                        {/* Image Toolbar Top */}
                        <div className="absolute top-4 right-4 z-10 flex gap-2">
                            <button className="p-2 bg-black/50 text-white rounded hover:bg-black/70"><Printer size={18} /></button>
                            <button className="p-2 bg-black/50 text-white rounded hover:bg-black/70"><Download size={18} /></button>
                        </div>

                        {/* Main Image Area */}
                        <div className="flex-1 overflow-auto flex items-center justify-center p-8 bg-gray-900">
                            {/* Placeholder for the prescription image */}
                            <div className="bg-white w-full max-w-[600px] aspect-[3/4] shadow-2xl relative">
                                {/* Mocking the prescription content loosely just for visual feedback if image missing */}
                                <div className="p-8 text-xs text-gray-800 pointer-events-none select-none">
                                    <h3 className="text-center font-bold text-lg mb-4">PHÒNG KHÁM NỘI TỔNG HỢP</h3>
                                    <div className="border-b-2 border-black mb-4"></div>
                                    <h2 className="text-center text-xl font-bold mb-6">ĐƠN THUỐC</h2>
                                    <p className="mb-2"><strong>Ho ten:</strong> CHÂU BẢO TRÂM   Tuoi: 23</p>
                                    <p className="mb-4"><strong>Chan doan:</strong> Viêm dạ dày, Đau thượng vị</p>
                                    <div className="space-y-4">
                                        <p>1. Omeprazole 20mg ......... 01 hộp</p>
                                        <p>2. Sucralfate 1g ............ 01 hộp</p>
                                        <p>3. Gastropulgite ............ 01 hộp</p>
                                        <p>4. Men tieu hoa ............. 01 hộp</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Toolbar */}
                        <div className="h-14 bg-gray-900 border-t border-gray-700 flex justify-between items-center px-6 text-gray-300">
                            <div className="text-sm font-medium">1 / 1</div>
                            <div className="flex items-center gap-4">
                                <button className="hover:text-white" onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}><Minus size={18} /></button>
                                <span className="w-12 text-center text-sm">{zoomLevel}%</span>
                                <button className="hover:text-white" onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))}><Plus size={18} /></button>
                            </div>
                            <button className="hover:text-white"><RefreshCw size={18} /></button>
                        </div>
                    </div>

                    {/* Right Column: Order Details */}
                    <div className="w-[45%] h-full overflow-y-auto bg-gray-50 p-6">

                        {/* Customer Details */}
                        <div className="bg-white rounded-lg p-5 shadow-sm border mb-4">
                            <h3 className="font-semibold text-gray-900 mb-4">Customer details</h3>
                            <div className="grid grid-cols-2 gap-y-4">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Name</p>
                                    <p className="font-medium text-gray-900">John Smith</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Phone number</p>
                                    <p className="font-medium text-gray-900 flex items-center gap-2">
                                        0912 267 868 <MessageSquare size={14} className="text-blue-500" />
                                    </p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-xs text-gray-500 mb-1">Ship to</p>
                                    <p className="font-medium text-gray-900">54 Đường B4, An Lợi Đông, Thủ Đức, Thành phố Hồ Chí Minh 700000</p>
                                </div>
                            </div>
                        </div>

                        {/* Prescription Items */}
                        <div className="bg-white rounded-lg shadow-sm border mb-4">
                            <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
                                <h3 className="font-semibold text-gray-900">Prescription</h3>
                                <span className="text-xs text-gray-500 flex items-center gap-2">
                                    No. <span className="font-mono font-medium text-gray-900">BN000000002</span>
                                    <MessageSquare size={14} className="text-gray-400" />
                                </span>
                            </div>

                            <div className="p-5">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-xs text-gray-500">Diagnosis</span>
                                    <span className="bg-orange-50 text-orange-800 text-xs px-2 py-0.5 rounded font-medium border border-orange-100">Stomachache</span>
                                </div>

                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-medium text-gray-700">Items: 4</span>
                                        <span className="text-[10px] bg-yellow-100 text-yellow-800 px-2 py-1 rounded border border-yellow-200">
                                            Drafted by AI. Verify carefully.
                                        </span>
                                    </div>
                                    <button className="text-blue-600 text-xs font-medium flex items-center gap-1 hover:underline">
                                        <Plus size={14} /> Add item
                                    </button>
                                </div>

                                {/* Items List */}
                                <div className="space-y-3">
                                    {/* Item 1 */}
                                    <div className="flex gap-3 p-3 bg-yellow-50/50 rounded-lg border border-transparent hover:border-blue-100 transition-colors">
                                        <div className="w-12 h-12 bg-white rounded border flex items-center justify-center p-1">
                                            <div className="w-8 h-8 rounded bg-gray-100"></div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-900">Omeprazole 20mg</h4>
                                                    <p className="text-xs text-gray-500 mt-1">Qty: 1 box</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] text-gray-400">Price</p>
                                                    <p className="text-sm font-medium text-gray-900">128,000₫</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center gap-2 pl-2 border-l border-gray-100 ml-2">
                                            <button className="text-gray-400 hover:text-blue-600"><Edit2 size={12} /></button>
                                            <button className="text-gray-400 hover:text-red-500"><Trash2 size={12} /></button>
                                        </div>
                                    </div>

                                    {/* Item 2 */}
                                    <div className="flex gap-3 p-3 bg-white rounded-lg border border-gray-100">
                                        <div className="w-12 h-12 bg-white rounded border flex items-center justify-center p-1">
                                            <div className="w-8 h-8 rounded bg-orange-100"></div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-900">Sucralfate 1g</h4>
                                                    <p className="text-xs text-gray-500 mt-1">Qty: 1 box</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] text-gray-400">Price</p>
                                                    <p className="text-sm font-medium text-gray-900">150,000₫</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center gap-2 pl-2 border-l border-gray-100 ml-2">
                                            <button className="text-gray-400 hover:text-blue-600"><Edit2 size={12} /></button>
                                            <button className="text-gray-400 hover:text-red-500"><Trash2 size={12} /></button>
                                        </div>
                                    </div>

                                    {/* Item 3 */}
                                    <div className="flex gap-3 p-3 bg-white rounded-lg border border-gray-100">
                                        <div className="w-12 h-12 bg-white rounded border flex items-center justify-center p-1">
                                            <div className="w-8 h-8 rounded bg-yellow-100"></div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-900">Gastropulgite</h4>
                                                    <p className="text-xs text-gray-500 mt-1">Qty: 1 box</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] text-gray-400">Price</p>
                                                    <p className="text-sm font-medium text-gray-900">124,800₫</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center gap-2 pl-2 border-l border-gray-100 ml-2">
                                            <button className="text-gray-400 hover:text-blue-600"><Edit2 size={12} /></button>
                                            <button className="text-gray-400 hover:text-red-500"><Trash2 size={12} /></button>
                                        </div>
                                    </div>

                                    {/* Item 4 - AI Suggestion Box */}
                                    <div className="bg-red-50 rounded-lg p-3 border border-red-100 relative">
                                        <div className="flex gap-3 mb-3">
                                            <div className="w-12 h-12 bg-white rounded border flex items-center justify-center p-1">
                                                <div className="w-8 h-8 rounded bg-blue-100 text-[10px] flex items-center justify-center text-blue-500">Img</div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-900">Probiotics</h4>
                                                        <p className="text-xs text-gray-500 mt-1">Qty: 1 box</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-[10px] text-gray-400">Price</p>
                                                        <p className="text-sm font-medium text-gray-900 line-through text-gray-400">381,000₫</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-center gap-2 pl-2 border-l border-red-200 ml-2">
                                                <button className="text-gray-400 hover:text-blue-600"><Edit2 size={12} /></button>
                                                <button className="text-gray-400 hover:text-red-500"><Trash2 size={12} /></button>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded border border-gray-200 p-3 text-xs">
                                            <div className="flex gap-2 items-start text-gray-800 mb-2">
                                                <AlertCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                                                <div>
                                                    <span className="font-semibold block">This item cannot be fulfilled due to insufficient stock.</span>
                                                    <div className="mt-1">
                                                        Change to: <span className="font-bold">Blackmores Probiotics?</span>
                                                    </div>
                                                    <div className="mt-1 text-gray-500">
                                                        Price gap: <span className="font-bold text-gray-900">+8,000</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 justify-end mt-2">
                                                <button className="flex items-center gap-1 px-3 py-1.5 rounded border border-red-200 text-red-600 bg-white hover:bg-red-50 font-medium">
                                                    <ThumbsDown size={12} /> Disagree
                                                </button>
                                                <button className="flex items-center gap-1 px-3 py-1.5 rounded border border-green-200 text-green-600 bg-white hover:bg-green-50 font-medium">
                                                    <ThumbsUp size={12} /> Agree
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Shipping Method */}
                        <div className="bg-white rounded-lg p-5 shadow-sm border mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-semibold text-gray-900">Shipping method</h3>
                                <button className="text-blue-600 text-xs font-medium flex items-center gap-1 hover:underline">
                                    <Plus size={14} /> Add
                                </button>
                            </div>
                            <div className="text-xs text-gray-400 flex items-center gap-1.5">
                                <AlertCircle size={12} /> Check with customer during consultancy
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-lg p-5 shadow-sm border mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-semibold text-gray-900">Payment method</h3>
                                <button className="text-blue-600 text-xs font-medium flex items-center gap-1 hover:underline">
                                    <Plus size={14} /> Add
                                </button>
                            </div>
                            <div className="text-xs text-gray-400 flex items-center gap-1.5">
                                <AlertCircle size={12} /> Check with customer during consultancy
                            </div>
                        </div>

                        {/* Voucher */}
                        <div className="bg-white rounded-lg p-5 shadow-sm border mb-4 flex justify-between items-center">
                            <h3 className="font-semibold text-gray-900">Voucher</h3>
                            <button className="text-blue-600 text-xs font-medium flex items-center gap-1 hover:underline">
                                <Plus size={14} /> Add
                            </button>
                        </div>

                        {/* Payment Summary */}
                        <div className="bg-white rounded-lg p-5 shadow-sm border mb-20">
                            <h3 className="font-semibold text-gray-900 mb-4">Payment details</h3>
                            <div className="flex justify-between items-center text-sm mb-4">
                                <span className="text-gray-600">Total order</span>
                                <span className="font-medium text-gray-900">783,800₫</span>
                            </div>
                            <div className="pt-4 border-t border-dashed flex justify-between items-end">
                                <span className="font-semibold text-gray-900">Total payment</span>
                                <span className="text-2xl font-bold text-gray-900">783,800₫</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom Bar */}
            <div className="bg-white border-t px-8 py-4 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">I have consulted the customer and carefully checked the order <span className="text-red-500">*</span></span>
                </label>
                <div className="flex gap-3">
                    <button className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50">
                        Decline order
                    </button>
                    <button className="px-6 py-2.5 rounded-lg bg-gray-100 text-gray-400 font-medium cursor-not-allowed">
                        Confirm order
                    </button>
                </div>
            </div>

        </div>
    );
}
