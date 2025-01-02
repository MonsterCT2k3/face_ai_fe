import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { addYears, format } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import { get_attendances } from '../../store/Reducers/attendanceReducer'

const Attendances = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  console.log(startDate, endDate)

  const dispatch = useDispatch()
  const { attendances } = useSelector((state) => state.attendance)
  console.log(attendances)

  useEffect(() => {
    // Chuyển đổi startDate và endDate sang định dạng yyyy-mm-dd
    const formattedStartDate = format(startDate, 'yyyy-MM-dd')
    const formattedEndDate = endDate ? format(endDate, 'yyyy-MM-dd') : null

    dispatch(
      get_attendances({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      })
    )
  }, [dispatch, startDate, endDate])

  return (
    <div className="px-2 md:px-7 py-5">
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
                  ID Employee
                </th>
                <th scope="col" className="py-3 px-4">
                  Employee Name
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
              {attendances.map((d, i) => (
                <tr key={i}>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    {i + 1}
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    {d.id_employee}
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    {d.employee_name}
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    {d.date}
                  </td>

                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    {d.time_in}
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
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

export default Attendances
