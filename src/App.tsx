import React, { useState } from 'react';
import logo from './logo.svg';
import { Principal } from './dtos/principal';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {NavbarComponent} from './components/NavbarComponent';
import LoginComponent from "./components/LoginComponent";
import HomeComponent from "./components/HomeComponent";
import RegisterComponent from "./components/RegisterComponent"
import CreateCollectionComponent from './components/CreateCollectionComponent';
import CreateQuestionComponent from './components/CreateQuestionComponent';
import CustomGameComponent from './components/CustomGameComponent';
import ManageCollectionComponent from './components/ManageCollectionComponent';
import ViewCollectionComponent from './components/ViewCollectionComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Collections } from './dtos/collection';








function App() {

  const [authUser, setAuthUser] = useState(undefined as Principal | undefined)
  const [collection , setCollection] = useState(undefined as  [] | undefined)
  const [currCollection , setCurrCollection] = useState(undefined as  Collections | undefined)

  return (
    <>
      <Router>
        <NavbarComponent currentUser={authUser} setCurrentUser={setAuthUser}/>
        <Switch>
            <Route exact path="/" render={() => <HomeComponent currentUser={authUser} /> } />
            <Route path="/login" render={() => <LoginComponent currentUser={authUser} setCurrentUser={setAuthUser} /> } />
            <Route path="/register" render={() => <RegisterComponent currentUser={authUser} setCurrentUser={setAuthUser} /> } />
            <Route path="/create-collection" render={() => <CreateCollectionComponent currentUser={authUser} /> } />
            <Route path="/create-question" render={() => <CreateQuestionComponent currentUser={authUser} /> } />
            <Route path="/custom-game" render={() => <CustomGameComponent currentUser={authUser} currentCollection={collection} setCurrentCollection={setCollection} /> } />
            <Route path="/manage-collections" render={() => <ManageCollectionComponent currentUser={authUser} setCurrCollection={setCurrCollection}  /> } />
            <Route path="/view-collection" render={() => <ViewCollectionComponent currentUser={authUser} collection={currCollection}/> } />
        </Switch>
      </Router>
    </>
  );
}

export default App;