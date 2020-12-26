import { message } from "antd";
import Axios from "axios";
import qs from 'qs';
import { getUserInfo } from "../../components/layout_redux";
import { REGISTER_URL } from "../../constants/requestURL";
import { ID_USER } from "../../redux/user/user";

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';


export const onRegister = ({ name, userID, className, password, school, tel }) => (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    return Axios.post(REGISTER_URL, qs.stringify({ userID, password, name, className, school, tel })).then(
        res => res.data
    ).then(res => {
        if (res.code === 0) {
            dispatch({ type: REGISTER_SUCCESS, payload: { token: res.data.token, userID, name } });
            //注册成功后即以当前账号登录
            sessionStorage.setItem('token', res.data.token);
            sessionStorage.setItem('identity', ID_USER);
            message.success('注册成功！');
            dispatch(getUserInfo());
        } else {
            dispatch({ type: REGISTER_FAILURE });
            message.error('注册失败：' + res.message)
            localStorage.clear();
            sessionStorage.clear();
        }
    }).catch(err => {
        dispatch({ type: REGISTER_FAILURE });
        console.error(err);
        message.error('注册失败，请求异常');
    })
}