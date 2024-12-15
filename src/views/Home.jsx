import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const { role } = useSelector((state) => state.auth)

  useEffect(() => {
    if (role === 'admin') {
      navigate('/admin/dashboard')
    } else if (role === 'seller') {
      navigate('/seller/dashboard')
    } else {
      navigate('/login')
    }
  }, [role, navigate]) // Chỉ chạy khi role hoặc navigate thay đổi

  return null
}

export default Home
