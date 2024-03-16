import React from 'react'

function PropertyReview({ property }) {
    return (
        <div>
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8">
                <img className="w-full h-56 object-cover object-center" src={property.image} alt={property.title} />
                <div className="p-4">
                    <h2 className="text-gray-800 text-xl font-semibold">{property.title}</h2>
                    <p className="mt-2 text-gray-600">{property.location}</p>
                    <p className="text-gray-700 mt-4">{property.description}</p>
                    <div className="flex items-center mt-4">
                        <span className="text-gray-700">Rating:</span>
                        <div className="ml-2 text-yellow-500">
                            {[...Array(property.rating)].map((_, index) => (
                                <svg key={index} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M9.89 1.89a1 1 0 011.414 0l2.829 2.828a1 1 0 01-1.414 1.414L10 4.828 7.675 7.121a1 1 0 01-1.414-1.414L8.11 1.89a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        d="M1.89 9.89a1 1 0 010-1.414l2.828-2.829a1 1 0 111.414 1.414L4.828 10l2.293 2.325a1 1 0 11-1.414 1.414l-2.829-2.828a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        d="M18.111 9.89a1 1 0 010 1.414l-2.829 2.828a1 1 0 01-1.414-1.414L15.172 10l-2.293-2.325a1 1 0 111.414-1.414l2.829 2.829a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        d="M9.89 18.11a1 1 0 011.414 0l2.829-2.828a1 1 0 111.414 1.414L10 15.172l-2.325 2.293a1 1 0 11-1.414-1.414l2.828-2.829a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ))}
                        </div>
                    </div>
                    <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PropertyReview
