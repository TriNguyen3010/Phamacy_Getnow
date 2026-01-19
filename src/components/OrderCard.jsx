import React from 'react';
import { Clock, Truck, CheckCircle, AlertCircle, ShoppingBag, ChevronDown } from 'lucide-react';

const StatusBadge = ({ status }) => {
    // Define styles using Tailwind utility classes directly for distinct colors
    const styles = {
        'New': 'bg-blue-100 text-blue-700 border border-blue-200 shadow-sm',
        'Reviewing': 'bg-yellow-100 text-yellow-800 border border-yellow-200 shadow-sm',
        'Pending consultancy': 'bg-yellow-100 text-yellow-800 border border-yellow-200 shadow-sm',
        'Waiting for Payment': 'bg-orange-100 text-orange-800 border border-orange-200 shadow-sm',
        'Awaiting Payment': 'bg-orange-100 text-orange-800 border border-orange-200 shadow-sm',
        'Pending payment': 'bg-orange-100 text-orange-800 border border-orange-200 shadow-sm',
        'Ready to Ship': 'bg-purple-100 text-purple-800 border border-purple-200 shadow-sm',
        'Packing': 'bg-purple-100 text-purple-800 border border-purple-200 shadow-sm',
        'Driver Picking Up': 'bg-cyan-100 text-cyan-800 border border-cyan-200 shadow-sm',
        'Out for Delivery': 'bg-sky-100 text-sky-800 border border-sky-200 shadow-sm',
        'Shipping': 'bg-sky-100 text-sky-800 border border-sky-200 shadow-sm',
        'Completed': 'bg-green-100 text-green-800 border border-green-200 shadow-sm',
        'Complete': 'bg-green-100 text-green-800 border border-green-200 shadow-sm',
        'Cancelled': 'bg-red-100 text-red-800 border border-red-200 shadow-sm',
        'Returned': 'bg-gray-100 text-gray-800 border border-gray-200 shadow-sm'
    };

    const icons = {
        'New': null,
        'Reviewing': Clock,
        'Pending consultancy': Clock,
        'Waiting for Payment': Clock,
        'Awaiting Payment': Clock,
        'Pending payment': Clock,
        'Ready to Ship': CheckCircle,
        'Packing': CheckCircle,
        'Driver Picking Up': Truck,
        'Out for Delivery': Truck,
        'Shipping': Truck,
        'Completed': CheckCircle,
        'Complete': CheckCircle,
        'Cancelled': AlertCircle,
        'Returned': AlertCircle
    };

    const Icon = icons[status] || null;
    const styleClass = styles[status] || 'bg-gray-50 text-gray-600 border border-gray-100';

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${styleClass}`}>
            {Icon && <Icon size={12} />}
            {status}
        </span>
    );
};

export default function OrderCard({ order, onClick }) {
    return (
        <div className="bg-white border rounded-lg p-4 mb-4 shadow-sm hover:shadow transition-shadow">
            {/* Order Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-900">{order.id}</span>
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                        {order.customer}
                    </span>
                    <span className="text-gray-400 text-sm">{order.date}</span>
                    {order.isNew && <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">New</span>}
                </div>
                <div className="flex justify-end">
                    <StatusBadge status={order.status} />
                </div>
            </div>

            {/* Order Content */}
            <div className="flex gap-4">
                <div className="flex-1">
                    {/* Items List */}
                    {/* We simplify to show just one main row format for the prototype to match the image structure */}
                    <div className="grid grid-cols-12 gap-4 text-sm text-gray-600 mb-2">
                        <div className="col-span-4 font-medium text-gray-900">{order.category} <span className="text-gray-400 font-normal ml-1">{order.itemsCount} item(s)</span></div>
                        <div className="col-span-2">Type</div>
                        <div className="col-span-2">Order total</div>
                        <div className="col-span-2">Delivery method</div>
                        <div className="col-span-2 text-right">Action</div>
                    </div>

                    <div className="grid grid-cols-12 gap-4">
                        {/* Items List (Cols 1-8) */}
                        <div className="col-span-8">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="grid grid-cols-8 gap-4 items-start mb-3 last:mb-0">
                                    <div className="col-span-4 flex items-start gap-4">
                                        <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 overflow-hidden border border-gray-100 flex-shrink-0">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                                            ) : (
                                                <ShoppingBag size={24} />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 line-clamp-2 text-base">{item.name}</p>
                                            <p className="text-sm text-gray-500 mt-1">x {item.qty}</p>
                                        </div>
                                    </div>
                                    <div className="col-span-2 text-gray-900">{item.type}</div>
                                    <div className="col-span-2 font-medium text-gray-900">
                                        {item.price && `${item.price} VND`}
                                        {item.isDraft && <span className="text-xs text-gray-400 font-normal block">(draft)</span>}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Delivery Method (Cols 9-10) */}
                        <div className="col-span-2 flex flex-col justify-start">
                            <div className="flex flex-col gap-1">
                                <span className="text-gray-900 font-medium truncate">{order.deliveryMethod}</span>
                                {order.deliveryTime && (
                                    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[10px] px-1.5 py-0.5 rounded w-fit">
                                        <Clock size={10} /> {order.deliveryTime}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Action (Cols 11-12) */}
                        <div className="col-span-2 flex items-start justify-end">
                            <button onClick={onClick} className="text-blue-600 hover:text-blue-800 font-semibold text-sm whitespace-nowrap hover:underline">
                                Check details
                            </button>
                        </div>
                    </div>

                    {order.moreItems && (
                        <button className="text-blue-600 text-sm flex items-center gap-1 hover:underline mt-2">
                            <Plus size={14} /> {order.moreItems} more
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

// Helper icon
function Plus({ size, className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
    )
}
