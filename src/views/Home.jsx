import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const { role } = useSelector((state) => state.auth)
  console.log(role)

  useEffect(() => {
    if (role === 'admin') {
      navigate('/admin/dashboard')
    } else {
      navigate('/auth/login')
    }
  }, [role, navigate]) // Chỉ chạy khi role hoặc navigate thay đổi

  return null
}

export default Home
