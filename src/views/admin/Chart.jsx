import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { get_attendances } from '../../store/Reducers/attendanceReducer'
import { useDispatch, useSelector } from 'react-redux'
import { da } from 'date-fns/locale'

const ChartAttendance = () => {
    const dispatch = useDispatch()
    const [attendanceData, setAttendanceData] = useState({
      worked: [],
      absent: [],
      late: [],
    })

    const [last7Days, setLast7Days] = useState([]) // Lưu trữ danh sách 7 ngày gần nhất

    useEffect(() => {
      const fetchAttendanceData = async () => {
        const today = new Date()
        const worked = []
        const absent = []
        const late = []
        const last7DaysList = [] // Mảng chứa 7 ngày gần nhất

        // Lấy dữ liệu cho 7 ngày gần nhất
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today)
          date.setDate(today.getDate() - i)

          const dateString = `${date.getFullYear()}-${String(
            date.getMonth() + 1
          ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

          const { payload: data } = await dispatch(
            get_attendances({ startDate: dateString, endDate: dateString })
          )

          console.log(data)

          // Thêm dữ liệu cho từng ngày vào các mảng
          worked.push(data.summary.worked)
          absent.push(data.summary.absent)
          late.push(data.summary.late)
          last7DaysList.push(dateString) // Thêm ngày vào mảng last7Days
        }

        setAttendanceData({ worked, absent, late })
        setLast7Days(last7DaysList) // Cập nhật danh sách 7 ngày gần nhất
      }

      fetchAttendanceData()
    }, [dispatch])

    // Biểu đồ sử dụng dữ liệu cho 7 ngày gần nhất
    const state = {
      series: [
        {
          name: 'Worked',
          data: attendanceData.worked, // Dữ liệu "worked" từ attendanceData
        },
        {
          name: 'Absent',
          data: attendanceData.absent, // Dữ liệu "absent" từ attendanceData
        },
        {
          name: 'Late',
          data: attendanceData.late, // Dữ liệu "late" từ attendanceData
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
        stroke: {
          show: true,
          curve: ['smooth', 'straight', 'stepline'],
          lineCap: 'butt',
          colors: '#f0f0f0',
          width: 0.5,
          dashArray: 0,
        },
        xaxis: {
          categories: last7Days, // Sử dụng danh sách 7 ngày gần nhất làm categories
        },
        legend: {
          position: 'top',
        },
        responsive: [
          {
            breakpoint: 565,
            yaxis: {
              categories: last7Days, // Sử dụng danh sách 7 ngày gần nhất làm categories
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


  return (
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
  )
}

export default ChartAttendance
