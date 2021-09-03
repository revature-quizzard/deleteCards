import React, { useState } from 'react';
import logo from './logo.svg';
import { Principal } from './dtos/principal';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {NavbarComponent} from './components/NavbarComponent';
import LoginComponent from "./components/LoginComponent";
import HomeComponent from "./components/HomeComponent";
import RegisterComponent from "./components/RegisterComponent"
import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css';

function App() {

  const [authUser, setAuthUser] = useState(undefined as Principal | undefined)

  return (
    <>
      <Router>
        <NavbarComponent currentUser={authUser} setCurrentUser={setAuthUser}/>
        <Switch>
            <Route exact path="/" render={() => <HomeComponent currentUser={authUser} /> } />
            <Route path="/login" render={() => <LoginComponent currentUser={authUser} setCurrentUser={setAuthUser} /> } />
            <Route path="/register" render={() => <RegisterComponent currentUser={authUser} setCurrentUser={setAuthUser} /> } />
        </Switch>
      </Router>
    </>
  );
}

export default App;