import { combineReducers } from "redux";
import user from './user/user'
import login from './login/login'
import register from './register/register'
import course from './course/course'
export default combineReducers({ user, login, register, course });