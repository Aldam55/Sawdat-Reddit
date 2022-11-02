import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import * as sessionActions from "../../store/session"
import LoginFormModal from '../auth/Login/LoginModal';
import logo from '../../assets/logo.png'
import profile from '../../assets/profile.svg'
import downarrow from "../../assets/downarrow.svg"
import logouticon from "../../assets/logout.svg"
import plussign from "../../assets/plussign.svg"
import "./NavBar.css"

const NavBar = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const user = useSelector(state => state.session.user)
  const [showMenu, setShowMenu] = useState(false)

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true)
  }

  const className = () => {
    if (showMenu) {
      return 'profile-dropdown-container-active'
    } else {
      return 'profile-dropdown-container'
    }
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false)
    }

    document.addEventListener('click', closeMenu)

    return () => document.removeEventListener("click", closeMenu)
  }, [showMenu])

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout())
    history.push('/')
  }

  let sessionLinks;
  if (user) {
    sessionLinks = (
      <>
        <div>
          <div className={className()}>
            <button onClick={openMenu} id='profile-dropdown-button'>
              <div className='profile-dropdown-left'>
                <img src={profile} alt='profile' id='profile-icon' />
                <div id='profile-username'>{user.username}</div>
              </div>
              <img src={downarrow} alt='downarrow' id='profile-arrow' />
            </button>
          </div>
        </div>
        {showMenu && (
          <div id='dropdown-parent-container'>
            <div id='dropdown-sections'>
              <div id='dropdown-text'>
                <div id='dropdown-hello'>
                  Hello, {user.username}!
                </div>
              </div>
              <div id='dropdown-link'>
                <NavLink to={`/communities/create`} id='create-community-container'>
                  <img src={plussign} alt='create community' id='logout-icon' />
                  <div id='dropdown-create-community'>
                    Create Community
                  </div>
                </NavLink>
                <div id='just-for-border'></div>
                <div id='logout-container' onClick={logout}>
                  <img src={logouticon} alt='logout' id='logout-icon' />
                  <div id='dropdown-logout'>Log Out</div>
                </div>
              </div>
            </div>
          </div>
        )}
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
          <NavLink to='/' exact={true} id='navbar-home-link'>
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
