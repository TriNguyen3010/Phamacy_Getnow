import React from 'react';
import { LayoutGrid, Package, ShoppingCart, FileText, Settings, LogOut, ChevronLeft, Plus } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
    const menuItems = [
        { name: 'Dashboard', icon: LayoutGrid, active: false },
        { name: 'Inventory', icon: Package, active: false },
        { name: 'Orders', icon: ShoppingCart, active: true },
        { name: 'Reports', icon: FileText, active: false },
        { name: 'Settings', icon: Settings, active: false },
    ];

    return (
        <div className="sidebar">
            <div>
                <div className="sidebar-header">
                    <div className="brand">
                        <div className="brand-icon">
                            <Plus size={20} className="text-blue-600" />
                        </div>
                        <span>GETNOW</span>
                    </div>
                    <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9CA3AF' }}>
                        <ChevronLeft size={20} />
                    </button>
                </div>

                <nav>
                    <ul className="nav-list">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <button className={`nav-item ${item.active ? 'active' : ''}`}>
                                    <item.icon size={20} />
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="user-section">
                <div className="user-info">
                    <div className="avatar">
                        <img src="https://ui-avatars.com/api/?name=An+Le&background=random" alt="An Le" />
                    </div>
                    <div className="user-details">
                        <h4>An Le</h4>
                        <span>Pharmacist</span>
                    </div>
                </div>
                <button className="logout-btn">
                    <span>Log out</span>
                    <LogOut size={16} />
                </button>
            </div>
        </div>
    );
}
