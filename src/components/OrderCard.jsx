import React from 'react';
import {
    Clock,
    Truck,
    CheckCircle,
    AlertCircle,
    ShoppingBag,
    ChevronDown,
    Zap,
    AlertTriangle,
    Info,
    User,
    Printer
} from 'lucide-react';

const StatusBadge = ({ status }) => {
    // Styles matching the screenshot
    const getStyle = () => {
        switch (status) {
            case 'New': // Review needed
            case 'Reviewing':
                return 'bg-[#F3E8FF] text-[#7E22CE] border-[#E9D5FF]'; // Purple
            case 'Ready to pack':
            case 'Packing':
                return 'bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]'; // Green
            case 'Ready to Ship':
                return 'bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]'; // Green
            case 'Waiting for Payment':
            case 'Awaiting payment':
                return 'bg-[#FEF9C3] text-[#854D0E] border-[#FEF08A]'; // Yellow
            case 'Out for Delivery':
            case 'Driver Picking Up':
                return 'bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]'; // Green
            case 'Completed':
            case 'Complete':
                return 'bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]'; // Green
            case 'Cancelled':
                return 'bg-gray-100 text-gray-600 border-gray-200'; // Gray
            default:
                return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    const getLabel = () => {
        switch (status) {
            case 'New': return 'Review needed';
            case 'Reviewing': return 'Review needed';
            case 'Packing': return 'Ready to pack';
            case 'Waiting for Payment': return 'Awaiting payment';
            default: return status;
        }
    };

    const getIcon = () => {
        switch (status) {
            case 'New': return Clock;
            case 'Reviewing': return Clock;
            case 'Waiting for Payment': return Clock;
            case 'Packing': return Printer; // Often implies print label next
            case 'Ready to Ship': return Truck;
            case 'Out for Delivery': return Truck;
            case 'Completed': return CheckCircle;
            case 'Cancelled': return AlertCircle;
            default: return null;
        }
    }

    const Icon = getIcon();

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStyle()}`}>
            {Icon && <Icon size={12} strokeWidth={2.5} />}
            {getLabel()}
        </span>
    );
};

export default function OrderCard({ order, onClick, group, highlighted }) {
    const [expanded, setExpanded] = React.useState(false);
    const item = order.items[0] || {}; // Display first item for summary

    // Delivery Icon
    const DeliveryIcon = order.delivery === 'Instant' ? Zap : Truck;

    // Group Border Styling
    // Group Border Styling
    const getBorderClass = () => {
        let borderClass = 'border-l-4 border-l-transparent';

        switch (group) {
            case 'Needs action': borderClass = 'border-l-4 border-l-red-600'; break;
            case 'Queue': borderClass = 'border-l-4 border-l-yellow-500'; break;
            case 'In transit': borderClass = 'border-l-4 border-l-green-500'; break;
            case 'Archived': borderClass = 'border-l-4 border-l-gray-300'; break;
            default: borderClass = 'border-l-4 border-l-transparent';
        }

        if (highlighted) {
            return `${borderClass} animate-highlight-3`;
        }
        return borderClass;
    };

    // Note styling
    const getNoteStyle = () => {
        if (order.noteType === 'warning') return 'text-[#B45F06] font-medium flex items-center gap-1.5';
        if (order.noteType === 'info') return 'text-gray-600';
        return 'text-gray-500';
    };

    const toggleExpand = (e) => {
        e.stopPropagation();
        setExpanded(!expanded);
    };

    const getHighlightColor = () => {
        switch (group) {
            case 'Needs action': return '220, 38, 38'; // red-600
            case 'Queue': return '234, 179, 8'; // yellow-500
            case 'In transit': return '34, 197, 94'; // green-500
            case 'Archived': return '209, 213, 219'; // gray-300
            default: return '59, 130, 246'; // blue-500 fallback
        }
    };

    return (
        <div
            className={`bg-white border border-t border-r border-b border-gray-200 rounded-lg p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-all cursor-default ${getBorderClass()}`}
            style={highlighted ? { '--highlight-rgb': getHighlightColor() } : {}}
        >
            {/* Top Row: Order Meta & Status */}
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="font-bold text-gray-900 text-base">{order.id}</span>
                    <div className="w-px h-3 bg-gray-300 mx-1"></div>
                    <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                        <User size={14} className="text-gray-400" /> {order.customer.name}
                    </span>
                    <div className="w-px h-3 bg-gray-300 mx-1"></div>
                    <span>{order.date}</span>
                    <span className="text-gray-400 italic">{order.updated}</span>
                </div>
                <StatusBadge status={order.status} />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-[2.5fr_1fr_1fr_1.5fr_1fr] gap-4">

                {/* 1. Product Info */}
                <div>
                    <div className="font-bold text-gray-900 text-sm mb-3">{order.category}</div>

                    <div className="mb-2">
                        <span className="text-xs font-semibold text-gray-500 block mb-1">Prescription</span>
                        <button
                            onClick={toggleExpand}
                            className="text-blue-600 text-xs font-medium flex items-center gap-1 hover:underline focus:outline-none"
                        >
                            {order.itemsCount} item(s)
                            {expanded ? <ChevronDown size={14} className="rotate-180" /> : <ChevronDown size={14} />}
                        </button>
                    </div>

                    <div className="space-y-3 mt-3">
                        {expanded ? (
                            order.items.map((itm, idx) => (
                                <div key={idx} className="flex gap-3 items-start">
                                    <div className="w-10 h-10 bg-gray-50 rounded border border-gray-200 flex items-center justify-center p-0.5 flex-shrink-0">
                                        <img src={itm.image} alt={itm.name} className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="font-medium text-sm text-gray-900">{itm.name}</span>
                                            <span className="text-xs text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">{itm.unit}</span>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-0.5">x {itm.qty}</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            // Collapsed: Show first item only
                            <div className="flex gap-3 items-start">
                                <div className="w-10 h-10 bg-gray-50 rounded border border-gray-200 flex items-center justify-center p-0.5 flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="font-medium text-sm text-gray-900">{item.name}</span>
                                        <span className="text-xs text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">{item.unit}</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-0.5">x {item.qty}</div>
                                </div>
                            </div>
                        )}
                    </div>


                </div>

                {/* 2. Total */}
                <div className="flex items-center h-full">
                    <span className="font-medium text-sm text-gray-900">
                        {order.total} VND
                    </span>
                </div>

                {/* 3. Delivery */}
                <div className="flex items-center h-full">
                    <div className="flex items-center gap-1.5 text-sm text-gray-700">
                        {order.delivery === 'Not defined' ? (
                            <span className="text-gray-500 text-sm">Not defined</span>
                        ) : (
                            <>
                                <DeliveryIcon size={14} className={order.delivery === 'Instant' ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'} />
                                {order.delivery}
                            </>
                        )}
                    </div>
                </div>

                {/* 4. System Notes */}
                <div className="flex items-center h-full px-2">
                    <span className={`text-xs ${getNoteStyle()}`}>
                        {order.noteType === 'warning' && <AlertTriangle size={14} />}
                        {order.note}
                    </span>
                </div>

                <div className="flex flex-col items-end justify-between h-full pt-1 pb-1">
                    <div className="mb-auto">
                        {order.action !== 'Check details' && order.action !== 'Review & Consult' && (
                            <button
                                onClick={(e) => { e.stopPropagation(); onClick(); }}
                                className="bg-[#1D4ED8] text-white text-xs font-semibold px-4 py-2 rounded-md shadow-sm hover:bg-blue-800 transition-colors flex items-center gap-1"
                            >
                                {order.action} <ChevronDown size={12} className="-rotate-90" />
                            </button>
                        )}
                    </div>

                    {order.action === 'Review & Consult' ? (
                        <button
                            onClick={(e) => { e.stopPropagation(); onClick(); }}
                            className="bg-[#1D4ED8] text-white text-xs font-semibold px-4 py-1.5 rounded-md shadow-sm hover:bg-blue-800 transition-colors flex items-center gap-1"
                        >
                            Review & Consult <ChevronDown size={12} className="-rotate-90" />
                        </button>
                    ) : (
                        <button
                            onClick={(e) => { e.stopPropagation(); onClick(); }}
                            className="text-blue-600 bg-white border border-blue-600 hover:bg-blue-50 text-xs font-semibold px-4 py-1.5 rounded-md transition-colors flex items-center gap-1"
                        >
                            Check details <ChevronDown size={14} className="-rotate-90" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
