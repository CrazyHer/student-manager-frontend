import { Button, Form, Input } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom"
import { onLogin } from './login_redux';

const Login = () => {
    let history = useHistory();
    const token = useSelector(state => state.user.token);
    //若已登录，跳转至主页
    useEffect(() => {
        if (token !== '') history.push('/home');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const dispatch = useDispatch();
    let loading = useSelector(state => state.login.loading);
    const onFinish = (e) => {
        console.log(e);
        dispatch(onLogin(e));
    };
    return (
        <div>
            <Form onFinish={onFinish} initialValues={{ autoLogin: false }} >
                <Form.Item label='学号' name='userID'
                    validateFirst
                    rules={[{ required: true, message: '请输入学号！' }, { type: 'integer', transform: (v) => Number(v), message: '学号无效！' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label='密码' name='password'
                    rules={[{ required: true, message: '请输入密码！' }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item name='autoLogin' valuePropName='checked' ><Checkbox>自动登录</Checkbox></Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit' loading={loading}>登录</Button>
                    <br />
                    <Link to='/register'>注册</Link>
                    {
                        /**
                            <Link to='/login-admin'>管理员登录</Link>
                         */
                    }
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login;