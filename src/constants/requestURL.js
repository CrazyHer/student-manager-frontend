export const ROOT = 'https://api.herui.club/koa2'

/**
 * 登录接口
 * @POST
 * @传入
 * {
 *  userID:String,
 *  password:String
 * }
 * @返回
 * {
 *  code:Number,
 *  message:String,
 *  data:{
 *          token:String
 *       }      
 * }
 */
export const LOGIN_URL = `${ROOT}/login`;
export const LOGIN_ADMIN_URL = `${ROOT}/login-admin`
/**
 * 注册接口
 * @POST
 * @传入
 * {
 *  userID:String,
 *  password:String
 * }
 * @返回
 * {
 *  code:Number,
 *  message:String,
 *  data:{
 *          token:String
 *       }      
 * }
 */
export const REGISTER_URL = `${ROOT}/register`;

