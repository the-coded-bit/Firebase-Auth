import { updateCurrentUser, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useContext, useEffect, useState } from 'react'
import { options } from '../../utils/constants';
import { authContext } from '../../utils/contexts/AuthWrapper'
import { auth, storage } from '../../utils/firebase/firebaseConfig';
import '../Login/login.css';
import './homepage.css';

function HomePage() {
    // state to display name, email, profile pic
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [profileUrl, setProfileUrl] = useState(null);
    const [file, setfile] = useState(null);

    // state to display loading status
    const [loading, setLoading] = useState(false);

    const { authUser, setUser, logout } = useContext(authContext);

    useEffect(() => {
        console.log(authUser);
        setEmail(authUser.email);
        setName(authUser.displayName);
        setProfileUrl(authUser.photoURL);
    }, [authUser]);


    // handle name and email changes
    const handleNameEmailChanges = (type, e) => {
        e.preventDefault();
        const val = e.target.value;
        switch (type) {
            case options.EMAIL:
                setEmail(val);
                break;

            case options.NAME:
                setName(val);
                break;

             default:
                break;   
        }
    }

    // handle submit button
    const handleSubmit = async () => {
        setLoading(true);
        if (name !== '') {
            await updateProfile(authUser, { displayName: name });
            await updateCurrentUser(auth, authUser);
        }

        if (file !== null) {
            try {
                const profileRef = ref(storage, `profilePictures/${authUser.uid}`);
                await uploadBytes(profileRef, file);
                const profileUrl = await getDownloadURL(ref(storage, `profilePictures/${authUser.uid}`));
                await updateProfile(authUser, { photoURL: profileUrl });

            } catch (error) {
                console.log('could not upload profile pic');
            }
        }
        setUser(auth.currentUser);
        setLoading(false);
    }
    return (
        <div className='login__form__container' style={{ height: 'auto' }}>
            <div className='homepage__container'>
                <img src={profileUrl} className='homepage__image' alt='profile'/>
                <div> <span><h1>Name: </h1> {name}</span> </div>
                <div> <span><h1>Email: </h1> {email}</span> </div>
                <div className='homepage__edit__container'>
                    <input type='text' placeholder='change name' spellCheck={false} onChange={(e) => handleNameEmailChanges(options.NAME, e)} />
                    <label>
                        change profile Pic
                        <input
                            id='inputImage'
                            type='file'
                            accept='image/*'
                            onChange={(e) => {
                                setfile(e.target.files[0]);
                            }}
                        />
                    </label>
                    <button onClick={() => handleSubmit()}>{loading ? <span>Loading....</span> : <span>Submit changes</span>}</button>
                </div>
                <span>all fields are all optional</span>
                <div className='homepage__logout' onClick={() => logout()}> Logout</div>
            </div>

        </div>
    )
}

export default HomePage