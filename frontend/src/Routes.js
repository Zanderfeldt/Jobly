import React, { useState, useEffect } from 'react';
import JoblyApi from './api';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import NavBar from './nav/NavBar';
import Home from './Home';
import CompanyList from './CompanyList';
import JobList from './JobList';
import Company from './Company';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import Profile from './Profile';
import UserContext from './auth/UserContext';
import PrivateRoute from './nav/PrivateRoute';
import jwt_decode from 'jwt-decode';

export const TOKEN_STORAGE_ID = "jobly-token";

function Routes () {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currUser, setCurrUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  
  console.debug(
    "App",
    "infoLoaded=", isLoading,
    "currentUser=", currUser,
    "token=", token,
);
 
  useEffect(() => {
    async function getUserInfo() {
    if (token) {
      try {
        let { username } = jwt_decode(token);
        // put the token on the Api class so it can use it to call the API.
        JoblyApi.token = token;
        let user = await JoblyApi.getUser(username);
        setCurrUser(user);
      } catch (e) {
        console.error(e);
        setCurrUser(null);
      }
    }
   setIsLoading(false);     
  }
  setIsLoading(true);
  getUserInfo();
  }, [token]);

  const register = async (data) => {
    let token = await JoblyApi.register(data);
    setToken(token);    
  }

  const login = async (data) => {
    let token = await JoblyApi.login(data);
    setToken(token); 
  }

  const logout = () => {
    setToken(null);
    setCurrUser(null);
  }

  //Check to see if job has been applied to
  const hasAppliedToJob = (id) => {
    return applicationIds.has(id);
  }

  //Apply to a job (updates state and makes API Call)
  const applyToJob = (id) => {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]))
  }

  //loading text
  if (isLoading) {
    return <p>Loading &hellip;</p>
  }

  return (
    <BrowserRouter>
        <UserContext.Provider value={{currUser, setCurrUser, hasAppliedToJob, applyToJob}}>
      <NavBar logout={logout} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <PrivateRoute exact path="/companies">
          <CompanyList />
        </PrivateRoute>
        <PrivateRoute path="/companies/:id">
          <Company />
        </PrivateRoute>
        <PrivateRoute exact path="/jobs">
          <JobList />
        </PrivateRoute>
        <Route exact path="/login">
          <LoginForm login={login}/>
        </Route>
        <Route exact path="/signup">
          <SignUpForm register={register}/>
        </Route>
        <PrivateRoute exact path="/profile">
          <Profile />
        </PrivateRoute>
        <Redirect to="/" />
      </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default Routes;