import React, { useEffect } from 'react'
import { FaList } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { get_employee_by_id } from '../store/Reducers/employeeReducer'

const Header = ({ showSidebar, setShowSidebar }) => {

  const dispatch = useDispatch()
  const { employee} = useSelector(state => state.employee)

  const id = localStorage.getItem("id")
  // const {id } = useSelector(state => state.auth)
  console.log(id)
  useEffect(() => {
    dispatch(get_employee_by_id(Number(id)))
  }, [dispatch, id])

  console.log(id)

  const handleOpenDoor = async () => {
    console.log("fsdfhsdf")
    try {
      const response = await fetch('http://192.168.0.108/open-door', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }), // Gửi `id` nếu cần
      })

      if (response.ok) {
        const data = await response.json()
        alert('Door opened successfully!')
        console.log(data)
      } else {
        console.error('Failed to open door:', response.statusText)
        alert('Failed to open door.')
      }
    } catch (error) {
      console.error('Error opening door:', error)
      alert('Error occurred while opening the door.')
    }
  }

  return (
    <div className="z-50 fixed top-0 left-0 w-full py-5 px-2 lg:px-7">
      <div className="ml-0 lg:ml-[260px] rounded-md h-[65px] flex justify-between items-center bg-[#b1addf] px-5 transition-all">
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-[35px] flex lg:hidden h-[35px] bg-indigo-500 shadow-lg:hover:shadow-indigo-500/50 justify-center items-center rounded-sm"
        >
          <span>
            <FaList />
          </span>
        </div>
        <div className="hidden md:block">
        <button onClick={handleOpenDoor} className="bg-green-500  hover:shadow-green-500/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2">
                Open Door
              </button>
        </div>

        <div className="flex justify-center items-center gap-8 relative ">
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-3">
              <div className="flex justify-center flex-col text-end">
                <h2 className="text-md font-bold">{employee.name}</h2>
                <span>{employee.role}</span>
              </div>
              <img
                className="w-[45px] h-[45px] rounded-full overflow-hidden"
                src="http://localhost:3000/images/admin.jpg"
                alt="avatar"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
