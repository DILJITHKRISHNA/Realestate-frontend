import React from 'react'

function EditCategory() {
  return (
    <div>
      
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
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-950 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  )
}

export default EditCategory
