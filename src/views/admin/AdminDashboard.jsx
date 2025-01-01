import { FaUsers } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_employees } from '../../store/Reducers/employeeReducer'
import { get_attendances } from '../../store/Reducers/attendanceReducer'
import { format } from 'date-fns'
import { get_leaverequests } from '../../store/Reducers/leaveRequestReducer'
import ChartAttendance from './Chart'

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const { totalEmployee } = useSelector((state) => state.employee)
  const { attendances, summary_late, summary_absent, summary_worked } =
    useSelector((state) => state.attendance)

  const { leaverequests } = useSelector((state) => state.leaverequest)
  const [recentPendingRequests, setRecentPendingRequests] = useState([])
  useEffect(() => {
    dispatch(get_leaverequests())
  }, [])

  useEffect(() => {
    // Lọc ra các yêu cầu nghỉ phép có status là "pending"
    const pendingRequests = leaverequests.filter(
      (request) => request.status === 'pending'
    )

    // Sắp xếp các yêu cầu nghỉ phép theo request_date từ mới nhất đến cũ nhất
    const sortedRequests = pendingRequests.sort(
      (a, b) => new Date(b.request_date) - new Date(a.request_date)
    )

    // Lấy 3 yêu cầu nghỉ phép gần nhất
    setRecentPendingRequests(sortedRequests.slice(0, 3))
  }, [leaverequests])

  useEffect(() => {
    dispatch(
      get_employees({
        parPage: 10,
        page: 1,
        searchValue: '',
      })
    )
  }, [])

  useEffect(() => {
    // Chuyển đổi startDate và endDate sang định dạng yyyy-mm-dd
    const formattedStartDate = format(new Date(), 'yyyy-MM-dd')
    const formattedEndDate = format(new Date(), 'yyyy-MM-dd')

    dispatch(
      get_attendances({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      })
    )
  }, [dispatch])

  const filteredRequests = leaverequests
    .filter((request) => request.status === 'Pending') // Filter requests by status 'pending'
    .sort((a, b) => new Date(b.request_date) - new Date(a.request_date)) // Sort by most recent request_date
    .slice(0, 3) // Get the top 3 most recent requests

  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="flex justify-between items-center p-5 bg-[#fae8e8] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-3xl font-bold">{totalEmployee}</h2>
            <span className="text-md font-medium">Total Employee</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-full bg-[#fa0305] flex justify-center items-center text-xl">
            <FaUsers className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#fde2ff] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-3xl font-bold">{summary_worked}</h2>
            <span className="text-md font-medium">Worked</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-full bg-[#760077] flex justify-center items-center text-xl">
            <FaUsers className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#e9feea] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-3xl font-bold">
              {summary_absent}
            </h2>
            <span className="text-md font-medium">Absent</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-full bg-[#038000] flex justify-center items-center text-xl">
            <FaUsers className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#ecebff] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-3xl font-bold">{summary_late}</h2>
            <span className="text-md font-medium">Late</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-full bg-[#0200f8] flex justify-center items-center text-xl">
            <FaUsers className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-wrap mt-7">
        <ChartAttendance />

        {/* <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
          <div className="w-full bg-[#6a5fdf] p-4 rounded-md text-[#d0d2d6]">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg text-[#d0d2d6] pb-3">
                Recent Leave Request
              </h2>
              <Link
                to="/admin/dashboard/employee-request"
                className="font-semibold text-sm text-[#d0d2d6]"
              >
                View All
              </Link>
            </div>
            <div className="flex flex-col gap-2 pt-6 text-[#d0d2d6]">
              <ol className="relative border-1 border-slate-600 ml-4">
                {filteredRequests.map((request, i) => {
                  return (
                    <li key={i} className="mb-3 ml-6">
                      <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4c7fe2] rounded-full z-10">
                        <img
                          className="w-full rounded-full h-full shadow-lg"
                          src="http://localhost:3000/images/admin.jpg"
                          alt=""
                        />
                      </div>
                      <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <Link className="text-md font-normal">
                            {request.id_employee}
                          </Link>
                          <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                            {format(
                              new Date(request.request_date),
                              'dd/MM/yyyy'
                            )}
                          </time>
                        </div>
                        <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                          {request.request_type}
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
        </div> */}
      </div>

      
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md mt-6">
        <div className="flex justify-between items-center">
          <h2 className=" font-semibold text-lg text-[#d0d2d6] pb-3 ">
            Attandance Today
          </h2>
          <div className="flex justify-end items-center">
            {/* <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1 relative">
                <input
                  readOnly
                  onClick={() => setTimeShow(!timeShow)}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  // onChange={inputHandle}
                  value={time}
                  type="text"
                  id="time"
                  placeholder="--select Time--"
                />

                <div
                  className={`absolute z-50 top-[101%] bg-[#475569] w-full transition-all ${
                    timeShow ? 'scale-100' : 'scale-0'
                  } `}
                >
                  <div className="flex justify-start items-start flex-col h-[200px] overflow-x-scrool">
                    {times.map((c, i) => (
                      <span
                        key={i}
                        className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                          time === c.name && 'bg-indigo-500'
                        }`}
                        onClick={() => {
                          setTimeShow(false)
                          setTime(c.name)

                          setAllTime(times)
                        }}
                      >
                        {c.name}{' '}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full gap-1 relative">
                <input
                  readOnly
                  onClick={() => setStatusShow(!statusShow)}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  // onChange={inputHandle}
                  value={status}
                  type="text"
                  id="status"
                  placeholder="--select status--"
                />

                <div
                  className={`absolute z-50 top-[101%] bg-[#475569] w-full transition-all ${
                    statusShow ? 'scale-100' : 'scale-0'
                  } `}
                >
                  <div className="flex justify-start items-start flex-col h-[200px] overflow-x-scrool">
                    {statusList.map((c, i) => (
                      <span
                        key={i}
                        className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                          status === c.name && 'bg-indigo-500'
                        }`}
                        onClick={() => {
                          setStatusShow(false)
                          setStatus(c.name)

                          setAllStatus(statusList)
                        }}
                      >
                        {c.name}{' '}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div> */}
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
                  ID Employee
                </th>
                <th scope="col" className="py-3 px-4">
                  Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Check In
                </th>
                <th scope="col" className="py-3 px-4">
                  Check Out
                </th>
              </tr>
            </thead>
            <tbody>
              {attendances.map((d, i) => (
                <tr key={i}>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    {d.id_employee}
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    {d.employee_name}
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    {d.time_in}
                  </td>

                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    {d.time_out}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default AdminDashboard
