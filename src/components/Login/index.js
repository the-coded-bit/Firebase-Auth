import React, { useState } from 'react'
import { options } from '../../utils/constants';
import Signup from '../Signup';
import './login.css';

function Login() {

    // state to apply changes when signup button
    const [loginPage, setLoginPage] = useState(true);

    // state to maintain email address entered
    const [email, setEmail] = useState('');
    // state to maintain password entered
    const [password, setPassword] = useState('');

    const toogleAutOption = () => {
        setLoginPage(!loginPage);
    }

    // handle email and password inputs
    const handleEmailPassword = (type, e) =>{
        switch (type) {
            case options.EMAIL:
                setEmail(e.target.value);
                break;
        
            case options.PASSWORD:
                setPassword(e.target.value);
                break;
        }
    }

    // handle log in
    const handleLogin = () =>{
        
    }
    return (
        loginPage ?
            <div className='login__form__container'>
                <div className='login__form__placeholder__container'>
                    <img
                        className="login__logo"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className="login__heading">Log in to your account</h2>
                    <div className='login__fields'>
                        <input id='email-address' name='email' type='email' required={true} spellCheck={false} placeholder='Email address' onChange={(e) => handleEmailPassword(options.EMAIL,e)}/>
                        <input id='password' name='email' type='password' required={true} spellCheck={false} placeholder='Password' onChange={(e) => handleEmailPassword(options.PASSWORD,e)}/>
                        <button>Log In</button>
                        <span>Didn't have an Account? <span className='signup__button' onClick={() => toogleAutOption()}>Signup</span></span>
                    </div>


                </div>

            </div> : <Signup toggleAuthOption={toogleAutOption} />
    )
}

export default Login