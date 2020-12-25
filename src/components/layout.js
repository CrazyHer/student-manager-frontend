import React, { useEffect } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import { Button, Dropdown, Layout, Menu, Spin } from 'antd'
import logo from '../assets/logo-light.png'
import './layout.css'
import { useDispatch, useSelector } from 'react-redux';
import { ID_USER } from '../redux/user/user';
import { getUserInfo, logOff } from './layout_redux';
import Avatar from 'antd/lib/avatar/avatar';
const _Layout = ({ children }) => {
    let location = useLocation().pathname;
    let history = useHistory();
    let { name, userID, identity, loading, profileURL } = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        //获取用户信息
        dispatch(getUserInfo());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSelect = (e) => {
        history.push(e.key)
    }

    const onLogoff = () => {
        dispatch(logOff());
    }

    const menu = (
        <Menu>
            <Menu.Item><Button onClick={onLogoff} type='text'>退出登录</Button></Menu.Item>
        </Menu>
    )
    //若为登录注册页面，不显示布局；否则采用顶部-侧边布局
    if (location === '/login' || location === '/login-admin' || location === '/register') {
        return children;
    } else {
        return (
            <Layout>
                <Layout.Header className='header'>
                    <div>
                        <Link to='/home'>
                            <img src={logo} alt='山东大学LOGO' width='214px' height='64px' />
                            <h1>学生管理系统</h1>
                        </Link>
                    </div>
                    {loading ? <Spin spinning={true}><h3>--登录中--</h3></Spin> :
                        <Dropdown overlay={menu}>
                            <Link to={location} style={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar style={{ marginRight: '20px' }} shape='circle' size='large' icon={profileURL ? <img alt='头像' src={profileURL} /> : name[0]} />
                                <div className='user-tag'>
                                    <p>{name}</p>
                                    <p>{userID}</p>
                                    <p>{identity === ID_USER ? "学生" : "管理员"}</p>
                                </div>
                            </Link>
                        </Dropdown>
                    }

                </Layout.Header>
                <Layout>
                    <Layout.Sider theme='light'>
                        {identity === ID_USER ? <Menu
                            mode='vertical-left'
                            theme='light'
                            selectedKeys={[location]}
                            style={{ textAlign: 'center' }}
                            onSelect={onSelect}
                        >
                            <Menu.Item key='/userinfo'>基本信息</Menu.Item>
                            <Menu.Item key='/course'>学生选课</Menu.Item>
                            <Menu.Item key='/grade'>学生成绩</Menu.Item>
                            <Menu.Item key='/achievement'>社会成果</Menu.Item>
                        </Menu> :
                            <Menu
                                mode='vertical-left'
                                theme='light'
                                selectedKeys={[location]}
                                style={{ textAlign: 'center' }}
                                onSelect={onSelect}
                            >
                                <Menu.Item key='/student-admin'>学生管理</Menu.Item>
                                <Menu.Item key='/course-admin'>课程信息管理</Menu.Item>
                                <Menu.Item key='/grade-admin'>课程成绩管理</Menu.Item>
                                <Menu.Item key='/achievement-admin'>社会成果审核</Menu.Item>
                            </Menu>
                        }

                    </Layout.Sider>
                    <Layout>
                        <Layout.Content className='content'>
                            {children}
                        </Layout.Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}
export default _Layout;