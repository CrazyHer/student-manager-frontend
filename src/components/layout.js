import React from 'react';
import { useLocation } from "react-router-dom";
import { Layout } from 'antd'

const _Layout = ({ children }) => {
    let location = useLocation().pathname;
    //若为登录注册页面，不显示布局；否则采用顶部-侧边布局
    if (location === '/login' || location === '/login-admin' || location === '/register') {
        return children;
    } else {
        return (
            <Layout>
                <Layout.Header>
                    顶部栏
                </Layout.Header>
                <Layout>
                    <Layout.Sider theme='light'>
                        侧边导航菜单
                    </Layout.Sider>
                    <Layout>
                        <Layout.Content>
                            {children}
                        </Layout.Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}
export default _Layout;