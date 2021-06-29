import { PROFILE } from '../_actions/types';
 

 export default  function profile_reducer (state={},action){

    switch(action.type){
        case PROFILE:
            return {...state, success: action.payload }
        default:
            return state;
    }
}