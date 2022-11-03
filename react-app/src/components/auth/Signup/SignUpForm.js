import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';
import "./SignUpForm.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      console.log('----data in signup form----', data)
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Passwords must match'])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-form-wrapper'>
      <div className='login-form-container'>
        <div className='login-header'>Sign Up</div>
        <div className='login-text'>By continuing, you are setting up a Sawdat account and agree to visit our <a href='https://github.com/Aldam55/Sawdat-Reddit' className='shameless-plug'>Github</a> and <a href='https://www.linkedin.com/in/alexander-dam-a45b8821a/' className='shameless-plug'>LinkedIn</a>.</div>
        <form onSubmit={onSignUp} className='signup-form'>
          <div className='signup-form-errors'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='login-form-username'>
            <input
              className='login-form-username-input'
              type='text'
              name='username'
              placeholder='Username'
              onChange={updateUsername}
              required
              value={username}
            ></input>
          </div>
          <div className='login-form-username'>
            <input
              className='login-form-username-input'
              type='text'
              name='email'
              placeholder='Email'
              onChange={updateEmail}
              required
              value={email}
            ></input>
          </div>
          <div className='login-form-username'>
            <input
              className='login-form-username-input'
              type='password'
              name='password'
              placeholder='Password'
              onChange={updatePassword}
              required
              value={password}
            ></input>
          </div>
          <div className='login-form-password'>
            <input
              className='login-form-username-input'
              type='password'
              name='repeat_password'
              placeholder='Confirm Password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required
            ></input>
          </div>
          <button type='submit' className='login-submit'>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
