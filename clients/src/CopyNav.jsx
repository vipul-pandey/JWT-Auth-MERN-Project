import React from 'react';
import { Link } from 'react-router-dom';
const Nav = (props) =>{
    const logout= async()=>{
      await fetch('http://localhost:5500/api/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials:'include',
    }); 
    props.setName("");
}
    let menu;
    if (props.name === '') {
        menu = (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to='/signup'>SIGNUP</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/' href="#">LOGIN</Link>
                </li>
            </ul>
        )
    } else {
        menu = (
            <ul className="navbar-nav mr-auto ar">
                <li className="nav-item">
                    <Link className="nav-link" to='/' onClick={logout} >LOGOUT</Link>
                </li>
            </ul>
        )
    }


    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dar bg-dark fied-top ">
                <Link className="navbar-brand" to='/home'>HOME</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    {menu}
                </div>
            </nav>
        </div>
    )
}

export default Nav;
