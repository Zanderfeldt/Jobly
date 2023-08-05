import React, { useContext } from "react";
import "./Home.css";
import UserContext from "./auth/UserContext";

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
      <a href="/login" className="Home-buttons login">Log In</a>
      <a href="/signup" className="Home-buttons signup">Sign Up</a>
    </div>
    )}  
    </div>
  )

}

export default Home;