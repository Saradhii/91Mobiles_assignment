import {GET_USERNAME, DELETE_USERNAME} from "./actionTypes";
export const reducer = (state,action) =>{
    switch(action.type){
        case GET_USERNAME:{
            return{
                ...state,
                users:action.payload,
            }
        }
        case DELETE_USERNAME:{
            return{
                ...state,
                users:state.users.filter(users => users.id !== action.payload),
            }
        }
        default:{
            return state;
        }
    }
}