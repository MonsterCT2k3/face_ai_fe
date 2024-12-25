import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { get_department } from '../../store/Reducers/departmentReducer'
import { get_employee_by_id } from '../../store/Reducers/employeeReducer'
import DatePicker from 'react-datepicker'
import { addYears, format } from 'date-fns'
import { get_attendance_detail } from '../../store/Reducers/attendanceReducer'

const EmployeeDetail = () => {
  const { employeeId } = useParams()

  const dispatch = useDispatch()
  const { employee } = useSelector((state) => state.employee)

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  console.log(startDate, endDate)

  const { attendance_detail } = useSelector((state) => state.attendance)

  useEffect(() => {
    // Chuyển đổi startDate và endDate sang định dạng yyyy-mm-dd
    const formattedStartDate = format(startDate, 'yyyy-MM-dd')
    const formattedEndDate = endDate ? format(endDate, 'yyyy-MM-dd') : null

    dispatch(
      get_attendance_detail({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        id: Number(employeeId),
      })
    )
  }, [dispatch, startDate, endDate, employeeId])

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
      <div className="py-5">
        <div className="w-full p-4 bg-[#6a5fdf] rounded-md mt-6">
          <div className="flex justify-between items-center">
            <h2 className=" font-semibold text-lg text-[#d0d2d6] pb-3 ">
              Attandance
            </h2>
            <div className="flex justify-end items-center">
              <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
                <div className="border border-slate-700 rounded-md p-2">
                  <label>Start Date: </label>
                  <DatePicker
                    className="rounded-md outline-none"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                  />
                </div>
                <div className="border border-slate-700 rounded-md p-2">
                  <label>End Date: </label>
                  <DatePicker
                    className="rounded-md outline-none "
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    maxDate={addYears(new Date(), 1)} // Giới hạn trong 1 năm
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-[#d0d2d6]">
              <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
                <tr>
                  <th scope="col" className="py-3 px-4">
                    #
                  </th>

                  <th scope="col" className="py-3 px-4">
                    Date
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Time In
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Time Out
                  </th>
                </tr>
              </thead>
              <tbody>
                {attendance_detail
                  ? attendance_detail.map((d, i) => (
                      <tr key={i}>
                        <td className="py-3 px-4 font-medium whitespace-nowrap">
                          {i + 1}
                        </td>

                        <td className="py-3 px-4 font-medium whitespace-nowrap">
                          {d.date}
                        </td>

                        <td className="py-3 px-4 font-medium whitespace-nowrap">
                          {d.time_in}
                        </td>
                        <td className="py-3 px-4 font-medium whitespace-nowrap">
                          {d.time_out}
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetail
