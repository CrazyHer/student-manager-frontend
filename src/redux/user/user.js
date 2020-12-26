import { GET_USER_INFO_FAILURE, GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, LOGOFF } from "../../components/layout_redux";
import { LOGIN_ADMIN_SUCCESS } from "../../pages/login-admin/login-admin_redux";
import { LOGIN_SUCCESS } from "../../pages/login/login_redux";
import { REGISTER_SUCCESS } from "../../pages/register/register_redux";
import { EDIT_USER_INFO_FAILURE, EDIT_USER_INFO_REQUEST, EDIT_USER_INFO_SUCCESS } from "../../pages/userinfo/userinfo_redux";

export const ID_ADMIN = 'ID_ADMIN';
export const ID_USER = 'ID_USER';

const defaultState = {
    loading: false,
    userID: '',
    name: '',
    sex: '',
    degree: '',
    school: '',
    className: '',
    tel: '',
    profileURL: '',
    identity: sessionStorage.getItem('identity') || ID_USER,
    token: localStorage.getItem('token') || sessionStorage.getItem('token') || '',
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
        case LOGIN_ADMIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                userID: action.payload.userID,
                name: action.payload.name || '',
                token: action.payload.token,
                identity: ID_USER
            };

        case GET_USER_INFO_REQUEST:
        case EDIT_USER_INFO_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_USER_INFO_SUCCESS:
        case EDIT_USER_INFO_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        case GET_USER_INFO_FAILURE:
        case EDIT_USER_INFO_FAILURE:
            return {
                ...state,
                loading: false
            }
        case LOGOFF:
            return {
                loading: false,
                userID: '',
                name: '',
                sex: '',
                degree: '',
                school: '',
                className: '',
                tel: '',
                profileURL: '',
                identity: ID_USER,
                token: '',
            };
        default:
            return state;
    }
}