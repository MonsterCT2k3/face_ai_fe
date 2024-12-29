import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectRoute = ({ route, children }) => {
  const { token, role, userInfo } = useSelector((state) => state.auth)

  const accessToken = Cookies.get('access_token') // Lấy token từ cookies

  if (!accessToken && !token) {
    // Nếu không có token trong cookies, chuyển hướng về login
    return <Navigate to="/auth/login" replace />
  } else {
    // Cookies.set('access_token', token, { expires: 7 }) // Set token vào cookies
    return <Suspense fallback={null}>{children}</Suspense>
  }

  // console.log(userInfo)
  // if (route.role === 'admin') {
  //   return <Suspense fallback={null}>{children}</Suspense>
  // } else {
  //   return <Navigate to="/login" replace />
  // }
}

export default ProtectRoute
