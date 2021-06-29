import Axios from 'axios';
import { PROFILE } from './types';


export const getProfile_action = function (data) {

  const request = Axios.post("/api/profile/getProfile", data).then((res) => res.data);
console.log("[getProfile_action]",  request);
  return {
    type: PROFILE,
    payload: request,
  };
};