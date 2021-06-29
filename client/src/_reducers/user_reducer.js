import { USER } from '../_actions/types';
 

 export default function  (state={},action){
    switch(action.type){
        case USER:
            return {...state, success: action.payload }
        default:
            return state;
    }
}