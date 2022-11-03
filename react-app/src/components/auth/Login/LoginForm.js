import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../store/session';
import "./LoginForm.css"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(username, password));
    if (data) {
      if (data.length >= 2) {
        setErrors([data[0]]);
      } else {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-form-wrapper'>
      <div className='login-form-container'>
        <div className='login-header'>Log In</div>
        <div className='login-text'>By continuing, you are setting up a Sawdat account and agree to visit our <a href='https://github.com/Aldam55/Sawdat-Reddit' className='shameless-plug'>Github</a> and <a href='https://www.linkedin.com/in/alexander-dam-a45b8821a/' className='shameless-plug'>LinkedIn</a>.</div>
        <form onSubmit={onLogin} className='login-form'>
          <div className='login-form-errors'>
            {errors.map((error, ind) => (
              <div key={ind}>{error.slice(10)}</div>
            ))}
          </div>
          <div className='login-form-username'>
            <input
              className='login-form-username-input'
              name='username'
              type='text'
              placeholder='Username'
              value={username}
              required
              onChange={updateUsername}
            />
          </div>
          <div className='login-form-password'>
            <input
              className='login-form-password-input'
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              required
              onChange={updatePassword}
            />
          </div>
          <div>
            <button type='submit' className='login-submit'>Log In</button>
          </div>
          <div className='demo-user'>
            <button
              type='button'
              className='login-submit'
              onClick={() => dispatch(login('Demo', 'password'))}
            >Demo User</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
