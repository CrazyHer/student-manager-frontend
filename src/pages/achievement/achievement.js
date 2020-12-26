import React, { useEffect, useState } from 'react'
import { List, Typography, Divider, Button, Modal, Form, Input, DatePicker, Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'antd/lib/form/Form';
import moment from 'moment';
import { addAchievement, delAchievement, getAchievement } from './achievement_redux';

const Achievement = () => {
    let { data, loading } = useSelector(state => state.achievement);
    let [isModalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAchievement());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const onDelete = (key) => {
        dispatch(delAchievement(key));
    }

    const onSubmit = (e) => {
        //将日期直接转换成字符串形式，这里没有转成时间戳，要转也可以转
        //e.date=e.date.valueOf();
        e.date = moment(e.date).format("YYYY/MM").toString();
        dispatch(addAchievement(e))
        setModalVisible(false);
    }

    const onCancle = () => {
        setModalVisible(false);
    }

    let [form] = useForm();
    return (
        <div>
            <Divider orientation='left'>学生社会成果</Divider>
            <Spin spinning={loading}>
                <List
                    bordered
                    dataSource={data}
                    renderItem={item => {
                        return (
                            <List.Item>
                                <div>
                                    {!item.audited && <Typography.Text mark>[未审核]</Typography.Text>} {item.content}
                                </div>
                                <div>
                                    {item.date}
                                    <Button type='link' onClick={() => onDelete(item.key)}>删除</Button>
                                </div>
                            </List.Item>
                        )
                    }}
                />

                <Button type='primary' onClick={() => setModalVisible(true)}>添加社会成果</Button>
            </Spin>

            <Modal title='添加社会成果' visible={isModalVisible} footer={null} onCancel={onCancle}>
                <Form form={form} onFinish={onSubmit}>
                    <Form.Item name='content' label="社会成果" rules={[{ required: true, message: "请填写社会成果！" }]}><Input /></Form.Item>
                    <Form.Item name="date" label="获得时间" rules={[{ required: true, message: "请选择获得时间！" }]}>
                        <DatePicker
                            inputReadOnly={true}
                            picker='month'
                            allowClear={false}
                            onChange={(value) => { form.setFieldsValue({ date: value }) }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' >提交</Button>
                        <Button type='default' onClick={onCancle}>取消</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Achievement;