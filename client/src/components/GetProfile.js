import React, {useState, useEffect} from 'react'
import AppRouter from "./AppRouter";

import { getProfile_action } from "../_actions/profile_action.js";
import { useDispatch } from "react-redux";

function GetProfile({   IsLogin, setIsLogin, setLoginUser, LoginUser,  getIsLogin}) {
const Dispatch = useDispatch();
const [ProfileDB, setProfileDB] = useState({});


 const data = {
    _id: LoginUser._id, }

const getProfile =  () => {
    Dispatch(getProfile_action(data)).then((res) => { 
     
      if (res.payload.success) {

          setProfileDB(res.payload.profile);         
      }else{
          setProfileDB({userId: LoginUser._id });
      }
    });

    
};



useEffect(() => {
 getProfile();
}, [LoginUser]) 


    return (
        <div>

 
       <AppRouter
        IsLogin={IsLogin}
        setIsLogin={setIsLogin}
        setLoginUser={setLoginUser}
        LoginUser={LoginUser}
        ProfileDB={ProfileDB}
        setProfileDB={setProfileDB}
        getProfile={getProfile}
        getIsLogin={getIsLogin}
   
      /> 
        </div>
    )
}

export default GetProfile
