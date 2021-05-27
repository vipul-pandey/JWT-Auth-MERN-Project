import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const SignIn = (props) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    let history = useHistory();

    const submit_sigin = async (e) => {
        e.preventDefault();
        const res = await fetch('api/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });
        const content = await res.json();
        props.setName(content.name)
        if (res.status === 422) {
            window.alert("Please fill all the details.");
        }
        else if (res.status === 400) {
            window.alert("Invalid credential");
        }
        else {
            window.alert("You Successfully login");
            // window.location.reload(true);
            if (content.type === 'student') {
                history.push("/student");
            } else {
                history.push("/professor");
            }
        }
    }
    return (
        <>
            <div className='main-div'>
                <div className='center-div'>
                    <h1 className='header'>Sign In</h1>
                    <form onSubmit={submit_sigin} className='signinform'>
                        <input type='email' placeholder='Email' name='email' onChange={e => setEmail(e.target.value)} /><br />
                        <input type='password' placeholder='Password' name='password' onChange={e => setPassword(e.target.value)} />
                        <br />

                        <button className='btn' type='submit'> SUBMIT</button>
                        <p className='para'>Don't have an account? <span className='para-a'><Link to='/signup'>Signup</Link></span></p>
                       
                    </form>
                </div>
            </div>
        </>
    )
}
export default SignIn;
