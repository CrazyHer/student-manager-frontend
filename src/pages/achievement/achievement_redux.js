import { message } from "antd";
import Axios from "axios";
import qs from 'qs';
import { ADD_ACVM_URL, DEL_ACVM_URL, GET_ACVM_URL } from "../../constants/requestURL";

export const GET_ACVM_REQUEST = 'GET_ACVM_REQUEST';
export const GET_ACVM_SUCCESS = 'GET_ACVM_SUCCESS';
export const GET_ACVM_FAILURE = 'GET_ACVM_FAILURE';

export const DEL_ACVM_REQUEST = 'DEL_ACVM_REQUEST';
export const DEL_ACVM_SUCCESS = 'DEL_ACVM_SUCCESS';
export const DEL_ACVM_FAILURE = 'DEL_ACVM_FAILURE';

export const ADD_ACVM_REQUEST = 'ADD_ACVM_REQUEST';
export const ADD_ACVM_SUCCESS = 'ADD_ACVM_SUCCESS';
export const ADD_ACVM_FAILURE = 'ADD_ACVM_FAILURE';

export const getAchievement = () => (dispatch) => {
    dispatch({ type: GET_ACVM_REQUEST });
    return Axios.get(GET_ACVM_URL).then(
        res => res.data
    ).then(res => {
        if (res.code === 0) {
            dispatch({ type: GET_ACVM_SUCCESS, payload: { data: res.data } });
        } else {
            dispatch({ type: GET_ACVM_FAILURE });
            message.error('获取失败：' + res.message)
        }
    }).catch(err => {
        dispatch({ type: GET_ACVM_FAILURE });
        console.error(err);
        message.error('请求异常');
    })
}

export const delAchievement = (key) => (dispatch) => {
    dispatch({ type: DEL_ACVM_REQUEST });
    return Axios.post(DEL_ACVM_URL, qs.stringify({ key })).then(
        res => res.data
    ).then(res => {
        if (res.code === 0) {
            dispatch({ type: DEL_ACVM_SUCCESS });
            message.success('删除成功！');
            //成功后再请求新的社会成果数据
            dispatch(getAchievement());
        } else {
            dispatch({ type: DEL_ACVM_FAILURE });
            message.error('删除失败：' + res.message)
        }
    }).catch(err => {
        dispatch({ type: DEL_ACVM_FAILURE });
        console.error(err);
        message.error('请求异常');
    })
}

export const addAchievement = ({ content, date }) => (dispatch) => {
    dispatch({ type: ADD_ACVM_REQUEST });
    return Axios.post(ADD_ACVM_URL, qs.stringify({ content, date })).then(
        res => res.data
    ).then(res => {
        if (res.code === 0) {
            dispatch({ type: ADD_ACVM_SUCCESS });
            message.success('添加成功！');
            //成功后再请求新的课程数据
            dispatch(getAchievement());
        } else {
            dispatch({ type: ADD_ACVM_FAILURE });
            message.error('添加失败：' + res.message)
        }
    }).catch(err => {
        dispatch({ type: ADD_ACVM_FAILURE });
        console.error(err);
        message.error('请求异常');
    })
}