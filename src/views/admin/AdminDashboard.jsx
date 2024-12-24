import { FaUsers } from 'react-icons/fa'
import Chart from 'react-apexcharts'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const AdminDashboard = () => {
  const state = {
    series: [
      {
        name: 'Orders',
        data: [23, 34, 45, 56, 76, 34, 23, 76, 87, 78, 34, 45],
      },
      {
        name: 'Revenue',
        data: [67, 39, 45, 56, 90, 56, 23, 56, 87, 78, 67, 78],
      },
      {
        name: 'Sellers',
        data: [34, 39, 56, 56, 80, 67, 23, 56, 98, 78, 45, 56],
      },
    ],
    options: {
      color: ['#181ee8', '#181ee8'],
      plotOptions: {
        radius: 30,
      },
      chart: {
        background: 'transparent',
        foreColor: '#d0d2d6',
      },
      dataLabels: {
        enabled: false,
      },
      strock: {
        show: true,
        curve: ['smooth', 'straight', 'stepline'],
        lineCap: 'butt',
        colors: '#f0f0f0',
        width: 0.5,
        dashArray: 0,
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apl',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      legend: {
        position: 'top',
      },
      responsive: [
        {
          breakpoint: 565,
          yaxis: {
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apl',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
          },
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            chart: {
              height: '550px',
            },
          },
        },
      ],
    },
  }

  const times = [
    {
      name: 'day',
    },
    {
      name: 'month',
    },
    {
      name: 'year',
    },
  ]

  const statusList = [
    {
      name: 'di lam',
    },
    {
      name: 'di muon',
    },
    {
      name: 'nghi phep',
    },
    {
      name: 'nghi khong phep',
    },
  ]

  const [time, setTime] = useState('')
  const [status, setStatus] = useState('')
  const [timeShow, setTimeShow] = useState(false)
  const [statusShow, setStatusShow] = useState(false)
  const [allTime, setAllTime] = useState(times)
  const [allStatus, setAllStatus] = useState(statusList)

  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        {/* <div className="flex justify-between items-center p-5 bg-[#fae8e8] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-3xl font-bold">$3434</h2>
            <span className="text-md font-medium">Total Salse</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-full bg-[#fa0305] flex justify-center items-center text-xl">
            <FaUsers className="text-[#fae8e8] shadow-lg" />
          </div>
        </div> */}

        <div className="flex justify-between items-center p-5 bg-[#fde2ff] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-3xl font-bold">50</h2>
            <span className="text-md font-medium">Tổng NV</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-full bg-[#760077] flex justify-center items-center text-xl">
            <FaUsers className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#e9feea] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-3xl font-bold">10</h2>
            <span className="text-md font-medium">Đi muộn</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-full bg-[#038000] flex justify-center items-center text-xl">
            <FaUsers className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#ecebff] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-3xl font-bold">54</h2>
            <span className="text-md font-medium">Nghỉ</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-full bg-[#0200f8] flex justify-center items-center text-xl">
            <FaUsers className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-wrap mt-7">
        <div className="w-full lg:w-7/12 lg:pr-3">
          <div className="w-full bg-[#6a5fdf] p-4 rounded-md">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>

        <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
          <div className="w-full bg-[#6a5fdf] p-4 rounded-md text-[#d0d2d6]">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg text-[#d0d2d6] pb-3">
                Recent Seller Message
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
                <li className="mb-3 ml-6">
                  <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4c7fe2] rounded-full z-10">
                    <img
                      className="w-full rounded-full h-full shadow-lg"
                      src="http://localhost:3000/images/admin.jpg"
                      alt=""
                    />
                  </div>
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <Link className="text-md font-normal">Admin</Link>
                      <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                        {' '}
                        2 day ago
                      </time>
                    </div>
                    <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                      How Are you
                    </div>
                  </div>
                </li>
                <li className="mb-3 ml-6">
                  <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4c7fe2] rounded-full z-10">
                    <img
                      className="w-full rounded-full h-full shadow-lg"
                      src="http://localhost:3000/images/admin.jpg"
                      alt=""
                    />
                  </div>
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <Link className="text-md font-normal">Admin</Link>
                      <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                        {' '}
                        2 day ago
                      </time>
                    </div>
                    <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                      How Are you
                    </div>
                  </div>
                </li>
                <li className="mb-3 ml-6">
                  <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4c7fe2] rounded-full z-10">
                    <img
                      className="w-full rounded-full h-full shadow-lg"
                      src="http://localhost:3000/images/admin.jpg"
                      alt=""
                    />
                  </div>
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <Link className="text-md font-normal">Admin</Link>
                      <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                        {' '}
                        2 day ago
                      </time>
                    </div>
                    <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                      How Are you
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-4 bg-[#6a5fdf] rounded-md mt-6">
        <div className="flex justify-between items-center">
          <h2 className=" font-semibold text-lg text-[#d0d2d6] pb-3 ">
            Attandance
          </h2>
          <div className="flex justify-end items-center">
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
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
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  Order Id
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Order Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Active
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((d, i) => (
                <tr key={i}>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    #34344
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    $454
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    Pending
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    Pending
                  </td>

                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    <Link>View</Link>{' '}
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
