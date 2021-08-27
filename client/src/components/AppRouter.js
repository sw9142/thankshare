import React from "react";
import Auth from "./views/Auth";
import LandingPage from "./views/LandingPage";
import Profile from "./views/Profile";
import Bible from "./views/Bible";
import Nav from "./views/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BibleToday from "./views/BibleToday";
import Sharing from "./views/Sharing";
import Footer from "./views/Footer";
import Register from "./views/Register";

function AppRouter({
  IsLogin,
  setIsLogin,
  setLoginUser,
  LoginUser,
  ProfileDB,
  setProfileDB,
  getIsLogin,
  getProfile,
}) {
  return (
    <Router>
      {IsLogin && ProfileDB && <Nav />}
      <Switch>
        {IsLogin && ProfileDB ? (
          <>
            <Route exact path="/profile">
              <Profile
                LoginUser={LoginUser}
                ProfileDB={ProfileDB}
                getProfile={getProfile}
              />
            </Route>
            <Route exact path="/bible">
              <Bible
                LoginUser={LoginUser}
                ProfileDB={ProfileDB}
                getProfile={getProfile}
              />
            </Route>
            <Route exact path="/bibletoday">
              <BibleToday
                LoginUser={LoginUser}
                ProfileDB={ProfileDB}
                getProfile={getProfile}
              />
            </Route>
            <Route exact path="/sharing">
              <Sharing
                LoginUser={LoginUser}
                ProfileDB={ProfileDB}
                getProfile={getProfile}
              />
            </Route>

            <Route exact path="/home">
              <LandingPage LoginUser={LoginUser} ProfileDB={ProfileDB} />
            </Route>
            <Footer
              setIsLogin={setIsLogin}
              LoginUser={LoginUser}
              ProfileDB={ProfileDB}
              getProfile={getProfile}
            />
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth
                getIsLogin={getIsLogin}
                setLoginUser={setLoginUser}
                getProfile={getProfile}
                setIsLogin={setIsLogin}
              />
            </Route>
            <Route exact path="/register">
              <Register
                getIsLogin={getIsLogin}
                setLoginUser={setLoginUser}
                getProfile={getProfile}
                setIsLogin={setIsLogin}
              />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default AppRouter;
