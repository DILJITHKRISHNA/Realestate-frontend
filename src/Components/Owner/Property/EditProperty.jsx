import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { FaTimes } from 'react-icons/fa'
import { FetchCategory, PropertyEdit } from '../../../Api/OwnerApi';

function EditProperty({ Data, propertyId }) {

    const [open, setOpen] = useState(false);
    const [previewVideo, setPreviewVideo] = useState('')
    const [previewSource, setPreviewSource] = useState('')
    const [image, setImage] = useState([])
    const [category, setCategory] = useState([])

    const handleOpen = () => setOpen(!open);


    console.log(Data.imageUrls, "miffjjf");
    const [details, SetDetails] = useState({
        title: Data ? Data.name : "",
        type: Data ? Data.type : "",
        rent: Data ? Data.Rent : "",
        additionalDetails: Data ? Data.details : "",
        bedroom: Data ? Data.bedrooms : "",
        bathroom: Data ? Data.bathrooms : "",
        parking: Data ? Data.parking : "",
        furnished: Data ? Data.furnished : "",
        buildUpArea: Data ? Data.buildUpArea : "",
        FloorCount: Data ? Data.FloorCount : "",
        balconies: Data ? Data.balcony : "",
        imageUrl: previewSource || Data.imageUrls,
        videoUrl: Data.videoUrls,
        location: Data ? Data.location : "",
        country: Data ? Data.country : "",
        city: Data ? Data.city : "",
        state: Data ? Data.state : "",
    });


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
            toast("images Added successfully!")
            return uploadedImageUrls;
        } catch (error) {
            console.log("Error during image upload:", error);
        }
    };

    const uploadVideo = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "dev_setups");

            const cloudinaryResponse = await fetch(
                "https://api.cloudinary.com/v1_1/dqewi7vjr/video/upload",
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

    const handleCombinedSubmit = (e) => {
        e.preventDefault();

        handleSubmit(e);
        handleUploadImage(e);
        handleUploadVideo(e)

    }
    const handleImageDeselect = (index) => {
        const updatedPreviewSource = [...previewSource];
        updatedPreviewSource.splice(index, 1);

        setPreviewSource(updatedPreviewSource);

        SetDetails(prevState => ({
            ...prevState,
            imageUrl: updatedPreviewSource.length > 0 ? updatedPreviewSource : Data ? Data.imageUrls : ""
        }));
    };

    const handleFileInputChange = async (e) => {
        const files = e.target.files;

        try {
            const urls = await uploadImage(files);
            setPreviewSource([...previewSource, ...urls]);
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
    console.log(previewSource, "imagess counttt");
    const handleUploadVideo = (e) => {
        console.log("video submitting...");
        e.preventDefault()
        if (!previewVideo) {
            return
        }
        uploadVideo(previewVideo)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value, "pppppppppppppppp");
        SetDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const data = {
                ...details,
                imageUrl: previewSource.length > 0 ? previewSource : Data.imageUrls
            }
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
                !details.imageUrl ||
                !details.videoUrl ||
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
                window.location.reload()
                const res = await PropertyEdit(data, propertyId);
                if (res.data.success) {
                    toast.success("Property Edited Successfully")
                    setTimeout(() => {
                        setOpen(!open)
                    }, 1000);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const getCat = async () => {
            try {
                const res = await FetchCategory()
                if (res.data.success) {
                    setCategory(res.data.categoryList);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getCat()
    }, [])

    const handlePropertyTypeChange = (event) => {
        setPropertyType(event.target.value);
    };

    return (
        <>
            <button
                onClick={handleOpen}
                className="ml-96 bg-lime-400 h-8 mt-2 px-6 font-semibold text-white hover:bg-white hover:border-2 hover:border-lime-400 hover:text-lime-400 rounded-md"
            >
                Edit
            </button>
            {open && Object.keys(details).map((data) => (
                <form onSubmit={handleCombinedSubmit}>
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div
                                className="fixed inset-0 transition-opacity"
                                aria-hidden="true"
                            >
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>

                            <span
                                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                                aria-hidden="true"
                            >
                                &#8203;
                            </span>

                            <div
                                className="inline-block align-bottom bg-white rounded-lg 
                            text-left overflow-hidden shadow-xl transform transition-all 
                            sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full"
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="modal-headline"
                            >

                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="mt-2 " key={data}>
                                        <h1 className="text-2xl font-bold mb-6">Edit Property</h1>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">Property Name</label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={details['title']}
                                                    onChange={handleChange}
                                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700">Property Type</label>
                                                    <input
                                                        type="text"
                                                        name="type"
                                                        value={details['type']}
                                                        onChange={handleChange}
                                                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">Expected Rent</label>
                                                <input
                                                    type="text"
                                                    name="rent"
                                                    value={details['rent']}
                                                    onChange={handleChange}
                                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">Property Details</label>
                                                <input
                                                    type="text"
                                                    name='additionalDetails'
                                                    value={details['additionalDetails']}
                                                    onChange={handleChange}
                                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">Built Up Area</label>
                                                <input
                                                    type="text"
                                                    name='buildUpArea'
                                                    value={details['buildUpArea']}
                                                    onChange={handleChange}
                                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                                />
                                            </div>
                                            <div className='flex lg:flex-row xs:flex-wrap w-6 h-auto mb-2 gap-3 items-center'>
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700">Bedroom</label>
                                                    <input
                                                        type="text"
                                                        name="bedroom"
                                                        value={details['bedroom']}
                                                        onChange={handleChange}
                                                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700">Bathroom</label>
                                                    <input
                                                        type="text"
                                                        name="bathroom"
                                                        value={details['bathroom']}
                                                        onChange={handleChange}
                                                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700">State</label>
                                                    <input
                                                        type="text"
                                                        name="state"
                                                        value={details['state']}
                                                        onChange={handleChange}
                                                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700">Balcony</label>
                                                    <input
                                                        type="text"
                                                        name="balconies"
                                                        value={details['balconies']}
                                                        onChange={handleChange}
                                                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                                    />
                                                </div>
                                                <label className='mt-1'>Parking</label>
                                                <input
                                                    type="checkbox"
                                                    name="parking"
                                                    value={details['parking']}
                                                    onChange={handleChange}
                                                    className="mt-2 border rounded-md w-full focus:outline-none focus:border-blue-500 "
                                                />
                                                <label className='mt-1'>Furnished</label>
                                                <input
                                                    type="checkbox"
                                                    name="furnished"
                                                    value={details['furnished']}
                                                    onChange={handleChange}
                                                    className="mt-2 border rounded-md w-full focus:outline-none focus:border-blue-500 "
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">No. Of Floors</label>
                                                <input
                                                    type="text"
                                                    name="FloorCount"
                                                    value={details['FloorCount']}
                                                    onChange={handleChange}
                                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">Location/street</label>
                                                <input
                                                    type="text"
                                                    name="location"
                                                    value={details['location']}
                                                    onChange={handleChange}
                                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">Country</label>
                                                <input
                                                    type="text"
                                                    name="country"
                                                    value={details['country']}
                                                    onChange={handleChange}
                                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                                />
                                            </div>
                                            <div className="mb-4 flex flex-col">
                                                <label className="block text-sm font-medium text-gray-700">Property Image</label>
                                                <div className='flex flex-row gap-x-2.5'>
                                                    <input
                                                        type="file"
                                                        name="imageUrls"
                                                        multiple
                                                        onChange={handleFileInputChange}
                                                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                                    />
                                                    {previewSource.length > 0 ? (
                                                        previewSource.map((url, index) => (
                                                            <div key={index} className='flex flex-row items-center'>
                                                                <img
                                                                    src={url}
                                                                    alt={`chosen-${index}`}
                                                                    className='h-[50px] w-[50px] rounded-full mx-2'
                                                                />
                                                                <FaTimes
                                                                    className='absolute ml-10 mb-6 text-xl text-red-700 cursor-pointer'
                                                                    onClick={() => handleImageDeselect(index)}
                                                                />
                                                            </div>
                                                        ))
                                                    ) : (
                                                        Data.imageUrls.map((url, index) => (
                                                            <div key={index} className='flex flex-row items-center'>
                                                                <img
                                                                    src={url}
                                                                    alt={`chosen-${index}`}
                                                                    className='h-[50px] w-[50px] rounded-full mx-2'
                                                                />
                                                            </div>
                                                        ))
                                                    )}


                                                </div>
                                                <label className="block text-sm font-medium text-gray-700">Property Video</label>
                                                <div className='flex flex-row gap-x-2.5'>
                                                    <input
                                                        type="file"
                                                        name="imageUrls"
                                                        onChange={handleVideoInputChange}
                                                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">City</label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={details['city']}
                                                    onChange={handleChange}
                                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                                />
                                            </div>

                                            <div className="mt-2 p-4 flex justify-center gap-10">
                                                <div className='flex justify-end gap-10'>
                                                    <button
                                                        type='button'
                                                        onClick={handleOpen}
                                                        className="bg-gradient-to-r border-2 border-lime-400 px-4 py-2 rounded-md text-lime-400"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type='submit'
                                                        onClick={() => handleSubmit(data._id)}
                                                        className="bg-gradient-to-r bg-lime-400 px-4 py-2 rounded-md text-white"
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <ToastContainer />
                    </div>
                </form>
            ))}
        </>
    )
}

export default EditProperty
