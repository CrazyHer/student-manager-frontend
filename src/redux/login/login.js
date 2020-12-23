import { LOGIN_ADMIN_FAILURE, LOGIN_ADMIN_REQUEST, LOGIN_ADMIN_SUCCESS } from "../../pages/login-admin/login-admin_redux";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../../pages/login/login_redux"
const defaultState = {
    loading: false,
    message: ''
}
export default (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOGIN_ADMIN_REQUEST:
            return {
                ...state,
                message: LOGIN_REQUEST,
                loading: true,
            };
        case LOGIN_SUCCESS:
        case LOGIN_ADMIN_SUCCESS:
            return {
                ...state,
                message: LOGIN_SUCCESS,
                loading: false,
            }
        case LOGIN_FAILURE:
        case LOGIN_ADMIN_FAILURE:
            return {
                ...state,
                message: LOGIN_FAILURE,
                loading: false,
            }
        default:
            return state;
    }
}