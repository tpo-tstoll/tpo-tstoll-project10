import React from 'react'
import { NavLink } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='wrap'>
      <h2>Not Found</h2>
      <p id='error'>
        Sorry! We couldn't find the page you're looking for.
      </p>
      <NavLink to='/'>
        <button className='button'>
          Return home
        </button>
      </NavLink>
    </div>
  )
}

export default NotFound
