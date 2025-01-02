import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { get_department } from '../../store/Reducers/departmentReducer'
import {
  employee_add,
  messageClear,
} from '../../store/Reducers/employeeReducer'
import toast from 'react-hot-toast'
const AddProduct = () => {
  const dispatch = useDispatch()
  const { successMessage, errorMessage } = useSelector(
    (state) => state.employee
  )

  const departments = [
    { id_department: 1, name: 'Phòng Quản Lý Đào Tạo' },
    { id_department: 2, name: 'Phòng Khảo Thí' },
    { id_department: 3, name: 'Phòng Công Nghệ Thông Tin' },
    { id_department: 4, name: 'Phòng An Toàn Thông Tin' },
    { id_department: 5, name: 'Phòng Điện Tử Viễn Thông' },
  ]

  const roles = [
    
    { id_role: 2, name: 'employee' },
  ]

  const genders = [
    { id: 1, name: 'male' },
    { id: 2, name: 'female' },
  ]

  // useEffect(() => {
  //   dispatch(
  //     get_department({
  //       page: '',
  //       perPage: '',
  //       searchValue: '',
  //     })
  //   )
  // }, [dispatch])

  const [state, setState] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    id_employee: '',
    id_department: '',
    gender: '',
    role: '',
    address: '',
    password: '',
  })

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const addEmployee = (e) => {
    e.preventDefault()
    console.log(state)
    dispatch(employee_add(state))
  }

  const [departmentShow, setdepartmentShow] = useState(false)
  const [department, setdepartment] = useState('')
  const [alldepartment, setAlldepartment] = useState(departments)
  const [searchValue, setSearchValue] = useState('')

  const [roleShow, setRoleShow] = useState(false)
  const [role, setRole] = useState('')
  const [allRole, setAllRole] = useState(roles)

  const [genderShow, setGenderShow] = useState(false)
  const [gender, setGender] = useState('')
  const [allGender, setAllGender] = useState(genders)

  const departmentSearch = (e) => {
    const value = e.target.value
    setSearchValue(value)
    if (value) {
      let srcValue = alldepartment.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      )
      setAlldepartment(srcValue)
    } else {
      setAlldepartment(departments)
    }
  }

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
        id_department: '',
        gender: '',
        role: '',
        address: '',
        password: '',
      })
      setdepartment('')
      setRole('')
      setGender('')
    }
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  }, [successMessage, errorMessage, dispatch])

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#d0d2d6] text-xl font-semibold">Add Employee</h1>
          <div></div>
        </div>
        <div>
          <form onSubmit={addEmployee}>
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
                <label htmlFor="id_employee">ID Employee</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.id_employee}
                  type="text"
                  name="id_employee"
                  id="id_employee"
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
                    {departments.map((c, i) => (
                      <span
                        key={i}
                        className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                          department === c.name && 'bg-indigo-500'
                        }`}
                        onClick={() => {
                          setdepartmentShow(false)
                          setdepartment(c.name)
                          setState({
                            ...state,
                            id_department: c.id_department, // Cập nhật id_department vào state
                          })
                          setSearchValue('')
                          setAlldepartment(departments)
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
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="role">Role</label>
                <input
                  readOnly
                  onClick={() => setRoleShow(!roleShow)}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={role}
                  type="text"
                  id="role"
                  placeholder="--select role--"
                />

                <div
                  className={`absolute top-[101%] z-50 bg-[#475569] w-full transition-all ${
                    roleShow ? 'scale-100' : 'scale-0'
                  } `}
                >
                  <div className="flex  justify-start items-start flex-col h-[200px] overflow-x-scrool">
                    {roles.map((c, i) => (
                      <span
                        key={i}
                        className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                          role === c.name && 'bg-indigo-500'
                        }`}
                        onClick={() => {
                          setRoleShow(false)
                          setRole(c.name)
                          setState({
                            ...state,
                            role: c.name, // Cập nhật id_department vào state
                          })
                          setAllRole(roles)
                        }}
                      >
                        {c.name}{' '}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full gap-1">
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
              </div>
            </div>

            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="gender">Gender</label>
                <input
                  readOnly
                  onClick={() => setGenderShow(!genderShow)}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={gender}
                  type="text"
                  id="gender"
                  placeholder="--select gender--"
                />

                <div
                  className={`absolute top-[101%] bg-[#475569] w-full transition-all ${
                    genderShow ? 'scale-100' : 'scale-0'
                  } `}
                >
                  <div className="flex justify-start items-start flex-col h-[200px] overflow-x-scrool">
                    {genders.map((c, i) => (
                      <span
                        key={i}
                        className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                          gender === c.name && 'bg-indigo-500'
                        }`}
                        onClick={() => {
                          setGenderShow(false)
                          setGender(c.name)
                          setState({
                            ...state,
                            gender: c.name, // Cập nhật id_department vào state
                          })
                          setAllGender(genders)
                        }}
                      >
                        {c.name}{' '}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

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
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddProduct
