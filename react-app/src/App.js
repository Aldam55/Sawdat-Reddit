import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/Login/LoginForm';
import LoginFormModal from './components/auth/Login/LoginModal';
import SignUpForm from './components/auth/Signup/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';

import AllCommunities from './components/Communities/AllCommunities';
import SingleCommunity from './components/Communities/SingleCommunity';
import CreateCommunity from './components/Communities/CreateCommunity';
import AllPosts from './components/Posts/AllPosts';
import UpdateCommunity from './components/Communities/UpdateCommunity';
import CreatePost from './components/Posts/CreatePost';
import UpdatePost from './components/Posts/UpdatePost';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <AllPosts></AllPosts>
        </Route>

        <Route path='/communities' exact={true}>
          <AllCommunities></AllCommunities>
        </Route>

        <Route path='/communities/create' exact={true}>
          <CreateCommunity></CreateCommunity>
        </Route>

        <Route path='/communities/:communityId' exact={true}>
          <SingleCommunity></SingleCommunity>
        </Route>

        <ProtectedRoute path='/communities/:communityId/updatecommunity' exact={true}>
          <UpdateCommunity></UpdateCommunity>
        </ProtectedRoute>

        <ProtectedRoute path='/communities/:communityId/createpost' exact={true}>
          <CreatePost></CreatePost>
        </ProtectedRoute>

        <ProtectedRoute path='/posts/:postId/edit' exact={true}>
          <UpdatePost></UpdatePost>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
