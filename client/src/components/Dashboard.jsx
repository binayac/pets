import React from 'react'
import Navbar from './Navbar'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from './Sidebar'
import SignUp from './SignUp'
import AddShelter from './AddShelter'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [message, setMessage] = useState()
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/dashboard')
        .then(res => {
          if(res.data.valid) {
              setMessage(res.data.message)
          } else {
              navigate('/')
          }
        })
        .catch(err => console.log(err))
    })
  return (
    <>
      {/* <Sidebar /> */}
      <AddShelter />
    </>
  )
}

export default Dashboard