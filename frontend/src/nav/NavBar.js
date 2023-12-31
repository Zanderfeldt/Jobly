import React, { useContext } from "react";
import "./NavBar.css";
import { NavLink, Link } from "react-router-dom";
import UserContext from "../auth/UserContext";

function NavBar({logout}) {
  const { currUser } = useContext(UserContext);

  const loggedInNav = () => {
    return (
      <div className="navbar">
        <div className="navbar-brand">
          <NavLink exact to="/">
            Jobly
          </NavLink>
        </div>
  
        <div className="navbar-links">
          <NavLink exact to="/companies">Companies</NavLink>
          <NavLink exact to="/jobs">Jobs</NavLink>
          <NavLink exact to="/profile">Profile</NavLink>
          <Link to="/" onClick={logout}>Log Out</Link> 
          
        </div>
      </div>
    );
  }

  const loggedOutNav = () => {
    return (
      <div className="navbar">
        <div className="navbar-brand">
          <NavLink exact to="/">
            Jobly
          </NavLink>
        </div>  
        <div className="navbar-links">          
          <NavLink to="/signup">Sign Up</NavLink>  
          <NavLink to="/login">Log In</NavLink>            
        </div>
      </div>
    );   
  }

  return (
    <div>
      {currUser ? loggedInNav() : loggedOutNav()}
    </div>  
  )

}

export default NavBar;
