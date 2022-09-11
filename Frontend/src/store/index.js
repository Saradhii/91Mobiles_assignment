import { legacy_createStore as createStore} from "redux";
import { reducer } from "./reducer";

const initialState = {
    count:0,
    users:[],
};

export const store = createStore(reducer,initialState);