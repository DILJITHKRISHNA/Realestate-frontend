import React, { useEffect, useState } from 'react'
import VarletLogo from '../../../assets/Logo/VarletLogo.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { getOwner } from '../../../Api/OwnerApi';
import { FaTelegramPlane } from 'react-icons/fa';


function Header() {
    const userSelector = useSelector((state) => state.owner)
    const OwnerGoogleData = userSelector.OwnerInfo;
    const id = userSelector.OwnerInfo.id
    const [ownerImg, setOwnerImg] = useState('')

    useEffect(() => {
        const fetchOwner = async () => {
            try {
                const res = await getOwner(id);
                console.log(res, " yeshhshhs");
                if (res.data.success) {
                    const data = res.data.OwnerData
                    setOwnerImg(data)
                    console.log(data, "yeeeeeeeeeeeeeee");
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchOwner()
    }, [])

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

                        {userSelector && (
                            <div className="text-white flex items-center text-md font-semibold leading-6 p-3 flex-wrap sm:text-xl gap-6">
                                <a href="/owner" className="flex  group relative ml-0 mr-0 font-bold md:ml-0 md:mr-2 sm:mr-4 transition-color hover:text-yellow-300 transition-transform duration-300 hover:translate-x-1">
                                    Dashboard
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 transform origin-bottom scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                                </a>
                                <a href="/owner/property" className="flex  group relative ml-0 mr-0 font-bold md:ml-0 md:mr-2 sm:mr-4 transition-color hover:text-yellow-300 transition-transform duration-300 hover:translate-x-1">
                                    Property
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 transform origin-bottom scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                                </a>
                                <a href="/owner/chat" className="flex  group relative ml-0 mr-0 font-bold md:ml-0 md:mr-2 sm:mr-4 transition-color hover:text-yellow-300 transition-transform duration-300 hover:translate-x-1">
                                    <FaTelegramPlane />

                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 transform origin-bottom scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                                </a>
                                <a href="/owner/profile" className="flex  group relative ml-0 mr-0 font-bold md:ml-0 md:mr-2 sm:mr-4 transition-color hover:text-yellow-300 transition-transform duration-300 hover:translate-x-1">
                                    <h1 className='flex flex-row gap-2'>
                                        <img src={ownerImg.imageUrls} alt="" className='rounded-full w-6 h-6 mt-1' />
                                        {OwnerGoogleData.username}
                                    </h1>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 transform origin-bottom scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                                </a>
                            </div>
                        )}

                        {!userSelector && (
                            <div className="text-white flex items-center text-md font-semibold leading-6 p-3 flex-wrap sm:text-xl gap-6">
                                <Link to="/owner/login" className='hover:underline text-white hover:text-yellow-100'>Login</Link>
                                <Link to="/owner/signup">
                                    <button className='bg-white h-8 border-collapse text-black rounded-lg'>SignUp</button>
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            </>
        </div>
    )
}

export default Header;

