import { combineReducers } from "redux";
import user from './user/user'
import login from './login/login'
import register from './register/register'
import course from './course/course'
import grade from './grade/grade'
import achievement from './achievement/achievement'
export default combineReducers({ user, login, register, course, grade, achievement });