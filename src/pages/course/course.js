import React, { Component, useEffect } from "react";
import { Table, Button, Modal, message, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCourse, selectCourse } from "./course_redux";

const Course = () => {
    let { data, loading } = useSelector(state => state.course);
    data = data.map((value) => ({ ...value, key: value.courseID }));
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCourse());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const onSubmit = (selectedRowKeys) => {
        dispatch(selectCourse(selectedRowKeys));
    };
    return (
        <div>
            <Spin spinning={loading}>
                <SelectableTable data={data} onSubmit={onSubmit} />
            </Spin>
        </div>
    )
}
export default Course;

//封装好的多选表格，接收两个参数：数组类型的data课表，以及选课提交的回调函数，回调函数参数是选中的课程号数组
class SelectableTable extends Component {
    constructor(props = { data: [], onSubmit: (selectedRowKeys) => { } }) {
        super();
        this.state = {
            selectedRowKeys: [],
        };
    }

    columns = [
        {
            title: "课程号",
            dataIndex: "courseID",
            align: 'center',
        },
        {
            title: "课程名",
            dataIndex: "courseName",
            align: 'center',
        },
        {
            title: "授课教师",
            dataIndex: "teacherName",
            align: 'center',
        },
        {
            title: "学分",
            dataIndex: "credit",
            align: 'center',
            sorter: (a, b) => a.total - b.total,
        },
        {
            title: "上课时间",
            dataIndex: "time",
            align: 'center',
        },
        {
            title: '上课地点',
            dataIndex: 'address',
            align: 'center',
        },
        {
            title: "课程最大容量",
            dataIndex: "capacity",
            sorter: (a, b) => a.score2 - b.score2,
            align: 'center',

        },
        {
            title: "课程剩余容量",
            dataIndex: "remains",
            sorter: (a, b) => a.score2 - b.score2,
            align: 'center',

        }
    ]

    onSubmit = () => {
        if (this.state.selectedRowKeys.length !== 0) {
            let totalCredit = 0;
            Modal.confirm({
                title: "确认选课?",
                content: (
                    <div>
                        您选了{this.state.selectedRowKeys.length}门课：
                        {this.state.selectedRowKeys.map(value => {
                            let res = [];
                            this.props.data.forEach(element => {
                                if (element.courseID === value) {
                                    res.push(
                                        <p key={element.courseID}>课程号{element.courseID}：{element.courseName}</p>
                                    );
                                    totalCredit += Number(element.credit);
                                    return;
                                }
                            });
                            return res;
                        })}
                            共{totalCredit}学分
                    </div>
                ),
                onOk: (close) => { this.props.onSubmit(this.state.selectedRowKeys.map(value => ({ courseID: value }))); close(); }
                ,
            });
        } else
            message.info("您还没有选课哦！");
    };

    rowSelection = {
        onChange: (selectedRowKeys) => {
            this.setState({ selectedRowKeys: selectedRowKeys });
        },
        columnTitle: "选课",
        renderCell: (checked, record, index, originNode) => {
            if (record.selected) return "已选";
            return originNode;
        }
    };

    render() {
        return (
            <div>
                <Table
                    rowSelection={this.rowSelection}
                    columns={this.columns}
                    dataSource={this.props.data}
                    pagination={{ hideOnSinglePage: true }}
                />
                <div className="stats_btn">
                    <Button type="primary" onClick={() => this.onSubmit()}>
                        提交选课
                    </Button>
                </div>
            </div>
        );
    }
}
