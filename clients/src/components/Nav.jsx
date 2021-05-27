import React from 'react';
import learning from './img/learning.png';
import { Link } from 'react-router-dom';
const Nav = (props) => {
    const logout = async () => {
        await fetch('api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        window.location.reload(true);
        props.setName(" ");
    }
    let menu;
    if (props.name !== undefined) {
        menu = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to='/' onClick={logout} >LOGOUT</Link>
                </li>
            </ul>
        )

    } else {
        menu = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to='/signup'>SIGNUP</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/signin' href="#">SIGNIN</Link>
                </li>
            </ul>
        )
    }

    return (
        <>
        <div className='headers'>
            <div className='menu-bar'>
            <nav className="navbar navbar-expand-lg navbar-light">
                <Link className="navbar-brand" to='/' ><img className='logo-png' src={learning} alt="Logo" /> </Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupported" aria-controls="navbarSupported" aria-expanded="false" aria-label="Toggle navigation">
                   <span> <i class="fas fa-bars"></i></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupported">
                    {menu}
                </div>
            </nav>
            </div>
        </div>
        </>
    )
}

export default Nav;
