import React, { useContext } from "react";
import "./Home.css";
import UserContext from "./auth/UserContext";
import { Link } from "react-router-dom";

function Home() {
  const { currUser } = useContext(UserContext);

  return (
    <div className="Home">
      <h1>Jobly</h1>
      <p>All the jobs in one, convenient place.</p>
      { currUser ? 
      <h2>
        Welcome Back, {currUser.firstName || currUser.username}! 
      </h2>
      : (<div className="Home-buttons">
      <Link to="/login" className="Home-buttons login">Log In</Link>
      <Link to="/signup" className="Home-buttons signup">Sign Up</Link>
    </div>
    )}  
    </div>
  )

}

export default Home;