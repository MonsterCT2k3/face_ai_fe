import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { get_department } from '../../store/Reducers/departmentReducer'
import {
  get_employee_by_id,
  messageClear,
  update_employee,
} from '../../store/Reducers/employeeReducer'
import { PropagateLoader } from 'react-spinners'
import { overrideStyle } from '../../utils/utils'
import toast from 'react-hot-toast'

const EditEmployee = () => {
  const { employeeId } = useParams()

  const dispatch = useDispatch()
  const { departments } = useSelector((state) => state.department)
  const { loader, successMessage, errorMessage, employee } = useSelector(
    (state) => state.employee
  )

  // useEffect(() => {
  //   dispatch(
  //     get_department({
  //       page: '',
  //       perPage: '',
  //       searchValue: '',
  //     })
  //   )
  // }, [dispatch])

  useEffect(() => {
    dispatch(get_employee_by_id(employeeId))
  }, [employeeId, dispatch])

  const [state, setState] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    id_employee: '',
    department: '',
    address: '',
    password: '',
  })

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const [departmentShow, setdepartmentShow] = useState(false)
  const [department, setDepartment] = useState('')
  const [alldepartment, setalldepartment] = useState([])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    if (departments.length > 0) {
      setalldepartment(departments)
    }
  }, [departments])

  const departmentSearch = (e) => {
    const value = e.target.value
    setSearchValue(value)
    if (value) {
      let srcValue = alldepartment.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      )
      setalldepartment(srcValue)
    } else {
      setalldepartment(departments)
    }
  }

  useEffect(() => {
    setState({
      name: employee.name,
      username: employee.username,
      email: employee.email,
      phone: employee.phone,
      id_employee: employee.id,
      department: employee.department,
      address: employee.address,
    })
    setDepartment(employee.department)
  }, [employee])

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage)
      dispatch(messageClear())
      setState({
        name: '',
        username: '',
        email: '',
        phone: '',
        id_employee: '',
        department: '',
        address: '',
      })
      setDepartment('')
    }
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  }, [successMessage, errorMessage, dispatch])

  const update = (e) => {
    e.preventDefault()
    const obj = {}
    dispatch(update_employee(obj))
  }

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#d0d2d6] text-xl font-semibold">Edit Product</h1>
          <Link
            to="/admin/dashboard/employees"
            className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2"
          >
            All Employee
          </Link>
        </div>
        <div>
          <form onSubmit={update}>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Name</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.name}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Employee Name"
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label htmlFor="brand">Username</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.username}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                />
              </div>
            </div>

            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="email">Email</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.email}
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label htmlFor="phone">Phone</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.phone}
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
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.id}
                  type="text"
                  name="id"
                  id="id"
                  placeholder="Id Employee"
                />
              </div>

              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="department">Department</label>
                <input
                  readOnly
                  onClick={() => setdepartmentShow(!departmentShow)}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={department}
                  type="text"
                  id="department"
                  placeholder="--select department--"
                />

                <div
                  className={`absolute top-[101%] bg-[#475569] w-full transition-all ${
                    departmentShow ? 'scale-100' : 'scale-0'
                  } `}
                >
                  <div className="w-full px-4 py-2 fixed">
                    <input
                      value={searchValue}
                      onChange={departmentSearch}
                      className="px-3 py-1 w-full focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6] overflow-hidden"
                      type="text"
                      placeholder="search"
                    />
                  </div>
                  <div className="pt-14"></div>
                  <div className="flex justify-start items-start flex-col h-[200px] overflow-x-scrool">
                    {[1, 2, 3, 4].map((c, i) => (
                      <span
                        className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                          department === c.name && 'bg-indigo-500'
                        }`}
                        onClick={() => {
                          setdepartmentShow(false)
                          setDepartment(c.name)
                          setSearchValue('')
                          setalldepartment(departments)
                        }}
                      >
                        {c.name}{' '}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              {/* <div className="flex flex-col w-full gap-1">
                <label htmlFor="password">Password</label>
                <input
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
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.address}
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Address"
                />
              </div>
            </div>

            <div className="flex">
              <button className="bg-red-500  hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2">
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditEmployee
