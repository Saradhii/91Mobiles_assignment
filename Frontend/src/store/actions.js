import { GET_USERNAME, DELETE_USERNAME } from "./actionTypes";
import axios from "axios";


export const getusername = async (dispatch) => {
    let r = await axios.get("http://localhost:8080/usres");
    let data = await r.data;
    dispatch ({
        type: GET_USERNAME,
        payload:data,
    });
};

export const deleteusername = async (dispatch,id) => {
    let r = await axios.get(`http://localhost:8080/users/${id}`);
    dispatch ({
        type: DELETE_USERNAME,
        payload:id,
    });
};