import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { addYears, format } from 'date-fns';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { get_attendances } from '../../store/Reducers/chartReducer';

ChartJS.register(ArcElement, Tooltip, Legend);

const AttendanceChart = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const dispatch = useDispatch();
  const { summary_late, summary_absent, summary_worked } = useSelector((state) => state.chart);

  useEffect(() => {
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = endDate ? format(endDate, 'yyyy-MM-dd') : null;
    dispatch(get_attendances({
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    }));
  }, [startDate, endDate]);

  const datas = [
    { status: 'Absent', count: summary_absent },
    { status: 'Late', count: summary_late },
    { status: 'On Time', count: summary_worked }
  ];

  const totalAttendance = summary_absent + summary_late + summary_worked;

  const chartData = {
    labels: datas.map((item) => item.status),
    datasets: [
      {
        label: 'Attendance Stats',
        data: datas.map((item) => item.count),
        backgroundColor: ['#FF6347', '#FFEB3B', '#4CAF50'], // Red, Yellow, Green
        borderColor: ['#D32F2F', '#FBC02D', '#388E3C'], // Darker shades
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#d0d2d6',
        },
      },
    },
  };

  return (
    <div className="lg:w-9/12 mx-auto mt-10">
      <div className="w-full p-6 bg-[#f0f0f0] rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out">
        {/* Date Picker Section */}
        <div className="flex gap-6 mb-5 justify-between items-center">
          <div className="flex gap-6 w-full">
            <div className="relative flex-1">
              <label className="block font-medium text-[#333] mb-2">Start Date:</label>
              <DatePicker
                className="w-full p-3 rounded-md shadow-md focus:outline-none"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
              />
            </div>
            <div className="relative flex-1">
              <label className="block font-medium text-[#333] mb-2">End Date:</label>
              <DatePicker
                className="w-full p-3 rounded-md shadow-md focus:outline-none"
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

        {/* Chart and Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div className="w-full p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-[#333] mb-4">Attendance Statistics</h2>
            <div className="relative w-full h-[300px]">
              <Pie data={chartData} options={options} />
            </div>
          </div>

          {/* Attendance Details */}
          <div className="w-full p-6 bg-[#ffffff] rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-[#333] mb-4">Attendance Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-[#FF6347]">Absent: {summary_absent} ({((summary_absent / totalAttendance) * 100).toFixed(2)}%)</p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#FFEB3B]">Late: {summary_late} ({((summary_late / totalAttendance) * 100).toFixed(2)}%)</p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#4CAF50]">On Time: {summary_worked} ({((summary_worked / totalAttendance) * 100).toFixed(2)}%)</p>
              </div>
              <div className="border-t border-[#ddd] pt-4 mt-4 text-center">
                <p className="text-sm text-[#777]">Total Attendance: {totalAttendance}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;
