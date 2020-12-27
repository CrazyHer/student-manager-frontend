//export const ROOT = 'https://api.herui.club/koa2'
//export const ROOT = 'http://localhost:3000';
export const ROOT = '/koa2'

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
 *          identity:String,
 *          userID,
 *          name,
 *          sex,
 *          school,
 *          className,
 *          tel,
 *          degree,
 *          profileURL
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
 * {
 *  code,
 *  message,
 *  data:
 *  [
 *   {
        courseID: '1',
        courseName: '离散数学',
        teacherName: '孔凡玉',
        credit: '3',
        time: '周四',
        address: '五区408',
        capacity: '70',
        remains: '2',
        selected: false
*    },
*     ......
*  ]
* }
 */
export const GET_COURSE_URL = `${ROOT}/getcourse`;

/**
 * 提交选课
 * @POST
 * @传入
 * {
 *  data:[{courseID:"2"},......]
 * }
 * @返回
 * {
 *  code:Number,
 *  message:String
 * }
 */
export const SELECT_COURSE_URL = `${ROOT}/selectcourse`;

/**
 * 查询成绩
 * @GET
 * @返回
 * {
 *      code,
 *      message,
 *      data:[
                {
                courseID: '1',
                courseName: '离散数学',
                credit: '4',
                grade: '95'
                },
 *              ......
 *      ]
 * }
 */
export const GET_GRADE_URL = `${ROOT}/getgrade`;

/**
 * 获取社会成果
 * @GET
 * @返回
 * {
 *      code,
 *      message,
 *      data:
 *      [
                { content: '国家奖学金', audited: false, date: '2022/09', key: 1 },
                { content: '学业二等奖学金', audited: true, date: '2021/09', key: 2 },
                ......
 *      ],
 * }
 */
export const GET_ACVM_URL = `${ROOT}/getacvm`;

/**
 * 删除一项社会成果
 * @POST
 * @传入
 * {
 *      key:Number
 * }
 * @返回
 * {
 *      code,
 *      message
 * }
 */
export const DEL_ACVM_URL = `${ROOT}/delacvm`;

/**
 * 添加一项社会成果
 * @POST
 * @传入
 * {
 *      content,
 *      date
 * }
 * @返回
* {
*      code,
*      message
* }
 */
export const ADD_ACVM_URL = `${ROOT}/addacvm`;