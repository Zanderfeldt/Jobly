import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import './auth/LoginForm.css';
import JoblyApi from './api';
import UserContext from './auth/UserContext';

function Profile() {
  const { currUser, setCurrUser } = useContext(UserContext);
  const INITIAL_STATE = {
    username: currUser.username,
    firstName: currUser.firstName,
    lastName: currUser.lastName,
    email: currUser.email,
    password: '',
  }

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [showAlert, setShowAlert] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    let username = formData.username;
    let updatedUser;

    try {
      updatedUser = await JoblyApi.saveProfile(username, profileData);
    } catch (e) {
      setFormErrors(e);
      console.log(formErrors);
      return;
    }

    setFormData(f => ({ ...f, password: "" }));
    setFormErrors([]);

    // update currentUser with new profile information
    setCurrUser(updatedUser);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleChange = e => {
    const {name, value} = e.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
    setFormErrors([]);
  };

  const isFormValid = Object.values(formData).every(Boolean);

  return (
    <div className='Login'>
      <h2>Profile</h2>
      {showAlert && <div style={{color: 'green'}}>Changes saved successfully</div>}
      <form onSubmit={handleSubmit}>
          <input
          id='firstName'
          name='firstName'
          placeholder='First Name'
          value={formData.firstName}
          onChange={handleChange}
          />
          <input
          id='lastName'
          name='lastName'
          placeholder='Last Name'
          value={formData.lastName}
          onChange={handleChange}
          />
          <input
          id='email'
          name='email'
          placeholder='E-mail'
          value={formData.email}
          onChange={handleChange}
          />
          <input
          id='username'
          name='username'
          placeholder='Username'
          value={formData.username}
          disabled
          />
          <input
          id='password'
          type='password'
          name='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleChange}
          />
          <button disabled={!isFormValid}>Save Changes</button>
      </form>

    </div>
  )
}

export default Profile;