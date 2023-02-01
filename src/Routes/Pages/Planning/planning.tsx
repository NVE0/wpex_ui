import { DownOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

import { Button, DatePicker, Tabs, Tag } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { Dayjs } from 'dayjs';
import React from 'react';

import { locale_pagination, locale_table } from '../../../Config/localization';

const { RangePicker } = DatePicker;

export type Status = {
    color: string;
    text: string;
};

const statusMap = {
    0: {
        color: 'blue',
        text: 'Bleu',
    },
    1: {
        color: 'green',
        text: 'Vert',
    },
    2: {
        color: 'volcano',
        text: 'Volcan',
    },
    3: {
        color: 'red',
        text: 'Rouge',
    },
    4: {
        color: '',
        text: 'Beuh',
    },
};

export type TableListItem = {
    key: number;
    name: string;
    containers: number;
    creator: string;
    status: Status;
    createdAt: string;
};
const tableListDataSource: TableListItem[] = [];


for (let i = 0; i < 1000; i += 1) {
    const creators = ['A', 'B', 'C', 'D', 'E'];
    tableListDataSource.push({
        key: i,
        name: 'AppName',
        containers: Math.floor(Math.random() * 20),
        creator: creators[Math.floor(Math.random() * creators.length)],
        // @ts-ignore
        status: statusMap[Math.floor(Math.random() * 10) % 5],
        createdAt: '2023-02-01 23:12:00',
    });
}


const expandedRowRender = () => {
    const data = [];
    for (let i = 0; i < 3; i += 1) {
        data.push({
            key: i,
            date: '2023-02-01 23:12:00',
            name: 'This is production name',
            upgradeNum: 'Upgraded: 56',
        });
    }
    return (
        <div>
            ok
        </div>
    );
};

export default () => {


    const [searchText, setSearchText] = React.useState('');
    const [searchedColumn, setSearchedColumn] = React.useState('');

    const columns: ProColumns<TableListItem>[] = [
        {
            title: 'Name',
            width: 120,
            dataIndex: 'name',
            render: (node, element, index) => <a>{element.name} !</a>,
            children: [
                {
                    title: 'A',
                    width: 60,
                    dataIndex: 'A',
                    render: (node, element, index) => <a>{element.name} !</a>,
                    align: 'center',
                },
                {
                    title: 'B',
                    width: 60,
                    dataIndex: 'B',
                    render: (node, element, index) => "ok",
                    align: 'center',
                }
            ]
        },
        {
            title: 'Status',
            width: 120,
            dataIndex: 'status',
            render: (_, record) => <Tag color={record.status.color}>{record.status.text}</Tag>,
            filterMode: 'tree',
        },
        {
            title: 'Created At',
            width: 120,
            dataIndex: 'createdAt',
            valueType: 'dateTime',
            //sorter: (a, b) => a.createdAt - b.createdAt,
            render: (dom, entity) => {
                return <a>{dom}</a>;
            },
            filterSearch: true,
            filters: true,
            onFilter(value, record) {
                return record.createdAt.toString().includes(value as string);
            },
            filterDropdown(props) {
                return (
                    <div style={{ margin: 10, padding: 10 }}>
                        Date : <DatePicker style={{ width: '100%' }} onChange={(x,dateString) => {
                            // When the user picks a date, change the filter value
                            
                        }} picker="date" />
                        <hr />
                        Range : <RangePicker style={{ width: '100%' }} showTime />
                    </div>
                );
            },
        },
        {
            title: 'Containers',
            width: 120,
            dataIndex: 'containers',
            align: 'right',
            sorter: (a, b) => a.containers - b.containers,
            
        },

        {
            title: 'Creator',
            width: 120,
            dataIndex: 'creator',
            valueEnum: {
                all: { text: 'ALL' },
                A: { text: 'A' },
                B: { text: 'B' },
                C: { text: 'C' },
                D: { text: 'D' },
                E: { text: 'E' },
            },
        },
    ];

    return (
        <ProTable<TableListItem>
            columns={columns}
            request={(params, sorter, filter) => {
                // 表单搜索项会从 params 传入，传递给后端接口。
                console.log({ params, sorter, filter });
                return Promise.resolve({
                    data: tableListDataSource,
                    success: true,
                });
            }}
            rowKey="key"
            pagination={{
                showQuickJumper: true,
                locale: locale_pagination
            }}
            expandable={{ expandedRowRender }}
            search={false}
            dateFormatter="string"
            headerTitle="HeaderTitle"
            size='large'
            options={{
                fullScreen: true,
                reload: true,
                setting: true,
            }}
            locale={locale_table}
            toolBarRender={() => [
                <Button key="show">查看日志</Button>,
                <Button key="out">
                    导出数据
                    <DownOutlined />
                </Button>,
                <Button key="primary" type="primary">
                    创建应用
                </Button>,
            ]}
        />
    );
};