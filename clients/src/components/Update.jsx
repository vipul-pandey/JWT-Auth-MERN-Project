import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

const Update = () => {
    const [inputField, setInputField] = useState('');

    let { id } = useParams();
    const getInputField = () => {
        axios.get(`http://localhost:5500/api/student_list/${id}`)
            .then((res) => { setInputField(res.data) })
            .catch(() => { console.log("error aa rha h") })
    }
    useEffect(() => {
        getInputField();
    }, []);

    const changeValue = (e) => {
        e.preventDefault()
        setInputField(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const postMarks = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:5500/api/student_list/${id}`, inputField)
        .then(() => alert('Marks submitted sucessfully'))
        .catch((error) => console.log(error.message));
    };

    // console.log(inputField)

    return (
        <>
            <div className='main-div'>
                <div className='stu-div'>
                    <h1 className='header'>Marks obtained</h1>
                    <div className='container'>
                        <div className='row update-row'>
                            <div className='col-lg-4 col-md-12 col-sm-12 col-12'>
                                <p>{inputField.name}</p>
                            </div>
                            <div className='col-lg-4 col-md-12 col-sm-12 col-12'>
                                <p>{inputField.email}</p>
                            </div>
                            <div className='col-lg-4 col-md-12 col-sm-12 col-12'>
                                <p>{inputField.phone}</p>
                            </div>
                        </div>
                    </div>
                    <hr></hr>

                    <form className='update-form' onSubmit={postMarks}>
                        <div>
                            <label>Maths</label>
                            <input type='number' placeholder='Out of 100' name='maths' value ={inputField.maths} onChange={changeValue} required />
                        </div>
                        <div>
                            <label>Physics</label>
                            <input type='number' placeholder='Out of 100' name='physics' value={inputField.physics} onChange={changeValue} required />
                        </div>
                        <div>
                            <label>Biology</label>
                            <input type='number' placeholder='Out of 100' name='biology' value={inputField.biology} onChange={changeValue} required />
                        </div>
                        <div>
                            <label>English</label>
                            <input type='number' placeholder='Out of 100' name='english' value={inputField.english} onChange={changeValue} required />
                        </div>
                        <button className='btn' type='submit'> SUBMIT</button>
                    </form>


                </div>

            </div>s
        </>
    )
}

export default Update;
