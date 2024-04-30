import React, { useEffect } from 'react'
import Main from '../pages/Main'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({Main,signin}) => {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!signin){
      navigate('/');
    }
  },[])

  return (
    <Main/>
  )
}

export default ProtectedRoute