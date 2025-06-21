import React from "react";
import { Baseurl } from "./Baseurl";
import axios from "axios";

import logo from "../assets/logo.png"; // Adjust the path as necessary

const Menu = () => {
    const handleLogout = () => {
        document.cookie = "iduser=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        window.location.href = "/login";
    };

    return (
        <div className="flex flex-col h-screen w-56 bg-gray-900 text-white py-8 px-4 shadow-lg">
            <div className="mb-8 text-2xl font-bold text-center tracking-wide ">
                <p className="font-kanit font-extralight">
                    <img src={logo} alt="Logo" className="h-16 mx-auto mb-2" />
                    Price Management System
                </p>
            </div>
            <nav className="flex flex-col gap-2">
                <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                    onClick={() => window.location.href = "/home"}
                >
                    <span className="material-icons">List Price</span>
                </button>
                <button
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                    onClick={() => window.location.href = "/inputprice"}
                >
                    <span className="material-icons">Input Price</span>
                </button>
                <button
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition text-red-400"
                    onClick={handleLogout}
                >
                    <span className="material-icons">Logout</span>
                </button>
            </nav>
        </div>
    );
};

export default Menu;