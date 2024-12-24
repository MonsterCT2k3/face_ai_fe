import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Pagination from '../Pagination'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import {
  delete_employee,
  get_employees,
} from '../../store/Reducers/employeeReducer'
import Search from '../components/Search'

const Sellers = () => {
  const dispatch = useDispatch()
  const { employees, totalEmployee } = useSelector((state) => state.employee)

  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [parPage, setParPage] = useState(5)
  const [show, setShow] = useState(false)

  console.log(employees)

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    }
    dispatch(get_employees(obj))
  }, [searchValue, currentPage, parPage, dispatch])

  const handleDelete = (id) => {
    if (window.confirm('Are you sure to delete employee?')) {
      console.log('delete category id', id)
      dispatch(delete_employee(id))
    }
  }

  return (
    <div className="px-2 lg:px-7 pt-5">
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
                  Username
                </th>
                <th scope="col" className="py-3 px-4">
                  Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Email
                </th>
                <th scope="col" className="py-3 px-4">
                  Gender
                </th>
                <th scope="col" className="py-3 px-4">
                  Phone
                </th>
                <th scope="col" className="py-3 px-4">
                  Department
                </th>
                <th scope="col" className="py-3 px-4">
                  Address
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {employees.map((d, i) => (
                <tr key={i}>
                  <td
                    // scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {i + 1}
                  </td>
                  <td
                    // scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {d.username}
                  </td>
                  <td
                    // scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {d.name}
                  </td>
                  <td
                    // scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {d.email}
                  </td>
                  <td
                    // scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {d.gender}
                  </td>
                  <td
                    // scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {d.phone}
                  </td>

                  <td
                    // scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    abc
                  </td>

                  <td
                    // scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {d.address}
                  </td>

                  <td
                    // scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to={`/admin/dashboard/edit-employee/1`}
                        className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50"
                      >
                        {' '}
                        <FaEdit />{' '}
                      </Link>
                      <Link
                        to={`/admin/dashboard/employee/details/${d.id}`}
                        className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                      >
                        {' '}
                        <FaEye />{' '}
                      </Link>
                      <Link
                        className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50"
                        onClick={() => handleDelete(d.id)}
                      >
                        {' '}
                        <FaTrash />{' '}
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
            totalItem={totalEmployee}
            parPage={parPage}
            showItem={3}
          />
        </div>
      </div>
    </div>
  )
}

export default Sellers
