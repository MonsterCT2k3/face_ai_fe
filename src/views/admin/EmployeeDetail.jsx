import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { get_department } from '../../store/Reducers/departmentReducer'
import { get_employee_by_id } from '../../store/Reducers/employeeReducer'

const EmployeeDetail = () => {
  const { employeeId } = useParams()

  const dispatch = useDispatch()
  const { employee } = useSelector((state) => state.employee)

  useEffect(() => {
    dispatch(
      get_department({
        page: '',
        perPage: '',
        searchValue: '',
      })
    )
  }, [dispatch])

  useEffect(() => {
    dispatch(get_employee_by_id(Number(employeeId)))
  }, [employeeId, dispatch])

  const [state, setState] = useState(employee)

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  // useEffect(() => {
  //   setState({
  //     name: employee.name,
  //     username: employee.username,
  //     email: employee.email,
  //     phone: employee.phone,
  //     id_employee: employee.id,
  //     department: employee.department,
  //     address: employee.address,
  //   })
  // }, [employee])

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#d0d2d6] text-xl font-semibold">
            Employee Detail
          </h1>
          <Link
            to="/admin/dashboard/employees"
            className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2"
          >
            All Employee
          </Link>
        </div>
        <div>
          <form>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Name</label>
                <input
                  readOnly
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  value={employee.name}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Employee Name"
                />
              </div>
            </div>

            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="email">Email</label>
                <input
                  readOnly
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  value={employee.email}
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label htmlFor="phone">Phone</label>
                <input
                  readOnly
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  value={employee.phone}
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                />
              </div>
            </div>

            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="id">ID Employee</label>
                <input
                  readOnly
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  value={employee.id}
                  type="text"
                  name="id"
                  id="id"
                />
              </div>

              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="department">Department</label>
                <input
                  readOnly
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={employee.department}
                  type="text"
                  id="department"
                />
              </div>
            </div>

            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              {/* <div className="flex flex-col w-full gap-1">
                <label htmlFor="password">Password</label>
                <input disable
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.password}
                  type="text"
                  name="password"
                  id="password"
                  placeholder="password"
                />
              </div> */}

              <div className="flex flex-col w-full gap-1">
                <label htmlFor="address">Address</label>
                <input
                  readOnly
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  value={employee.address}
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Address"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetail
