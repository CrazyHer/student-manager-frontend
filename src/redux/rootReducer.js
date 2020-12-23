import { combineReducers } from "redux";
import user from './user/user'
import login from './login/login'
import register from './register/register'
export default combineReducers({ user, login, register });