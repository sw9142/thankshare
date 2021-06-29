import Axios from 'axios';
import { USER } from './types';


export const getUser_action = async function () {


try{

  const request = await Axios.get("/api/users/islogin").then((res) => {
    console.log("res.data?: ", res.data )
    return res.data
    });


  console.log("[getUser_action]",  request);

console.log("[getUser_action]",  request);

  return {
    type: USER,
    payload: request,
  };
}catch(err){
  console.log("err.request; ", err.request);
  console.log("err.response: ", err.response);
}
};