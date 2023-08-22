import React from 'react'
import './Login'
const Login = () => {
  return (
    <div className='login'>
      <header>
        Login
      </header>
      <form>
        <input type='text' placeholder='Username' />
        <input type='password' placeholder='Password' />
      </form>
      <button> Submit </button>
    </div>
  )
}

export default Login