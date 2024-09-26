import React, { useState } from 'react';

export const prerender = false;

export const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [flag, setFlag] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const loginRequest = async () => {
            try {
                const response = await fetch('/api/auth.json', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "username": username, "password": password }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setFlag(data.flag);
                } else {
                    setFlag("INCORRECT LOGIN!");
                }
            } catch (error) {
                console.error('Error during login request:', error);
                setFlag("LOGIN ERROR!");
            }
        };

        loginRequest();

        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <div className="flex justify-center  h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col w-72 p-4 bg-transparent shadow-md rounded">
                <h2 className="text-2xl mb-4">Login</h2>
                <label className="mb-2">
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                    />
                </label>
                <label className="mb-2">
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300  rounded mb-4"
                    />
                </label>
                <button type="submit" className="p-2 bg-green-700 text-white rounded hover:bg-blue-600">
                    Login
                </button>
            {flag && <div className="ml-4 text-center pt-5">{flag}</div>}
            </form>
        </div>
    );
};

export default Login;