import react from 'react';
import {Redirect, Route } from 'react-router-dom';

const authentication= {
    isLoggedIn:false,
    onAuthentication(){
      this.isLoggedIn=true;
    },
    getLogInStatus(){
      return this.isLoggedIn;
    }
  }

function SecureRouter(props) {
    return(
      <Route path={props.path} render= {data=>authentication.getLogInStatus()?(<props.component {...data}></props.component>):(<Redirect to= '/signin'></Redirect>)}></Route>
    )
  }  

  export default SecureRouter;