import React, { useState } from 'react';
import axios from 'axios';

const Login = props => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const changeHandler = event => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const user = await axios.post(
        'http://localhost:3300/api/auth/login',
        userData,
      );

      localStorage.setItem('token', user.data.token);
      props.history.push('/jokes');

      setUserData({
        username: '',
        password: '',
      });
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  return (
    <div className='form-wrapper'>
      <form className='login-form' onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          value={userData.username}
          onChange={changeHandler}
          placeholder='username'
        />

        <input
          type='text'
          name='password'
          value={userData.password}
          onChange={changeHandler}
          placeholder='password'
        />

        <p>{message}</p>

        <button className='login-button' onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
