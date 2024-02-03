import React from 'react'
import VarletLogo from '../../../assets/Logo/VarletLogo.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';


function Header() {
    const userSelector = useSelector((state) => state.owner)
    console.log(userSelector,"userererererer");
    return (
        <div>
            <>
                <div className="app">
                    <nav className="bg-black h-auto flex justify-between items-center shadow-md p-2">
                        <Link to='/owner'>
                            <div className="flex items-center">
                                <img src={VarletLogo} alt="Logo" className="h-12 w-12 animate-pulse" />
                                <span className="ml-2 text-white font-bold animate-pulse">AURORA</span>
                            </div>
                        </Link>
                        <div className="text-white flex items-center text-md font-semibold leading-6 p-3 flex-wrap sm:text-xl gap-6">
                            <Link to="/owner" className='hover:underline text-white hover:text-yellow-100'>Dashboard</Link>
                            <Link to="/owner" className='hover:underline text-white hover:text-yellow-100'>Properties</Link>
                            <Link to="/owner" className='hover:underline text-white hover:text-yellow-100'>Bookings</Link>
                            <Link to="/owner" className='hover:underline text-white hover:text-yellow-100'>Enquiry</Link>
                            {localStorage.getItem("token") ? (
                                <Link to="/owner/profile" className='hover:underline text-white hover:text-yellow-100'>
                                    {userSelector.username}
                                </Link>
                            ) : (
                                <>
                                    <Link to="/owner/login" className='hover:underline text-white hover:text-yellow-100'>Login</Link>
                                    <Link to="/owner/signup">
                                        <button className='bg-white h-8 border-collapse text-black rounded-lg'>SignUp</button>
                                    </Link>
                                </>

                            )}
                        </div>
                    </nav>
                </div>
            </>
        </div>
    )
}

export default Header
