import { message } from "antd";
import Axios from "axios";
import qs from 'qs';
import { LOGIN_URL } from "../../constants/requestURL";
import { ID_USER } from "../../redux/user/user";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';


export const onLogin = ({ userID, password, autoLogin }) => (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    return Axios.post(LOGIN_URL, qs.stringify({ userID, password })).then(
        res => res.data
    ).then(res => {
        if (res.code === 0) {
            dispatch({ type: LOGIN_SUCCESS, payload: { token: res.data.token, userID } });
            autoLogin && localStorage.setItem('token', res.data.token) && localStorage.setItem('identity', ID_USER);
            sessionStorage.setItem('token', res.data.token);
            sessionStorage.setItem('identity', ID_USER);
        } else {
            dispatch({ type: LOGIN_FAILURE });
            message.error('登陆失败：' + res.message)
            localStorage.clear();
            sessionStorage.clear();
        }
    }).catch(err => {
        dispatch({ type: LOGIN_FAILURE });
        console.error(err);
        message.error('登陆失败，请求异常');
    })
}