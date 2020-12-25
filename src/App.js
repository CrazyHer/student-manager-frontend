import { Spin } from 'antd';
import React, { lazy, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './App.css';
import Layout from './components/layout';
//根据路由实现页面组件懒加载
const Login = lazy(() => import('./pages/login/login'))
const LoginAdmin = lazy(() => import('./pages/login-admin/login-admin'))
const Register = lazy(() => import('./pages/register/register'))
const Userinfo = lazy(() => import('./pages/userinfo/userinfo'))
const Course = lazy(() => import('./pages/course/course'))
const Grade = lazy(() => import('./pages/grade/grade'))
const Achievement = lazy(() => import('./pages/achievement/achievement'))

function App() {
  let location = useLocation().pathname;
  let history = useHistory();
  let token = useSelector(state => state.user.token);

  useEffect(() => {
    //未登录状态访问除登录、注册、管理员登录页面以外的页面，均跳转到登录页面进行登录
    if (location !== '/login' && location !== '/login-admin' && location !== '/register' && token === '') {
      history.push('/login')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <div className="App">
      <Layout>
        <Suspense fallback={<Spin spinning={true} style={{ top: '50%', position: 'absolute' }} />}>
          <Switch>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/login-admin'>
              <LoginAdmin />
            </Route>
            <Route exact path='/register'>
              <Register />
            </Route>
            <Route exact path='/home'>
              主页
          </Route>
            <Route exact path='/userinfo'>
              <Userinfo />
            </Route>
            <Route exact path='/course'>
              <Course />
            </Route>
            <Route exact path='/grade'>
              <Grade />
            </Route>
            <Route exact path='/achievement'>
              <Achievement />
            </Route>

            <Route exact path='/student-admin'>
              学生管理
          </Route>
            <Route exact path='/course-admin'>
              课程信息管理
          </Route>
            <Route exact path='/grade-admin'>
              课程成绩管理
          </Route>
            <Route exact path='/achievement-admin'>
              社会成果审核
          </Route>
            <Redirect from='/' to='/home' />
          </Switch>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
