import React from 'react'
import { NavLink } from 'react-router-dom'


const Forbidden = () => {


  return (
    <div className='wrap'>
      <h2>FORBIDDEN</h2>
      <p>
        Access to this page is Forbidden
      </p>
      <NavLink to='/'>
        <button>
          Return home
        </button>
      </NavLink>
    </div>

  )
}

export default Forbidden
