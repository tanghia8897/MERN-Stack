import React, { Component } from 'react';
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import {Helmet} from 'react-helmet'
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './action/authActions';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRouter from './components/common/PrivateRouter';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducationn from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts'; 
import EditEducation from './components/edit-profile/EditEducation';


import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import  store  from './store';

import './App.css';
import { clearCurrentProfile } from './action/profileAction';

//Check for token
if(localStorage.jwtToken){ 
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken); 
  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  console.log(localStorage.jwtToken);
  console.log(decoded);
  //Set user and authenticated
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token
  // const currentTime = Date.now()+1;
  // console.log(currentTime);
  // if(decoded.exp < currentTime){
  //   //Logout user
  //   store.dispatch(logoutUser);
  //   //Clear current profile
  //   store.dispatch(clearCurrentProfile());
    
  //   //Redirect to login
  //   window.location.href='/login';
  // }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
          <Helmet>
            <title>DevConnector: A social network for developers</title>
            <meta name="description" content="This is what you want to show as the page content in the Google SERP Listing" />
          </Helmet>
            <Helmet>
              <meta property="og:site_name" content="DevConnector: Test SEO site name"/>
            </Helmet>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Route exact path="/not-found" component={NotFound} />
              <Switch>
                <PrivateRouter exact path="/dashboard" component={Dashboard}/>  {/*  privateRoute giúp ngăn chặn vào các trang private nếu chưa login */}
              </Switch>
              <Switch>
                <PrivateRouter exact path="/create-profile" component={CreateProfile}/>
              </Switch>
              <Switch>
                <PrivateRouter exact path="/edit-profile" component={EditProfile}/>
              </Switch>
              <Switch>
                <PrivateRouter exact path="/add-experience" component={AddExperience}/>
              </Switch>
              <Switch>
                <PrivateRouter exact path="/add-education" component={AddEducationn}/>
              </Switch>
              <Switch>
                <PrivateRouter exact path="/edit-education/:id" component={EditEducation}/>
              </Switch>
              <Switch>
                <PrivateRouter exact path="/feed" component={Posts}/>
              </Switch>

            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
