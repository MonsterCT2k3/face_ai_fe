import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Pagination from '../Pagination'
import { FaEye } from 'react-icons/fa'
import Search from '../components/Search'
import { useDispatch, useSelector } from 'react-redux'
import { get_leaverequests } from '../../store/Reducers/leaveRequestReducer'
import LeaveRequestDetail from './LeaveRequestDetail'
import { get_employee_by_id } from '../../store/Reducers/employeeReducer'
import { format } from 'date-fns'

const LeaveRequest = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [parPage, setParPage] = useState(5)
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()
  const { leaverequests } = useSelector((state) => state.leaverequest)
  

  console.log(leaverequests)

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    }
    dispatch(get_leaverequests(obj))
  }, [dispatch, currentPage, parPage, searchValue])


  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[20px] font-bold mb-3"> Leave Request </h1>

      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <Search
          setParPage={setParPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>
                <th scope="col" className="py-3 px-4">
                  ID Employee
                </th>
                <th scope="col" className="py-3 px-4">
                  Request date
                </th>
                <th scope="col" className="py-3 px-4">
                  Start date
                </th>
                <th scope="col" className="py-3 px-4">
                  End date
                </th>
                <th scope="col" className="py-3 px-4">
                  Type
                </th>
                <th scope="col" className="py-3 px-4">
                  Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {leaverequests.map((d, i) => (
                <tr className="border-b border-slate-700" key={i}>
                  <td
                    // scope="row"
                    className="py-2 px-4 font-medium whitespace-nowrap"
                  >
                    {i + 1}
                  </td>
                  <td
                    // scope="row"
                    className="py-2 px-4 font-medium whitespace-nowrap"
                  >
                    {d.id_employee}
                  </td>

                  <td
                    // scope="row"
                    className="py-2 px-4 font-medium whitespace-nowrap"
                  >
                    {format(d.request_date, "yyyy-MM-dd")}
                  </td>
                  <td
                    // scope="row"
                    className="py-2 px-4 font-medium whitespace-nowrap"
                  >
                    {d.start_date}
                  </td>
                  <td
                    // scope="row"
                    className="py-2 px-4 font-medium whitespace-nowrap"
                  >
                    {d.end_date}
                  </td>
                  <td
                    // scope="row"
                    className="py-2 px-4 font-medium whitespace-nowrap"
                  >
                    {d.request_type}
                  </td>

                  <td
                    // scope="row"
                    className="py-2 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{d.status}</span>{' '}
                  </td>

                  <td
                    // scope="row"
                    className="py-2 px-4 font-medium whitespace-nowrap"
                  >
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to={`/admin/dashboard/leave-request/details/${d.id}`}
                        className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                      >
                        {' '}
                        <FaEye />{' '}
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full flex justify-end mt-4 bottom-4 right-4">
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={50}
            parPage={parPage}
            showItem={3}
          />
        </div>
      </div>
    </div>
  )
}

export default LeaveRequest
