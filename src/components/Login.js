// import React from 'react';
import React, { useState } from 'react';
import { Baseurl } from './Baseurl';
import axios from 'axios';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        console.log('Login attempt with:', Baseurl);
        e.preventDefault();

        try {
            axios.post(`${Baseurl}/app_login`, {
                username,
                password
            }).then(response => {
                if (response.data.success) {
                    console.log('Login successful:', response.data.user);
                    alert('Login successful!');
                    // Redirect or perform further actions here
                    document.cookie = `iduser=${response.data.user.id}; path=/;`;
                    window.location.href = '/home';
                }
                else {
                    console.error('Login failed:', response.data.message);
                    alert('Login failed: ' + response.data.message);
                }
            }).catch(error => {
                console.error('Error during login:', error);
                alert('An error occurred during login. Please try again.');
            });


        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login. Please try again.');
        }


    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 mb-2">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 mb-2">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;