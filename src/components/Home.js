import React, { useEffect } from 'react';
// import { Baseurl } from './Baseurl';
// import axios from 'axios';
//
import Menu from './Menu';

function Home() {

    // const [username, setUsername] = useState('');

    useEffect(() => {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        const iduserCookie = cookies.find(cookie => cookie.startsWith('iduser='));
        if (!iduserCookie) {
            window.location.href = '/login';
        }
    }, []);

    return (
        <div className="flex flex-row min-h-screen bg-gray-100">
            <div className="w-64 bg-white shadow-md">
                <Menu />
            </div>
            <div className="flex-1 flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome to the Price Management System</h2>
                    {/* <p className="text-gray-600 text-center">This is a protected page. You must be logged in to view this content.</p> */}
                </div>
            </div>
        </div>
    );
}

export default Home;