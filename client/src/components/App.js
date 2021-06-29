import React, { useState, useEffect } from "react";

import GetProfile from "./GetProfile"
import "./App.css"
import {ThemeProvider,  unstable_createMuiStrictModeTheme} from "@material-ui/core";
import { getUser_action } from "../_actions/user_action.js";
import { useDispatch } from "react-redux";



function App() {

  const Dispatch = useDispatch();

  const [IsLogin, setIsLogin] = useState(false);
  const [LoginUser, setLoginUser] = useState({});
  const [IsInit, setIsInit] = useState(false); 

  const theme = unstable_createMuiStrictModeTheme();

  const getIsLogin = () => {
      Dispatch(getUser_action()).then((res)=>{ 
      if (res.payload.success) { 
          setIsLogin(true);
        
        } else {
          setIsLogin(false);
        } 
      })
      setIsInit(true)
  };

useEffect(() => {
 getIsLogin();
 console.log("it is rendering ");
})

  return (
    <>
  {IsInit ?  
  
    <ThemeProvider theme={theme}>


      <GetProfile  IsLogin={IsLogin}
        setIsLogin={setIsLogin}
        LoginUser={LoginUser}
       setLoginUser={setLoginUser}
 
        getIsLogin={getIsLogin}/>

      </ThemeProvider>  : "Loading..."
    }
    </>


  );
}

export default App;















/*



import React, { useState, useEffect } from "react";
import Axios from "axios";
import AppRouter from "./AppRouter";
import "./App.css"

function App() {
  const [IsLogin, setIsLogin] = useState(false);
  const [LoginUser, setLoginUser] = useState("");
  const [ProfileDB, setProfileDB] = useState("");
console.log("isLogin?: ", IsLogin, " LoginUser: ", LoginUser, " ProfileDB: ", ProfileDB);
  const getIsLogin = () => {
    Axios.get("/api/users/islogin").then((res) => {
      if (res.data.success) {
        setLoginUser({
          id: res.data.user._id,
          email: res.data.user.email,
          isAdmin: res.data.user.isAdmin,
        });
        setIsLogin(true);
      } else {
        alert(res.data.err);
        setIsLogin(false);
      }
    });
  };

  const getProfile = () => {
    Axios.post("/api/profile/getProfile").then((res) => {
      if (res.data.success) {
        setProfileDB(res.data.profile);
      }
    });
  };

  useEffect(() => {
    getIsLogin();
    getProfile();
  }, []);


  return (
    <div >
      <AppRouter
        IsLogin={IsLogin}
        setIsLogin={setIsLogin}
        LoginUser={LoginUser}
        ProfileDB={ProfileDB}
        setProfileDB={setProfileDB}
        getProfile={getProfile}
   
      />
    </div>
  );
}

export default App;

















 */