import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  messageClear,
  update_leaverequest,
  get_leaverequest_by_id,
} from '../../store/Reducers/leaveRequestReducer'

const LeaveRequestDetail = () => {
  const dispatch = useDispatch()
  const { leaverequests, successMessage } = useSelector(
    (state) => state.leaverequest
  )

  console.log(leaverequests)
  const { requestId } = useParams()
  const [status, setStatus] = useState('')

  const employee = leaverequests.find(
    (request) => request.id === Number(requestId)
  )

  console.log(requestId, employee)

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage)
      dispatch(messageClear())
      setStatus('')
    }
  }, [successMessage, dispatch])

  useEffect(() => {
    dispatch(get_leaverequest_by_id(requestId))
  }, [requestId, dispatch])

  const updateStatus = (e) => {
    e.preventDefault()
    const status = e.target[0].value
    dispatch(update_leaverequest({ requestId, status }))
  }

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[20px] font-bold mb-3"> Leave Request </h1>
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        {employee && (
          <div className="w-full flex flex-wrap text-[#d0d2d6]">
            <div className="w-4/12">
              <div className="px-0 md:px-5 py-2">
                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-[#9e97e9] rounded-md">
                  <div className="flex gap-2 font-bold text-[#000000]">
                    <span>Name : </span>
                    <span>Raju Khan </span>
                  </div>

                  <div className="flex gap-2 font-bold text-[#000000]">
                    <span>Request date : </span>
                    <span>{employee.request_day}</span>
                  </div>

                  <div className="flex gap-2 font-bold text-[#000000]">
                    <span>Start date : </span>
                    <span>{employee.start_date}</span>
                  </div>

                  <div className="flex gap-2 font-bold text-[#000000]">
                    <span>End date : </span>
                    <span>{employee.end_date}</span>
                  </div>
                  <div className="flex gap-2 font-bold text-[#000000]">
                    <span>Status : </span>
                    <span>{employee.status}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-4/12">
              <div className="px-0 md:px-5 py-2">
                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-[#9e97e9] rounded-md">
                  <div className="flex gap-2 font-bold text-[#000000]">
                    <span>Type : </span>
                    <span>{employee.request_type}</span>
                  </div>
                  <div className="flex gap-2 font-bold text-[#000000]">
                    <span>Reason : </span>
                    <span>{employee.reason}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div>
          <form onSubmit={updateStatus}>
            <div className="flex gap-4 py-3">
              <select
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                name=""
                id=""
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">--Select Status--</option>
                <option value="seen">Seen</option>
              </select>
              <button className="bg-red-500 w-[170px] hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LeaveRequestDetail
