import Axios from 'axios';
import { PROFILE } from './types';


export const getProfile_action = function (data) {
console.log("getProfile_action" , data);
  const request = Axios.post("/api/profile/getProfile", data).then((res) => res.data);

  return {
    type: PROFILE,
    payload: request,
  };
};