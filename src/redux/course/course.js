import { GET_COURSE_FAILURE, GET_COURSE_REQUEST, GET_COURSE_SUCCESS, SELECT_COURSE_FAILURE, SELECT_COURSE_REQUEST, SELECT_COURSE_SUCCESS } from "../../pages/course/course_redux"

const defaultState = {
    loading: false,
    message: '',
    data: [
        {
            courseID: '1',
            courseName: '离散数学',
            teacherName: '孔凡玉',
            credit: '3',
            time: '周四',
            address: '五区408',
            capacity: '70',
            remains: '2',
            selected: true
        },
        {
            courseID: '2',
            courseName: '计算机组成与结构',
            teacherName: '陈志勇',
            credit: '3',
            time: '周四',
            address: '五区407',
            capacity: '50',
            remains: '10',
            selected: false
        }
    ]
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_COURSE_REQUEST:
            return { ...state, loading: true, message: GET_COURSE_REQUEST }
        case GET_COURSE_SUCCESS:
            return { ...state, data: action.payload.data, loading: false, message: GET_COURSE_SUCCESS }
        case GET_COURSE_FAILURE:
            return { ...state, loading: false, message: GET_COURSE_FAILURE }
        case SELECT_COURSE_REQUEST:
            return { ...state, loading: true, message: SELECT_COURSE_REQUEST }
        case SELECT_COURSE_SUCCESS:
            return {
                ...state, loading: false, message: SELECT_COURSE_SUCCESS
            }
        case SELECT_COURSE_FAILURE:
            return { ...state, loading: false, message: SELECT_COURSE_FAILURE }
        default:
            return state;
    }
}