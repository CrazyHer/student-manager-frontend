import { Button, Descriptions, Divider, Form, Input, message, Select, Upload } from 'antd'
import Avatar from 'antd/lib/avatar/avatar';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onSubmitEdit } from './userinfo_redux';
import { UserOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'
import { useForm } from 'antd/lib/form/Form';
import './userinfo.css'

//上传头像时，将头像转成Base64，在后面放进表单里再一起提交给服务器保存
const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
const UserInfo = () => {
    let { userID, name, sex, school, className, tel, degree, loading, profileURL } = useSelector(state => state.user);
    let [editing, setEditing] = useState(false);
    const dispatch = useDispatch();
    const [form] = useForm();
    const onClick = () => setEditing(true);

    const onSubmit = async (e) => {
        await dispatch(onSubmitEdit(e));
        setEditing(false);
    }

    const onCancle = () => {
        setEditing(false);
    }

    let [imgsrc, setImgsrc] = useState(profileURL);
    const handleChange = (file) => {
        if (file.size / 1024 / 1024 > 1) {
            message.info("图片必须小于1m！")
            return false;
        }
        getBase64(file).then(src => {
            setImgsrc(src);
            form.setFieldsValue({ profileURL: src });
        });
        return false;
    }

    return (
        <div>
            {editing ?
                <Form onFinish={onSubmit}
                    form={form}
                    initialValues={{ userID, name, sex, school, className, tel, degree, profileURL }}
                >
                    <div>
                        <p style={{ float: 'left' }}>个人头像：</p>
                        <ImgCrop grid>
                            <Upload
                                beforeUpload={handleChange}
                                listType="picture-card"
                                showUploadList={false}
                            >
                                {imgsrc ? <img width='128px' height='128px' src={imgsrc} alt="图片预览" /> : '+ 上传头像'}
                            </Upload>
                        </ImgCrop>

                    </div>

                    <Form.Item label='账号' name='userID' required><Input disabled /></Form.Item>
                    <Form.Item label='姓名' name='name' required><Input disabled /></Form.Item>
                    <Form.Item label='头像' name='profileURL' hidden />

                    <Form.Item label='性别' name='sex' required>
                        <Select>
                            <Select.Option value='男'>男</Select.Option>
                            <Select.Option value='女'>女</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label='身份' name='degree' required>
                        <Select>
                            <Select.Option value='本科生'>本科生</Select.Option>
                            <Select.Option value='硕士研究生'>硕士研究生</Select.Option>
                            <Select.Option value='博士研究生'>博士研究生</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label='所在学院' name='school' required>
                        <Select>
                            <Select.Option value='软件学院'>软件学院</Select.Option>
                            <Select.Option value='微电子学院'>微电子学院</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label='所在班级' name='className' required><Input /></Form.Item>

                    <Form.Item label='联系电话' name='tel'
                        hasFeedback
                        validateFirst
                        rules={[{ required: true, message: '请输入电话号码' }, { transform: (v) => Number(v), type: 'number', message: '电话号码必须为有效数字' }, { type: 'string', len: 11, message: '电话号码必须为11位' }]}
                    ><Input type='tel' /></Form.Item>

                    <Divider />

                    <Form.Item>
                        <Button className="userinfo-btn" type='primary' htmlType='submit' loading={loading}>提交修改</Button>
                        <Button className="userinfo-btn" type='default' onClick={onCancle} disabled={loading}>取消</Button>
                    </Form.Item>

                </Form>
                :
                <Descriptions
                    title='基本信息维护'
                    bordered
                    extra={
                        <Button type='primary' onClick={onClick}>编辑</Button>
                    }
                    column={{ xxl: 4, xl: 3, lg: 3, sm: 2, xs: 1 }}
                >
                    <Descriptions.Item label='头像'><Avatar shape='square' size={64} icon={profileURL ? <img src={profileURL} alt='头像' /> : <UserOutlined />} /></Descriptions.Item>
                    <Descriptions.Item label='账号'>{userID}</Descriptions.Item>
                    <Descriptions.Item label='姓名'>{name}</Descriptions.Item>
                    <Descriptions.Item label='性别'>{sex}</Descriptions.Item>
                    <Descriptions.Item label='身份'>{degree}</Descriptions.Item>
                    <Descriptions.Item label='所在学院'>{school}</Descriptions.Item>
                    <Descriptions.Item label='所在班级'>{className}</Descriptions.Item>
                    <Descriptions.Item label='联系电话'>{tel}</Descriptions.Item>
                </Descriptions>
            }

        </div>
    )
}
export default UserInfo;