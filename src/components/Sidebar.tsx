import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    FaBars,
    FaChevronDown,
    FaChevronUp,
    FaTimes,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { NavItem } from "@/types/sidebar.data";


interface SidebarProps {
    navItems: NavItem[];
    type: string;
}

const Sidebar: React.FC<SidebarProps> = ({ navItems, type }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const { unauthorize, user } = useAuth();
    const navigate = useNavigate();

    const closeDrawer = () => {
        if (isOpen) {
            setIsOpen(false);
        }
    };

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };
    const toggleSubmenu = (label: string) => {
        setOpenSubmenu(prev => prev === label ? null : label);
    };

    const handleLogout = () => {
        unauthorize();
        navigate("/");
        setModalOpen(false);
    };

    function capitalize(word: string) {
        if (!word) return ''; // Handle empty strings or null/undefined
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    return (
        <div className=" fixed w-[100vw] z-50">
            {/* Top Navbar */}
            <div className="bg-neutral-700 text-white flex items-center justify-between px-4 pe-8 py-2">
                <div className="flex items-center">
                    <button onClick={toggleDrawer} className="p-2 text-white me-2">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                    {/* <img src="/GlobalFinanceOnly.png" alt="Logo" className="h-12 ml-4" /> */}
                    <div>
                        <h1 className="text-3xl font-bold">Employee Management System</h1>
                        <p className="text-md text-green-500 font-semibold text-right w-full">{capitalize(user?.role as string)}</p>
                    </div>
                </div>
                <Button onClick={() => setModalOpen(true)} className="bg-red-500 hover:bg-red-700">
                    Logout
                </Button>
            </div>

            {/* Sidebar */}
            <nav
                className={`fixed top-0 left-0 bg-neutral-100 text-white h-full w-64 z-50 transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                onMouseLeave={() => { closeDrawer() }}
            >
                <div className="p-4 border-b border-neutral-600 bg-white">
                    <div className="flex justify-between items-center">
                        {/* <img src="/logo.png" alt="Ganpat University" className="h-12" /> */}
                        <h1 className="text-xl font-bold text-neutral-600">Employee Management System</h1>
                        <button onClick={toggleDrawer} className="text-neutral-700">
                            <FaTimes />
                        </button>
                    </div>
                </div>
                <div className="mt-4 bg-neutral-300" >
                    {navItems.map((item) => {
                        if (item.subItems) {
                            return (
                                <div key={item.label} className="relative">
                                    <button
                                        onClick={() => toggleSubmenu(item.label)}
                                        className={`flex items-center px-4 py-2 w-full ${openSubmenu === item.label ? "bg-neutral-400 text-neutral-800" : "bg-neutral-300 text-neutral-800"}`}
                                    >
                                        {item.icon}
                                        <span className="ml-2">{item.label}</span>
                                        <span className="ml-auto">
                                            {openSubmenu === item.label ? <FaChevronUp /> : <FaChevronDown />}
                                        </span>
                                    </button>
                                    {openSubmenu === item.label && (
                                        <div className="pl-4">
                                            {item.subItems.map((subItem) => (
                                                <NavLink
                                                    key={subItem.label}
                                                    to={`/${type}` + subItem.link}
                                                    className={({ isActive }) =>
                                                        `flex items-center px-4 rounded-lg py-2 ${isActive
                                                            ? "bg-orange-600 hover:bg-orange-700 text-orange-300"
                                                            : "bg-neutral-300 hover:bg-neutral-400 text-neutral-800"
                                                        }`
                                                    }
                                                    onClick={toggleDrawer}
                                                >
                                                    {subItem.icon}
                                                    <span className="ml-2">{subItem.label}</span>
                                                </NavLink>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <NavLink
                                key={item.label}
                                to={`/${type}` + item.link}
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 ${isActive
                                        ? "bg-orange-600 hover:bg-orange-700 text-white"
                                        : "bg-neutral-300 hover:bg-neutral-400 text-neutral-800"
                                    }`
                                }
                                onClick={() => {
                                    setOpenSubmenu(null);
                                    toggleDrawer();
                                }}
                            >
                                {item.icon}
                                <span className="ml-2">{item.label}</span>
                            </NavLink>
                        );
                    })}
                </div>


            </nav>


            {/* Logout Modal */}
            <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to log out?</DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleLogout}>
                            Logout
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Sidebar;
