import React, { useEffect, useState } from 'react'
import Header from '../AdminHeader/Header'
import Sidebar from '../AdminSidebar/Sidebar'
import { FetchCategory } from '../../../Api/AdminApi'
import { categoryTypes } from '../../../Api/AdminApi';
import { ToastContainer, toast } from 'react-toastify';


function CategoryPage() {
  const [categorys, setCategorys] = useState([])
  const [open, setOpen] = useState(false);
  const [managePage, setManagePage] = useState(false)
  const [state, SetState] = useState()

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
    e.preventDefault();

    try {
      const res = await categoryTypes(category);

      if (categoryTypes) {
        console.log("Category added successfully");
        toast.success("Category added successfully");

        // Refetch categories to update the list
        handleOpen()
        setManagePage(true); // Trigger the useEffect to fetch categories
      } else {
        console.log("Error adding category");
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  useEffect(() => {
    setManagePage(false);
    const handleCategory = async () => {
      try {
        const result = await FetchCategory();
        setCategorys(result.data.categoryData || []);

      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    handleCategory();
  }, [managePage]);


  return (

    <div className="flex flex-col w-full">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className='mt-2 overflow-y-hidden rounded-lg pt-10 ml-1 bg-offgreen mx-auto h-auto w-screen sm:px-8 bg-gray-100'>
          <button className='bg-slate-950 rounded-lg text-white font-semibold w-[12%] h-[5%]' onClick={handleOpen}>ADD CATEGORY</button>

          <table className='mt-2 w-full'>
            <thead>
              <tr className='bg-gray-400 text-left text-xs font-semibold uppercase tracking-widest text-black'>
                <th className='px-5 py-3'>Index</th>
                <th className='px-5 py-3'>Category Type</th>
                <th className='px-5 py-3'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(categorys) && categorys.map((category, index) => (
                <tr key={index}>
                  <td className='border-gray-200 bg-white px-5 py-5 text-sm'>{index + 1}</td>
                  <td className='border-gray-200 bg-white px-5 py-5 text-sm text-black'>{category.category}</td>
                  <td className="border-b border-gray-200 bg-white px-1 py-5 text-sm">
                    <button
                      className={`rounded-md px-3 py-1 text-xs font-semibold bg-red-600 text-white `}>
                      Block
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Add category modal */}
      <form {...state=="edit"?onSubmit={handleSubmit}:''}>

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
                  <h2 className="text-lg font-bold leading-6 text-gray-900 mb-3" name='category' >Add Category</h2>
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
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-950 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>

      </form>

      {/* add category modal */}
      <ToastContainer />
    </div>
  )
}

export default CategoryPage
