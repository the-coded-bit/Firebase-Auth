import { updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useContext, useState } from 'react'
import { options } from '../../utils/constants';
import { authContext } from '../../utils/contexts/AuthWrapper';
import { auth, storage } from '../../utils/firebase/firebaseConfig';
import '../Login/login.css'

function Signup({ toggleAuthOption }) {

  // name, email, password, confirm password states
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [file, setfile] = useState(null);

  // accessing sigup function through context
  const { signup, setLoading } = useContext(authContext);

  // handle signup button click
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (email !== '' && password !== '' && confirmPassword === password) {
      try {
        const user = await signup(email, confirmPassword);
        console.log('user created', user);
        // upload profile pic
        if (file !== null) {
          try {
            const profileRef = ref(storage, `profilePictures/${user.user.uid}`);
            await uploadBytes(profileRef, file);
          } catch (error) {
            console.log('could not upload profile pic');
          }
        }
        // set name and profile pic url
        setLoading(true);
        const profileUrl = await getDownloadURL(ref(storage, `profilePictures/${user.user.uid}`));
        console.log('profile pic url = ', profileUrl);
         await updateProfile(user.user,{displayName: name, photoURL: profileUrl});
         console.log('ahaha', auth.currentUser);
        

      } catch (error) {
        console.log('could not signup');
      }
    }
    setLoading(false);

  }


  // handle email and password inputs
  const handleEmailPassword = (type, e) => {
    const val = e.target.value;
    switch (type) {
      case options.EMAIL:
        setEmail(val);
        break;

      case options.PASSWORD:
        setPassword(val);
        break;
      case options.NAME:
        setName(val);
        break;
      case options.CONFIRMPASS:
        setConfirmPassword(val);
        break;
      default: 
        break;  
    }
  }
  return (
    <div className='login__form__container'>
      <h1 className="login__heading">Signup</h1>
      <div className='login__fields'>
        <input id='name' name='text' type='name' required={true} spellCheck={false} placeholder='Full name' onChange={(e) => handleEmailPassword(options.NAME, e)} />
        <input id='email-address' name='email' type='email' required={true} spellCheck={false} placeholder='Email address' onChange={(e) => handleEmailPassword(options.EMAIL, e)} />
        <input id='password' name='password' type='password' spellCheck={false} placeholder='Password' onChange={(e) => handleEmailPassword(options.PASSWORD, e)} />
        <input id='confirm-password' name='confirmpassword' type='password' required={true} spellCheck={false} placeholder='Confirm Password' onChange={(e) => handleEmailPassword(options.CONFIRMPASS, e)} />
        <label>
          Upload Image
          <input
            id='inputImage'
            type='file'
            accept='image/*'
            onChange={(e) => {
              setfile(e.target.files[0]);
            }}
          />
        </label>
        <button onClick={(e) => handleSignup(e)}>Sign up</button>



        <span>have an Account? <span className='signup__button' onClick={() => toggleAuthOption()}>Login</span></span>
      </div>
    </div>
  )
}

export default Signup