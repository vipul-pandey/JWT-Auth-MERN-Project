import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

const Student = () => {
    const [name, setName] = useState([]);
    const [gender, setGender] = useState();
    const [email, setEmail] = useState();
    const [type, setType] = useState();
    const [phone, setPhone] = useState();
    const [id, setId] = useState();
    useEffect(() => {
        (
            async () => {
                const res = await fetch('api/users', {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                const content = await res.json();
                console.log(content)
                //    console.log(setUsers(res))
                setId(content._id)
                setName(content.name)
                setGender(content.gender)
                setEmail(content.email)
                setType(content.type)
                setPhone(content.phone)
            }
        )('');
    }, []);
    return (
        <>
            <div className="main-div">
                <div className="stu-div">
                    <h1 className='header'>Student Portal</h1>
                    <div className="container ">
                        <div className="row mt-4 stu-por">
                            <div className="col-6 col-md-5 ">
                                <p align='left'>ID NO.</p><br/>
                                <p align='left'>NAME</p><br/>
                                <p align='left'>GENDER</p><br/>
                                <p align='left'>EMAIL</p><br/>
                                <p align='left'>PHONE</p><br/>
                            </div>    

                            <div className="col-6 col-md-7 stu-por-2 ">
                                <p align='left'>{id}</p><br/>
                                <p align='left'>{name}</p><br/>
                                <p align='left'>{gender}</p><br/>
                                <p align='left'>{email}</p><br/>
                                <p align='left'>{phone}</p><br/>
                            </div>
                        </div>
                    </div>
                    <Link to='/' className='btn'>Return home</Link>

                </div>
            </div>
        </>
    )
}
export default Student;
