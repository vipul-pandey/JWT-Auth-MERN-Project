import React from 'react';
import {Link} from 'react-router-dom'

const Error = () => {
    return (
        <div className='main-div'>
            <div className='stu-di'>
                <h1 className='error-head'>404</h1><br />
                <p className='error-para'>OOPS! Page not found</p>
                <Link to='/' className='btn'> Return home</Link>

            </div>
        </div>

    )
}

export default Error;
