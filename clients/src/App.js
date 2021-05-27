import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Student from './components/Student';
import Professor from './components/Professor';
import Update from './components/Update';
import ErrorPage from './components/Error';
import Nav from './components/Nav';

function App() {
  const [name, setName] = useState();
  const [type, setType] = useState();

  const getdataout = async () => {
    const res = await fetch('/api/users', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    const content = await res.json();
    console.log(content);
    setName(content.name);
    setType(content.type);
  }
 console.log(type)
  useEffect(() => {
    getdataout();
  })

  console.log(name);
  return (<>
    <Nav name={name} setName={setName} />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path='/signup' component={SignUp} />
      <Route exact path='/signin' component={() => <SignIn name={name} setName={setName} />} />
     { type && <Route exact path='/student' render={() => type === 'student' ? <Student /> : <Redirect to='/' />} />}
     { type && <Route exact path='/professor' render={() => type === 'Professor' ? <Professor /> : <Redirect to='/' />}/>}
     <Route exact path='/update/:id' component={Update} />
     <Route component={ErrorPage}/>
    </Switch>
    </>
  );
}
export default App;
