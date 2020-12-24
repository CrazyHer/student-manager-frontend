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
 *  name,
 *  userID,
 *  className,
 *  password,
 *  school,
 *  tel
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

/**
 * 获取用户信息
 * @GET
 * @返回
 * {
 *  code:Number,
 *  message:String,
 *  data:{
 *          name:String,
 *          identity:String,
 *          userID,
 *          name,
 *          sex,
 *          school,
 *          className,
 *          tel,
 *          degree,
 *       }
 * }
 */
export const GET_USER_INFO_URL = `${ROOT}/getuserinfo`;

/**
 * 修改用户信息
 * @POST
 * @传入
 * {
 *  className,
 *  degree,
 *  school,
 *  sex,
 *  tel,
 *  profileURL
 * }
 * @返回
 * {
 *  code:Number,
 *  message:String
 * }
 */
export const EDIT_USER_INFO_URL = `${ROOT}/edituserinfo`;

/**
 * 获取课程信息
 * @GET
 * @返回
 * [
 *  {
        courseID: '1',
        courseName: '离散数学',
        teacherName: '孔凡玉',
        credit: '3',
        time: '周四',
        address: '五区408',
        capacity: '70',
        remains: '2',
        selected: false
*   },
*     ......
*  ]
 */
export const GET_COURSE_URL = `${ROOT}/getcourse`;
/**
 * 提交选课
 * @POST
 * @传入
 * [{courseID:"2"},......]
 * @返回
 * {
 *  code:Number,
 *  message:String
 * }
 */
export const SELECT_COURSE_URL = `${ROOT}/selectcourse`;