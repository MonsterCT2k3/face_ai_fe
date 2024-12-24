import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { addYears } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'

const Attendances = () => {
  const [startDate, setStartDate] = (useState < Date) | (null > new Date())
  const [endDate, setEndDate] = (useState < Date) | (null > null)

  return (
    <div>
      <div>
        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div>
        <label>End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={addYears(new Date(), 1)} // Giới hạn trong 1 năm
        />
      </div>
      {startDate && endDate && (
        <p>
          Selected Range: {startDate.toLocaleDateString()} -{' '}
          {endDate.toLocaleDateString()}
        </p>
      )}
    </div>
  )
}

export default Attendances
