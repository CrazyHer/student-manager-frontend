import { message } from "antd";
import Axios from "axios";
import { GET_USER_INFO_URL } from "../constants/requestURL";

export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILURE = 'GET_USER_INFO_FAILURE';


export const getUserInfo = () => (dispatch) => {
    dispatch({ type: GET_USER_INFO_REQUEST });
    return Axios.get(GET_USER_INFO_URL).then(
        res => res.data
    ).then(res => {
        if (res.code === 0) {
            dispatch({ type: GET_USER_INFO_SUCCESS, payload: { name: res.data.name, identity: res.data.identity } });
            sessionStorage.setItem('identity', res.data.identity);
        } else {
            dispatch({ type: GET_USER_INFO_FAILURE });
            message.error('获取用户信息失败：' + res.message)
        }
    }).catch(err => {
        dispatch({ type: GET_USER_INFO_FAILURE });
        console.error(err);
        message.error('请求异常');
    })
}