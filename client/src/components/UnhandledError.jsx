import React from 'react'
import { NavLink } from 'react-router-dom'

const UnhandledError = () => {

  return (
    <div className='wrap'>
      <p>
        Something went wrong.
      </p>
      <NavLink to='/'>
        <button>
          Return home
        </button>
      </NavLink>
    </div>
  )
}

export default UnhandledError
