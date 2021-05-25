import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState('');
    const [phone, setPhone] = useState('');

    let history = useHistory();
    const submit_signup = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5500/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name, gender, email,password, type, phone
            })
        })
        let data = await res.json();
        console.log(data)

        if (res.status === 422) {
            window.alert("Please fill all the details.");
        }
        else if (res.status === 421) {
            window.alert("Email already exists");
        }
        else {
            history.push("/signin");
            window.alert("You Successfully Register the account");
        }
    }

    return (
        <>
        {/* <Nav/> */}
            <div className='main-div'>
                <div className='center-div'>
                    <h1 className='header'> sign up</h1>
                    <form onSubmit={submit_signup}>


                        <input type='text' placeholder='Name' autoComplete="off" name='name' onChange={e => setName(e.target.value)} /><br />

                        <select onChange={e => setGender(e.target.value)} >
                            <option defaultValue > Select Your Gender</option>
                            <option value='Male' > Male</option>
                            <option value='Female'> Female</option>
                            <option value='Transgender'> Transgender</option>
                        </select><br />

                        <input type='email' placeholder='Email' autoComplete="off" name='email' onChange={e => setEmail(e.target.value)} /><br />

                        <input type='password' placeholder='Password' autoComplete="off" name='password' onChange={e => setPassword(e.target.value)} /><br />

                        <select onChange={e => setType(e.target.value)} >
                            <option defaultValue > Select Your Type</option>
                            <option value='Student' > Student</option>
                            <option value='Professor'> Professor</option>
                        </select><br />

                        <input type='number' placeholder='Phone No' autoComplete="off" name='phone' onChange={e => setPhone(e.target.value)} /><br />

                        <button className='btn' type='submit'> SUBMIT</button>
                        <p className='para'>Have an account? <span className='para-a'><Link to= '/signin'>SignIn</Link></span></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp;
