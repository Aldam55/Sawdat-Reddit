import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import logo from '../../assets/logo.png'
import "./NavBar.css"

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  let sessionLinks;
  if (user) {
    sessionLinks = (
      <>
        <LogoutButton></LogoutButton>
      </>
    )
  } else {
    sessionLinks = (
      <>
        <div className='navbar-user-button'>
          <NavLink to='/sign-up' exact={true} id='signup-nav'>
            <div id='signup-button'>
              Sign Up
            </div>
          </NavLink>
          <NavLink to='/login' exact={true} id='login-nav'>
            <div id='login-button'>
              Log In
            </div>
          </NavLink>
        </div>
      </>
    )
  }
  return (
    <div className='header-wrapper'>
      <div className='navbar-container'>
        <div className='navbar-home-button'>
          <NavLink to='/' exact={true} >
            <img src={logo} alt='logo' id='navbar-logo' />
          </NavLink>
        </div>
        <div className='navbar-right-side'>
          <>{sessionLinks}</>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
