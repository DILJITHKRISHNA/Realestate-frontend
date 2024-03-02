import React, { useEffect, useState } from 'react';
import { AddProperty, FetchCategory } from '../../../Api/OwnerApi';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify'


function AddDetails({ SetOpen }) {
    const selector = useSelector((state) => state.owner)
    console.log(selector.OwnerInfo.id, "selectorrrrrr")
    const OwnerId = selector.OwnerInfo.id

    const [previewSource, setPreviewSource] = useState([])
    const [previewVideo, setPreviewVideo] = useState('')
    const [fileInputState, setFileInputState] = useState('')
    const [category, setCategory] = useState([])

    const [details, SetDetails] = useState({
        title: "",
        type: "",
        rent: "",
        additionalDetails: "",
        bedroom: "",
        bathroom: "",
        parking: false,
        furnished: false,
        buildUpArea: "",
        FloorCount: "",
        balconies: "",
        imageUrl: null,
        videoUrl: null,
        location: "",
        country: "",
        city: "",
        state: "",
    });

    const handleClose = () => {
        SetOpen(false);
    }

    const handleClick = (e) => {
        const { name, value } = e.target;
        SetDetails({
            ...details,
            [name]: value
        });

    }

    const uploadVideo = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "dev_setups");

            const cloudinaryResponse = await fetch(
                "https://api.cloudinary.com/v1_1/dqewi7vjr/video/upload",  // Note the change to video/upload endpoint
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!cloudinaryResponse.ok) {
                throw new Error(`Failed to upload video. Status: ${cloudinaryResponse.status}`);
            }

            const cloudinaryData = await cloudinaryResponse.json();
            console.log("Cloudinary response:", cloudinaryData);

            if (cloudinaryData.error) {
                console.log(cloudinaryData.error);
                return;
            }

            const uploadedVideoUrl = cloudinaryData.secure_url;
            console.log(uploadedVideoUrl, "uploadedVideoUrl");
            return uploadedVideoUrl;
        } catch (error) {
            console.log("Error during video upload:", error);
        }
    };

    const uploadImage = async (files) => {
        try {
            const uploadedImageUrls = [];

            for (const file of files) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "dev_setups");

                const cloudinaryResponse = await fetch(
                    "https://api.cloudinary.com/v1_1/dqewi7vjr/image/upload",
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                if (!cloudinaryResponse.ok) {
                    throw new Error(`Failed to upload image. Status: ${cloudinaryResponse.status}`);
                }

                const cloudinaryData = await cloudinaryResponse.json();

                if (cloudinaryData.error) {
                    console.log(cloudinaryData.error);
                    return;
                }

                const uploadedImageUrl = cloudinaryData.secure_url;
                uploadedImageUrls.push(uploadedImageUrl);
            }

            console.log("Uploaded Image URLs:", uploadedImageUrls);
            return uploadedImageUrls;
        } catch (error) {
            console.log("Error during image upload:", error);
        }
    };


    const handleSubmit = async (e) => {
        console.log("handleSubmit add detailssssss");
        e.preventDefault();

        if (
            !details.title ||
            !details.type ||
            !details.rent ||
            !details.additionalDetails ||
            !details.bedroom ||
            !details.bathroom ||
            !details.buildUpArea ||
            !details.FloorCount ||
            !details.location ||
            !details.country ||
            !details.city ||
            !details.balconies
        ) {
            toast.error("Please fill in all required fields.");
            return;
        } else if (
            details.rent <= 0 ||
            details.FloorCount <= 0 ||
            details.bedroom <= 0 ||
            details.bathroom <= 0 ||
            details.balconies <= 0
        ) {
            toast.error("Negative numbers are not allowed!");
        } else {


            try {
                const data = {
                    ...details,
                    imageUrl: previewSource
                }
                const res = await AddProperty(data, OwnerId);
                if (res.data.success) {
                    toast.success("Your property is in the verification process; we appreciate your patience and will notify you upon approval.")
                } else {
                    toast.error("Failed to add property. Please try again.");
                }

            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleCombinedSubmit = (e) => {
        e.preventDefault();

        handleSubmit(e);
        handleUploadImage(e);
        handleUploadVideo(e)
    }

    const handleFileInputChange = async (e) => {
        const files = e.target.files;
        try {
            const urls = await uploadImage(files);
            SetDetails(prevState => ({ ...prevState, imageUrl: urls }));
            setPreviewSource(urls);
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };
    const handleVideoInputChange = async (e) => {
        const file = e.target.files[0];
        const url = await uploadVideo(file);
        SetDetails(prevState => ({ ...prevState, videoUrl: url }));
        setPreviewVideo(url);
        console.log(previewVideo, "video urlll");
    }

    const handleUploadImage = (e) => {
        console.log("image submitting...");
        e.preventDefault()
        if (!previewSource) {
            return
        }
        uploadImage(previewSource)
    }
    const handleUploadVideo = (e) => {
        console.log("video submitting...");
        e.preventDefault()
        if (!previewVideo) {
            return
        }
        uploadVideo(previewVideo)
    }

    useEffect(() => {
        const getCat = async () => {
            try {
                const res = await FetchCategory()
                console.log(res, "reddddddddddddddd");
                if (res.data.success) {
                    setCategory(res.data.categoryList);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getCat()
    }, [])

    return (
        <>
            <form onSubmit={handleCombinedSubmit}>
                <div className="fixed inset-0 backdrop-blur-sm overflow-y-auto flex items-center justify-center">
                    <div className="relative w-[80%] bg-white p-8 max-w-8xl max-h-2xl h-[100%] mx-auto rounded-lg shadow-md shadow-black">
                        <h1 className="text-2xl font-bold mb-6">Add Property</h1>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Property Name</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={details.title}
                                    onChange={handleClick}
                                    placeholder="Enter Property Name"
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Property Type</label>
                                <input
                                    type="text"
                                    name="type"
                                    value={details.type}
                                    onChange={handleClick}
                                    placeholder="Enter Property Type"
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Expected Rent</label>
                                <input
                                    type="text"
                                    name="rent"
                                    value={details.rent}
                                    onChange={handleClick}
                                    placeholder="Expected Rent per month"
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Property Details</label>
                                <input
                                    type="text"
                                    name="additionalDetails"
                                    value={details.additionalDetails}
                                    onChange={handleClick}
                                    placeholder="Enter Property Description"
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Built Up Area</label>
                                <input
                                    type="text"
                                    name="buildUpArea"
                                    value={details.buildUpArea}
                                    onChange={handleClick}
                                    placeholder="Total Square Feet"
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className='flex lg:flex-row xs:flex-wrap w-6 h-auto mb-2 gap-3 items-center'>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Bedroom</label>
                                    <input
                                        type="text"
                                        name="bedroom"
                                        value={details.bedroom}
                                        onChange={handleClick}
                                        placeholder="bed"
                                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Bathroom</label>
                                    <input
                                        type="text"
                                        name="bathroom"
                                        value={details.bathroom}
                                        onChange={handleClick}
                                        placeholder="bathroom"
                                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={details.state}
                                        onChange={handleClick}
                                        placeholder="state"
                                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Balcony</label>
                                    <input
                                        type="text"
                                        name="balconies"
                                        value={details.balconies}
                                        onChange={handleClick}
                                        placeholder="balcony"
                                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <label className='mt-1'>Parking</label>
                                <input
                                    type="checkbox"
                                    name="parking"
                                    value={details.parking ? false : true}
                                    onChange={handleClick}
                                    className="mt-2 border rounded-md w-full focus:outline-none focus:border-blue-500 "
                                />
                                <label className='mt-1'>Furnished</label>
                                <input
                                    type="checkbox"
                                    name="furnished"
                                    value={details.furnished ? false : true}
                                    onChange={handleClick}
                                    className="mt-2 border rounded-md w-full focus:outline-none focus:border-blue-500 "
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">No. Of Floors</label>
                                <input
                                    type="text"
                                    name="FloorCount"
                                    value={details.FloorCount}
                                    onChange={handleClick}
                                    placeholder="No of Floors"
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Location/street</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={details.location}
                                    onChange={handleClick}
                                    placeholder="Exact Location"
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={details.country}
                                    onChange={handleClick}
                                    placeholder="Country"
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4 flex flex-col">
                                <label className="block text-sm font-medium text-gray-700">Property Image</label>
                                <div className='flex flex-row'>
                                    <input
                                        type="file"
                                        name="imageUrls"
                                        value={fileInputState}
                                        onChange={handleFileInputChange}
                                        multiple
                                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                    />
                                    {previewSource.map((url, index) => (
                                        <img
                                            key={index}
                                            src={url}
                                            alt={`chosen-${index}`}
                                            className='h-[50px] w-[50px] rounded-full mx-2'
                                        />
                                    ))}
                                    <div className='flex flex-row'>
                                        <input
                                            type="file"
                                            name="videoUrls"
                                            value={fileInputState}
                                            onChange={handleVideoInputChange}
                                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={details.city}
                                    onChange={handleClick}
                                    placeholder="Enter City"
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="mt-2 p-4 flex justify-center gap-10">
                                <div className='flex justify-end gap-10'>
                                    <button
                                        type='button'
                                        onClick={handleClose}
                                        className="bg-gradient-to-r border-2 border-lime-400 px-4 py-2 rounded-md text-lime-400"
                                    >
                                        Close
                                    </button>
                                    <button
                                        type='submit'
                                        className="bg-gradient-to-r bg-lime-400 px-4 py-2 rounded-md text-white"
                                    >
                                        Add Property
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </form >
        </>
    )
}

export default AddDetails;