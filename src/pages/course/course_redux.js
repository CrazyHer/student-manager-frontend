import { message } from "antd";
import Axios from "axios";
import qs from 'qs';
import { GET_COURSE_URL, SELECT_COURSE_URL } from "../../constants/requestURL";

export const GET_COURSE_REQUEST = 'GET_COURSE_REQUEST';
export const GET_COURSE_SUCCESS = 'GET_COURSE_SUCCESS';
export const GET_COURSE_FAILURE = 'GET_COURSE_FAILURE';

export const SELECT_COURSE_REQUEST = 'SELECT_COURSE_REQUEST';
export const SELECT_COURSE_SUCCESS = 'SELECT_COURSE_SUCCESS';
export const SELECT_COURSE_FAILURE = 'SELECT_COURSE_FAILURE';

export const getCourse = () => (dispatch) => {
    dispatch({ type: GET_COURSE_REQUEST });
    return Axios.get(GET_COURSE_URL).then(
        res => res.data
    ).then(res => {
        if (res.code === 0) {
            dispatch({ type: GET_COURSE_SUCCESS, payload: { data: res.data } });
        } else {
            dispatch({ type: GET_COURSE_FAILURE });
            message.error('获取失败：' + res.message)
        }
    }).catch(err => {
        dispatch({ type: GET_COURSE_FAILURE });
        console.error(err);
        message.error('请求异常');
    })
}

export const selectCourse = (selectedRowKeys) => (dispatch) => {
    dispatch({ type: SELECT_COURSE_REQUEST });
    return Axios.post(SELECT_COURSE_URL, qs.stringify(JSON.stringify(selectedRowKeys))).then(
        res => res.data
    ).then(res => {
        if (res.code === 0) {
            dispatch({ type: SELECT_COURSE_SUCCESS, payload: { selectedRowKeys } });
            message.success('选课成功！');
            //成功后再请求新的课程数据
            dispatch(getCourse());
        } else {
            dispatch({ type: SELECT_COURSE_FAILURE });
            message.error('选课失败：' + res.message)
        }
    }).catch(err => {
        dispatch({ type: SELECT_COURSE_FAILURE });
        console.error(err);
        message.error('请求异常');
    })
}