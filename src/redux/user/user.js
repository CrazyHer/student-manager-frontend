import { LOGIN_ADMIN_SUCCESS } from "../../pages/login-admin/login-admin_redux";
import { LOGIN_SUCCESS } from "../../pages/login/login_redux";
import { REGISTER_SUCCESS } from "../../pages/register/register_redux";

export const ID_ADMIN = 'ID_ADMIN';
export const ID_USER = 'ID_USER';

const defaultState = {
    userID: '',
    identity: localStorage.getItem('identity') || sessionStorage.getItem('identity') || ID_USER,
    token: localStorage.getItem('token') || sessionStorage.getItem('token') || 'a',
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                userID: action.payload.userID,
                token: action.payload.token,
                identity: ID_USER
            };
        case LOGIN_ADMIN_SUCCESS:
            return {
                ...state,
                userID: action.payload.adminID,
                token: action.payload.token,
                identity: ID_ADMIN
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                userID: action.payload.userID,
                token: action.payload.token,
                identity: ID_USER
            }
        default:
            return state;
    }
}