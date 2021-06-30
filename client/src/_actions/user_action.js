import Axios from 'axios';
import { USER } from './types';


export const getUser_action =  function () {


try{

  const request = Axios.get("/api/users/islogin").then((res) =>  res.data);
    

  return {
    type: USER,
    payload: request,
  };
}catch(err){
  console.log("err.request; ", err.request);
  console.log("err.response: ", err.response);
}
};