import { LOGOFF } from "../../components/layout_redux"
import { GET_COURSE_FAILURE, GET_COURSE_REQUEST, GET_COURSE_SUCCESS, SELECT_COURSE_FAILURE, SELECT_COURSE_REQUEST, SELECT_COURSE_SUCCESS } from "../../pages/course/course_redux"

const defaultState = {
    loading: false,
    message: '',
    data: []
}
const login = (state = defaultState, action) => {
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
        case LOGOFF:
            return defaultState;
        default:
            return state;
    }
};
export default login;