import React, { useEffect, useState } from 'react'
import Header from '../AdminHeader/Header'
import Sidebar from '../AdminSidebar/Sidebar'
import { FetchCategory } from '../../../Api/AdminApi'
import { categoryTypes } from '../../../Api/AdminApi';

function CategoryPage() {
  const [categorys, setCategorys] = useState([])
  const [open, setOpen] = useState(false);
  const [category, SetCategory] = useState({


    category: ""
  })

  const handleClick = (e) => {
    const { name, value } = e.target
    SetCategory({
      ...category,
      [name]: value
    })
  }


  const handleOpen = () => {
    setOpen(!open);
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await categoryTypes(category)
      console.log(res, "response from property pageeeeeeeee");
      if (res.data.success) {
        console.log("got the response");
      } else {
        console.log("error in property page");
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    const handleCategory = async () => {
      try {
        const result = await FetchCategory()
        const categoryData = result.data.categoryData || []
        setCategorys(categoryData)
      } catch (error) {
        console.log(error);
      }
    }
    handleCategory()
  }, [])

  return (

    <div className="flex flex-col w-full">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className='mt-2 overflow-y-hidden rounded-lg pt-10 ml-1 bg-offgreen mx-auto h-auto w-screen sm:px-8 bg-gray-100'>
          <button className='bg-slate-950 rounded-lg text-white font-semibold w-[12%] h-[5%]' onClick={handleOpen}>ADD CATEGORY</button>

          <table className='mt-2 w-full'>
            <thead>
              <tr className='bg-blue-400 text-left text-xs font-semibold uppercase tracking-widest text-black'>
                <th className='px-5 py-3'>Index</th>
                <th className='px-5 py-3'>Category Type</th>
                <th className='px-5 py-3'>Edit</th>
                <th className='px-5 py-3'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(categorys) && categorys.map((category, index) => (
                <tr>
                  <td className='border-gray-200 bg-white px-5 py-5 text-sm'>{index + 1}</td>
                  <td className='border-gray-200 bg-white px-5 py-5 text-sm text-black'>{category.category}</td>
                  <td className='border-gray-200 bg-white px-5 py-5 text-sm'>
                    <button
                      className={`rounded-md px-3 py-1 text-xs font-semibold bg-green-600 text-white `}>
                      Edit
                    </button>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-1 py-5 text-sm">
                    <button
                      className={`rounded-md px-3 py-1 text-xs font-semibold bg-green-600 text-white `}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* modal */}
      <form onSubmit={handleSubmit}>

        <div className={`fixed z-10 inset-0 overflow-y-auto ${open ? 'block' : 'hidden'}`}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
              onClick={handleOpen}
            ></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg font-bold leading-6 text-gray-900 mb-3" name='category'>Add Category</h2>
                  <label className=''>Category</label>
                  <div className="mt-2 flex flex-col  justify-center ">

                    <input type="text" placeholder='Add category' value={category.category}
                      name='category'
                      className='border-[1px] border-black pl-2 rounded-sm h-9 w-[100%]'
                      onChange={handleClick} />

                  </div>
                </div>
              </div>
              <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse flex justify-center">
                <button
                  type="button"
                  onClick={handleOpen}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleOpen}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-950 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>

      </form>

      {/* modal */}
    </div>
  )
}

export default CategoryPage
