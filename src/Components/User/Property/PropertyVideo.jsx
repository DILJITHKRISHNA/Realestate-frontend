import { Button, Drawer, IconButton, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'

function PropertyVideo({ videoUrl }) {
    const [openTop, setOpenTop] = useState(false);

    const openDrawerTop = () => setOpenTop(true);
    const closeDrawerTop = () => setOpenTop(false);



    return (
        <>
            <div className="flex flex-wrap gap-4 justify-center">
                {!openTop ?
                    <Button className='text-black' onClick={openDrawerTop}>Watch</Button>
                    : ""}
                {openTop ?

                    <section
                        placement="top"
                        open={openTop}
                        onClose={closeDrawerTop}
                        className="p-4"
                    >
                        <div className="flex items-center justify-between">
                            <Typography variant="h5" color="blue-gray">
                                <video src={videoUrl} className='rounded-lg' autoPlay muted/>
                            </Typography>
                            <div className="relative mb-6 flex items-start justify-between">
                                <IconButton
                                    variant="text"
                                    color="blue-gray"
                                    onClick={closeDrawerTop}
                                    className="top-2"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </IconButton>
                            </div>

                        </div>
                    </section>
                    : ""}
            </div>
        </>

    )
}

export default PropertyVideo
