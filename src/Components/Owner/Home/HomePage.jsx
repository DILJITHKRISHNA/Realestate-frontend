import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { FetchOwnerProperty } from '../../../Api/OwnerApi'
import { Bar } from 'react-chartjs-2';
import BGImage from '../../../assets/images/BackgroundImg.jpg'


function HomePage() {
  const owner = useSelector(state => state.owner.OwnerInfo)
  const [ownerProp, setOwnerProp] = useState("")
  useEffect(() => {
    const getProperty = async () => {
      const res = await FetchOwnerProperty(owner.id)
      const details = res.data.GetData
      const data =
        console.log(res, "Rs in get prop");
      if (res.data.success) {
        setOwnerProp(res.data.GetData);
      }
    }
    getProperty()
  }, [])

  const data1 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Property',
        data: [10, 20, 30, 40, 50, 60, 70],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const data2 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Booked',
        data: [5, 10, 15, 20, 25, 30, 35],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const data3 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Reserved',
        data: [3, 6, 9, 12, 15, 18, 21],
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };


  return (
    <>
      <div className='flex justify-center '>
        <h3 className='absolute font-extrabold flex text-white text-xxl text-2xl mb-20 sm:text-5xl w-[80%] h-[20rem] font-mono justify-center items-center text-center animate-pulse gap-2'>
          <span className='text-white '>CONNECT WITH PEOPLE WHO INTERESTED IN YOUR PROPERTY.</span>
        </h3>
        <img className='2xl:mt-[20%] object-cover w-full lg:h-screen h-[40rem]' src={BGImage} alt="" />
        <div className='absolute  mt-[15rem] flex flex-col'   >
          <a href='/owner/property' className='bg-black text-white py-1 rounded-xl px-4 lg:text-2xl font-semibold transform hover:scale-105 transition-transform'>Visit</a>
        </div>
      </div>
      {/* <div className='mt-10 flex sm:flex-row flex-col justify-around p-2 gap-4 ml-6 lg:ml-2'>
        <div className='w-[30rem] h-[18rem] border-2 border-black bg-white shadow-md shadow-amber-900'>
          <Bar data={data1} options={options} />
        </div>
        <div className='w-[30rem] h-[18rem] border-2 border-black bg-white shadow-md shadow-amber-900'>
          <Bar data={data2} options={options} />
        </div>
        <div className='w-[30rem] h-[18rem] border-2 border-black bg-white shadow-md shadow-amber-900'>
          <Bar data={data3} options={options} />
        </div>
        <ToastContainer />
      </div> */}

      {/* <div className='flex justify-center gap-2 bg-white h-screen text-center relative mt-16'>
          <h1 className='absolute font-extrabold text-lg flex gap-2'><span className='font-medium'>AURORA</span>OWNER HOME</h1>
          <div className='absolute border-2 border-black w-[80%] h-[80%] mt-10' style={{ zIndex: 1 }}>
            <video src="/src/assets/Animations/demo.mp4" autoPlay muted></video>
          </div>
      </div> */}
    </>

  )
}

export default HomePage
