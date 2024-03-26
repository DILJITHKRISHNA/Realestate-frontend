import React from 'react'

function MapSkeleton() {
    return (
        <div className="flex relative flex-col items-center h-screen w-screen">
            <div className="absolute left-0 top-0 h-full w-full">
                <div className="p-4 rounded-lg m-4 bg-white shadow-base min-w-[32rem] z-10">
                    <div className="grid grid-cols-3 gap-2 items-center">
                        <div className="animate-pulse">
                            <div className="w-full h-10 bg-gray-200 rounded"></div>
                        </div>
                        <div className="animate-pulse">
                            <div className="w-full h-10 bg-gray-200 rounded"></div>
                        </div>
                        <div className="flex justify-end">
                            <div className="px-4 py-2 bg-gray-200 rounded"></div>
                            <div className="ml-2 px-3 py-2 rounded border border-gray-300 bg-gray-200"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MapSkeleton
