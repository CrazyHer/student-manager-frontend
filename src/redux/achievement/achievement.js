import { LOGOFF } from "../../components/layout_redux";
import { ADD_ACVM_FAILURE, ADD_ACVM_REQUEST, ADD_ACVM_SUCCESS, DEL_ACVM_FAILURE, DEL_ACVM_REQUEST, DEL_ACVM_SUCCESS, GET_ACVM_FAILURE, GET_ACVM_REQUEST, GET_ACVM_SUCCESS } from "../../pages/achievement/achievement_redux";

const defaultState = {
    loading: false,
    data: []
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