import React, { useEffect, useState } from 'react'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [result, setResult] = useState('')


    const handleClick = () => {
        setResult([email, password])
    }

    return (
        <>
            <div className="flex items-center justify-center h-screen bg-black text-white">
                <div className="container mt-32 border-2 border-black p-8 flex flex-col items-center">
                    <h1 className="text-4xl font-bold mb-8 text-center">Login</h1>
                    <input
                        type="text"
                        className="form-control mb-4 p-3 w-1/2 text-black rounded-lg"
                        name="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        className="form-control mb-4 p-3 w-1/2 text-black rounded-lg  "
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button onClick={handleClick} className="bg-black text-white p-3 " type="submit">
                        Log in
                    </button>
                    <p className="text-center mt-4">
                        <strong>Sign up</strong> for a new account
                    </p>
                    {result?<h1 className='text-white'>acc pass and email: {result}</h1>:""}
                </div>
            </div>
        </>
    )
};

export default LoginPage
