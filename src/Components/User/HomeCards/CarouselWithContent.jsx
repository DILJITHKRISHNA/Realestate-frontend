// import React, { useState, useEffect } from 'react';

// const CarouselWithContent = ({ images, transitionDuration }) => {
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);

//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
//         }, transitionDuration * 1000);

//         return () => clearInterval(intervalId);
//     }, [currentImageIndex, images, transitionDuration]);

//     const translateValue = -currentImageIndex * 100; // Adjust for image width
    
//     return (
//         <div className="relative rounded-xl overflow-hidden">
//             <div
//                 className="flex transition-transform ease-in-out duration-500"
//                 style={{ transform: `translateX(${translateValue}%)` }}
//             >

//                     {
//                         images.map((imageUrl, index) => (
//                             <div key={index } className="h-full w-full">
//                                 <div className="card">
//                                     <img
//                                         src={imageUrl}
//                                         alt={`image ${index + 1}`}
//                                         className="h-full w-full object-cover rounded-xl"
//                                     />
//                                     <div className="card-content">
//                                         {/* Additional content for each card if needed */}
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     }
//             </div>
//         </div>
//     );
// };

// const App = () => {
//     const images = [
//         "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
//         "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
//         "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
//     ];

//     return <CarouselWithContent images={images} transitionDuration={2} />;
// };

// export default App;
