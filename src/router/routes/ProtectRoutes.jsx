import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectRoute = ({ route, children }) => {
  const { role, userInfo } = useSelector((state) => state.auth)

  console.log(userInfo)
  if (role === 'admin') {
    return <Suspense fallback={null}>{children}</Suspense>
  } else {
    return <Navigate to="/login" replace />
  }
}

export default ProtectRoute
