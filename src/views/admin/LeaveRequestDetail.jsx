import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  messageClear,
  get_leaverequest_by_id,
  update_status_leave_request,
} from '../../store/Reducers/leaveRequestReducer'

const LeaveRequestDetail = () => {
  const dispatch = useDispatch()
  const { leaverequests, successMessage, leaverequest } = useSelector(
    (state) => state.leaverequest
  )

  console.log(leaverequest)
  const { requestId } = useParams()
  const [status, setStatus] = useState('')

  const employee = leaverequests.find(
    (request) => request.id === Number(requestId)
  )

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage)
      dispatch(messageClear())
      setStatus('')
      window.location.reload()
    }
  }, [successMessage, dispatch])

  useEffect(() => {
    dispatch(get_leaverequest_by_id(Number(requestId)))
  }, [requestId, dispatch])

  const changeStatus = (status) => {
    console.log(status, requestId)
    const id = Number(requestId)
    dispatch(update_status_leave_request({ status, id }))
  }

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[20px] font-bold mb-3"> Leave Request </h1>
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        {leaverequest && (
          leaverequest.map((leaverequest,i) => {
            return (
              <div className="w-full flex flex-wrap text-[#d0d2d6]">
            <div className="w-4/12">
              <div className="px-0 md:px-5 py-2">
                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-[#9e97e9] rounded-md">
                  <div className="flex gap-2 font-bold text-[#000000]">
                    <span>Name : </span>
                    <span>{leaverequest.name} </span>
                  </div>

                  <div className="flex gap-2 font-bold text-[#000000]">
                    <span>Request date : </span>
                    <span>{leaverequest.request_date}</span>
                  </div>

                  <div className="flex gap-2 font-bold text-[#000000]">
                    <span>Start date : </span>
                    <span>{leaverequest.start_date}</span>
                  </div>

                  <div className="flex gap-2 font-bold text-[#000000]">
                    <span>End date : </span>
                    <span>{leaverequest.end_date}</span>
                  </div>
                  <div className="flex gap-2 font-bold text-[#000000]">
                    <span>Status : </span>
                    <span>{leaverequest.status}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-4/12">
              <div className="px-0 md:px-5 py-2">
                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-[#9e97e9] rounded-md">
                  <div className="flex gap-2 font-bold text-[#000000]">
                    <span>Type : </span>
                    <span>{leaverequest.request_type}</span>
                  </div>
                  <div className="flex gap-2 font-bold text-[#000000]">
                    <span>Reason : </span>
                    <span>{leaverequest.reason}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
            )
          })
        )}

        <div className="px-4">
          <div className="flex gap-4 py-3">
            <button
              onClick={() => changeStatus('reject')}
              className="bg-red-500 w-[170px] hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2"
            >
              Reject
            </button>
            <button
              onClick={() => changeStatus('approve')}
              // onClick={() =>
              //   update_status_leave_request('approve', Number(requestId))
              // }
              className="bg-green-500 w-[170px] hover:shadow-green-500/40 hover:shadow-md text-white rounded-md px-7 py-2"
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaveRequestDetail
