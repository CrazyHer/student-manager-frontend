import React, { Component, useEffect } from "react";
import { Table, Button, Modal, message, Spin, Input, Space } from "antd";
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from '@ant-design/icons'
import { getCourse, selectCourse } from "./course_redux";
import './course.css'
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
            searchText: '',
            searchedColumn: ''
        };
    }

    //antd表格搜索功能实现
    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`搜索 ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        搜索
              </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        重置
              </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                    text
                ),
    });
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

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
                onOk: (close) => {
                    this.props.onSubmit(this.state.selectedRowKeys.map(value => ({ courseID: value })));
                    //提交后state归零
                    this.setState({
                        selectedRowKeys: [],
                        searchText: '',
                        searchedColumn: ''
                    }, close());
                }
                ,
            });
        } else
            message.info("您还没有选课哦！");
    };

    render() {
        let rowSelection = {
            onChange: (selectedRowKeys) => {
                this.setState({ selectedRowKeys: selectedRowKeys });
            },
            selectedRowKeys: this.state.selectedRowKeys,
            columnTitle: "选课",
            renderCell: (checked, record, index, originNode) => {
                if (record.selected) return "已选";
                return originNode;
            }
        };

        const columns = [
            {
                title: "课程号",
                dataIndex: "courseID",
                align: 'center',
                ...this.getColumnSearchProps('courseID'),
            },
            {
                title: "课程名",
                dataIndex: "courseName",
                align: 'center',
                ...this.getColumnSearchProps('courseName'),
            },
            {
                title: "授课教师",
                dataIndex: "teacherName",
                align: 'center',
                ...this.getColumnSearchProps('teacherName'),
            },
            {
                title: "学分",
                dataIndex: "credit",
                align: 'center',
                sorter: (a, b) => a.credit - b.credit,
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
                sorter: (a, b) => a.capacity - b.capacity,
                align: 'center',

            },
            {
                title: "课程剩余容量",
                dataIndex: "remains",
                sorter: (a, b) => a.remains - b.remains,
                align: 'center',

            }
        ];
        return (
            <div>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={this.props.data}
                    pagination={{ hideOnSinglePage: true }}
                />
                <div className="stats_btn">
                    <Button className="course-btn" type="primary" onClick={this.onSubmit}>
                        提交选课
                    </Button>
                </div>
            </div>
        );
    }
}
