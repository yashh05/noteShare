import React from 'react'
import { Link } from 'react-router-dom'
function WrongRoute() {
  return (
    <div>
        OOPS! This  page doesn't exist
        <Link to="/">Back to Home</Link>
    </div>

  )
}

export default WrongRoute