import React, { useEffect } from 'react'
import { Table, Input, Button, Space, Spin } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { getGrade } from './grade_redux'

const Grade = () => {
    let { data, loading } = useSelector(state => state.grade);
    data = data.map((value) => ({ ...value, key: value.courseID }));
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGrade())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div>
            <Spin spinning={loading}>
                <GradeTable data={data} />
            </Spin>
        </div>
    )
}

export default Grade;

//封装成绩表格
class GradeTable extends React.Component {
    constructor(props = { data: [] }) {
        super();
        this.state = {
            searchText: '',
            searchedColumn: ''
        }
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

    render() {
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
                title: "学分",
                dataIndex: "credit",
                align: 'center',
                sorter: (a, b) => a.credit - b.credit,
            },
            {
                title: '成绩',
                dataIndex: 'grade',
                align: 'center',
                sorter: (a, b) => a.grade - b.grade
            }
        ];
        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={this.props.data}
                    pagination={{ hideOnSinglePage: true }}
                />
            </div>
        )
    }
}

