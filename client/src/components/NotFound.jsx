import React from 'react'
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <>
        <div className='text-gray-500'>404 Not Found</div>
        <Link to ="/">Back To Home</Link>
    </>
  )
}

export default NotFound