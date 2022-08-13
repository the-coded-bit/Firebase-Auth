import React from 'react'
import '../Login/login.css'

function Signup({ toggleAuthOption }) {
  return (
    <div className='login__form__container'>
      <h1 className="login__heading">Signup</h1>
      <div className='login__fields'>
        <input id='name' name='text' type='name' required={true} spellCheck={false} placeholder='Full name' />
        <input id='email-address' name='email' type='email' required={true} spellCheck={false} placeholder='Email address' />
        <input id='password' name='password' type='password' spellCheck={false} placeholder='Password' />
        <input id='confirm-password' name='confirmpassword' type='password' required={true} spellCheck={false} placeholder='Confirm Password' />
        <label>
          Upload Image
          <input
            id='inputImage'
            type='file'
            accept='image/*'
            onChange={(e) => {
              console.log(e.target.files[0]);
            }}
          />
        </label>
        <button>Sign up</button>



        <span>have an Account? <span className='signup__button' onClick={() => toggleAuthOption()}>Login</span></span>
      </div>
    </div>
  )
}

export default Signup