import { message } from "antd";
import Axios from "axios";
import qs from 'qs';
import { EDIT_USER_INFO_URL } from "../../constants/requestURL";

export const EDIT_USER_INFO_REQUEST = 'EDIT_USER_INFO_REQUEST';
export const EDIT_USER_INFO_SUCCESS = 'EDIT_USER_INFO_SUCCESS';
export const EDIT_USER_INFO_FAILURE = 'EDIT_USER_INFO_FAILURE';


export const onSubmitEdit = ({ className, degree, school, sex, tel }) => (dispatch) => {
    dispatch({ type: EDIT_USER_INFO_REQUEST });
    return Axios.post(EDIT_USER_INFO_URL, qs.stringify({ className, degree, school, sex, tel })).then(
        res => res.data
    ).then(res => {
        if (res.code === 0) {
            dispatch({ type: EDIT_USER_INFO_SUCCESS, payload: { className, degree, school, sex, tel } });

        } else {
            dispatch({ type: EDIT_USER_INFO_FAILURE });
            message.error('修改失败：' + res.message)
        }
    }).catch(err => {
        dispatch({ type: EDIT_USER_INFO_FAILURE });
        console.error(err);
        message.error('请求异常');
    })
}