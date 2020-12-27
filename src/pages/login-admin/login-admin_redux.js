import { message } from "antd";
import Axios from "axios";
import qs from 'qs';
import { LOGIN_ADMIN_URL } from "../../constants/requestURL";
import { ID_ADMIN } from "../../reducers/user/user";

export const LOGIN_ADMIN_REQUEST = 'LOGIN_ADMIN_REQUEST';
export const LOGIN_ADMIN_SUCCESS = 'LOGIN_ADMIN_SUCCESS';
export const LOGIN_ADMIN_FAILURE = 'LOGIN_ADMIN_FAILURE';


export const onLoginAdmin = ({ adminID, password, autoLogin }) => (dispatch) => {
    dispatch({ type: LOGIN_ADMIN_REQUEST });
    return Axios.post(LOGIN_ADMIN_URL, qs.stringify({ adminID, password })).then(
        res => res.data
    ).then(res => {
        if (res.code === 0) {
            dispatch({ type: LOGIN_ADMIN_SUCCESS, payload: { token: res.data.token, adminID } });
            autoLogin && localStorage.setItem('token', res.data.token);
            sessionStorage.setItem('token', res.data.token);
            sessionStorage.setItem('identity', ID_ADMIN);
        } else {
            dispatch({ type: LOGIN_ADMIN_FAILURE });
            message.error('登陆失败：' + res.message)
            localStorage.clear();
            sessionStorage.clear();
        }
    }).catch(err => {
        dispatch({ type: LOGIN_ADMIN_FAILURE });
        console.error(err);
        message.error('登陆失败，请求异常');
    })
}