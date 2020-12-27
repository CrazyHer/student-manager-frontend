import { LOGOFF } from "../../components/layout_redux";
import { GET_GRADE_REQUEST, GET_GRADE_SUCCESS, GET_GRADE_FAILURE } from "../../pages/grade/grade_redux";

const defaultState = {
    loading: false,
    data: [

    ]
}
const grade = (state = defaultState, action) => {
    switch (action.type) {
        case GET_GRADE_REQUEST:
            return { ...state, loading: true }
        case GET_GRADE_SUCCESS:
            return { ...state, loading: false, data: action.payload.data }
        case GET_GRADE_FAILURE:
            return { ...state, loading: false }
        case LOGOFF:
            return defaultState;
        default:
            return state;
    }
};
export default grade;