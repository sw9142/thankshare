import { PROFILE } from '../_actions/types';
 

 export default  function (state={},action){

    switch(action.type){
        case PROFILE:
            return {...state, success: action.payload }
        default:
            return state;
    }
}