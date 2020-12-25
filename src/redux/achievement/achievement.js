import { LOGOFF } from "../../components/layout_redux";
import { ADD_ACVM_FAILURE, ADD_ACVM_REQUEST, ADD_ACVM_SUCCESS, DEL_ACVM_FAILURE, DEL_ACVM_REQUEST, DEL_ACVM_SUCCESS, GET_ACVM_FAILURE, GET_ACVM_REQUEST, GET_ACVM_SUCCESS } from "../../pages/achievement/achievement_redux";

const defaultState = {
    loading: false,
    data: [
        { content: '国家奖学金', audited: false, date: '2022/09', key: 1 },
        { content: '学业二等奖学金', audited: true, date: '2021/09', key: 2 }
    ]
};
export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_ACVM_REQUEST:
        case ADD_ACVM_REQUEST:
        case DEL_ACVM_REQUEST:
            return { ...state, loading: true };
        case GET_ACVM_SUCCESS:
            return { ...state, loading: false, data: action.payload.data }
        case ADD_ACVM_SUCCESS:
        case DEL_ACVM_SUCCESS:
            return { ...state, loading: false };
        case GET_ACVM_FAILURE:
        case ADD_ACVM_FAILURE:
        case DEL_ACVM_FAILURE:
            return { ...state, loading: false };
        case LOGOFF:
            return defaultState;
        default:
            return state;
    }
}