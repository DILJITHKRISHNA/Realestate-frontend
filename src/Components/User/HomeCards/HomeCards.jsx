import React, { useEffect, useState } from 'react';
import { FetchPropertyData } from '../../../Api/UserApi';
import { useNavigate } from 'react-router-dom';

function HomeCards() {
    const [property, setProperty] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        const getPropertyData = async () => {
            try {
                const res = await FetchPropertyData();
                const details = res.data.data.slice(0, 3);
                setProperty(details);
            } catch (error) {
                console.error('Error fetching property data:', error);
            }
        };

        getPropertyData();
    }, []);

    const handleMove = () => {
        navigate('/property')
    }

    return (
        <div>
            <div className="container mx-auto mt-8">
                <p className="text-lg text-gray-600">
                    Discover amazing content and explore the best of our website. Start your journey today.
                </p>
            </div>
            <div onClick={handleMove} className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {property.map((data, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-lg rounded-lg overflow-hidden card transform transition-transform duration-200 hover:scale-105 hover:shadow-md"
                    >
                        {data.imageUrls.length > 0 && (
                            <img
                                src={data.imageUrls[0]}
                                alt={`Featured Content ${index + 1}`}
                                className="w-full h-50 object-cover"
                            />
                        )}
                        <div className="border border-gray-300 p-2">
                            <p className="text-xl font-bold text-gray-800 mb-2">{data.name}</p>
                        </div>
                        <h3 className="ml-2">{data.details}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomeCards;
