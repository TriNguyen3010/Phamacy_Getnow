import React from 'react';
import { LayoutGrid, Package, ShoppingCart, FileText, Settings, LogOut, ChevronLeft, Plus } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar({ collapsed = false, toggleSidebar }) {
    const menuItems = [
        { name: 'Dashboard', icon: LayoutGrid, active: false },
        { name: 'Inventory', icon: Package, active: false },
        { name: 'Orders', icon: ShoppingCart, active: true },
        { name: 'Reports', icon: FileText, active: false },
        { name: 'Settings', icon: Settings, active: false },
    ];

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div>
                <div className={`sidebar-header ${collapsed ? 'justify-center' : ''}`}>
                    {!collapsed && (
                        <div className="brand">
                            <div className="brand-icon">
                                <Plus size={20} className="text-blue-600" />
                            </div>
                            <span>GETNOW</span>
                        </div>
                    )}
                    {collapsed && (
                        <div className="brand-icon mb-4">
                            <Plus size={20} className="text-blue-600" />
                        </div>
                    )}

                    <button
                        onClick={toggleSidebar}
                        style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9CA3AF' }}
                        className={collapsed ? 'absolute -right-3 top-8 bg-white border border-gray-200 rounded-full p-1 shadow-sm' : ''}
                    >
                        <ChevronLeft size={16} className={`transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`} />
                    </button>

                </div>

                <nav>
                    <ul className="nav-list">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <button className={`nav-item ${item.active ? 'active' : ''} ${collapsed ? 'justify-center px-2' : ''}`} title={collapsed ? item.name : ''}>
                                    <item.icon size={20} />
                                    {!collapsed && item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="user-section">
                <div className={`user-info ${collapsed ? 'justify-center' : ''}`}>
                    <div className="avatar">
                        <img src="https://ui-avatars.com/api/?name=An+Le&background=random" alt="An Le" />
                    </div>
                    {!collapsed && (
                        <div className="user-details">
                            <h4>An Le</h4>
                            <span>Pharmacist</span>
                        </div>
                    )}
                </div>
                <button className={`logout-btn ${collapsed ? 'justify-center' : ''}`}>
                    {!collapsed && <span>Log out</span>}
                    <LogOut size={16} />
                </button>
            </div>
        </div>
    );
}
