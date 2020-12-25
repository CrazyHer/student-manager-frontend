import { message } from "antd";
import Axios from "axios";
import { GET_GRADE_URL } from "../../constants/requestURL";

export const GET_GRADE_REQUEST = 'GET_GRADE_REQUEST';
export const GET_GRADE_SUCCESS = 'GET_GRADE_SUCCESS';
export const GET_GRADE_FAILURE = 'GET_GRADE_FAILURE';

export const getGrade = () => (dispatch) => {
    dispatch({ type: GET_GRADE_REQUEST });
    return Axios.get(GET_GRADE_URL).then(
        res => res.data
    ).then(res => {
        if (res.code === 0) {
            dispatch({ type: GET_GRADE_SUCCESS, payload: { data: res.data } });
        } else {
            dispatch({ type: GET_GRADE_FAILURE });
            message.error('获取失败：' + res.message)
        }
    }).catch(err => {
        dispatch({ type: GET_GRADE_FAILURE });
        console.error(err);
        message.error('请求异常');
    })
}