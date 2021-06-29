import { USER } from '../_actions/types';
 

 export default function user_reducer (state={},action){
    switch(action.type){
        case USER:
            return {...state, success: action.payload }
        default:
            return state;
    }
}