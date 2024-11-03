import React from 'react'

const Login = () => {
  return (
    <>
      <div className="App-body">
        <p>Login to access the full dashboard</p>
        <label htmlFor="e-mail">Email: </label>
        <input type="email" name="email" id="e-mail" />

        <label htmlFor="pass-word">Password: </label>
        <input type="password" id="pass-word" />

        <button>OK</button>
      </div>
    </>
  )
}

export default Login;
