import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

import { Button, DatePicker, Popover, Steps, Tag } from 'antd';
import React, { useEffect } from 'react';

import { locale_pagination, locale_table } from '../../../Config/localization';
import { route_render } from './col_route';
import { TimeSelector_EndDate as TsEd, TimeSelector_StartDate as TsSd } from './col_time';

const { RangePicker } = DatePicker;

export type Status = {
    color: string;
    text: string;
};

export type TableListItem = {
    id: number;
    start_date: string;
    end_date: string;
    location_steps: string[];
    partnerId: number;
    driverId: number;
    carId: number;
    folderId: number;
    operatorId: number;
};
const tableListDataSource: TableListItem[] = [];

export default () => {

    const [tableListDataSource, setTableListDataSource] = React.useState<TableListItem[]>([]);

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

    const columns: ProColumns<TableListItem>[] = [
        {
            title: 'Date and time',
            sorter: true,
            filters: true,
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => {
                return (
                    <div style={{ margin: 10, padding: 10 }}>
                        Date : <DatePicker style={{ width: '100%' }} onChange={(x, dateString) => {
                            const from_midnight = new Date(dateString + 'T00:00:00');
                            const to_midnight = new Date(dateString + 'T23:59:59');
                            setSelectedKeys([from_midnight.getTime(), to_midnight.getTime()]);
                            confirm();
                        }} picker="date" />
                        <hr />
                        Range : <RangePicker style={{ width: '100%' }} showTime />
                    </div>
                );
            },
            onFilter: (value, record) => {
                console.log('value', value);
                console.log('record', record);
                return true;
            },
            children: [
                {
                    title: 'D',
                    width: 20,
                    dataIndex: 'start_date',
                    render: (node, element, index) => {
                        const datetime = new Date(element.start_date);
                        // return the date in the format you want
                        return (
                            <div tabIndex={1}>
                                {datetime.toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'short'
                                })}
                            </div>)
                    },
                    sorter: (a, b) => {
                        const datetime_a = new Date(a.start_date);
                        const datetime_b = new Date(b.start_date);
                        return datetime_a.getTime() - datetime_b.getTime();
                    }
                },
                {
                    title: 'S',
                    width: 20,
                    dataIndex: 'start_date',
                    render: (node, element, index) => {
                        return (
                            <TsSd
                                onDone={() => setTableListDataSource([...tableListDataSource])}
                                element={element} />
                        )
                    },
                    filterMode: 'tree',
                    filterSearch: true,
                },
                {
                    title: 'S',
                    width: 20,
                    dataIndex: 'start_date',
                    render: (node, element, index) => {
                        return (
                            <TsEd
                                onDone={() => setTableListDataSource([...tableListDataSource])}
                                element={element} />
                        )
                    },
                    filterMode: 'tree',
                },
            ]
        },

        {
            title: 'Route',
            width: 120,
            dataIndex: 'location_steps',
            align: 'center',
            render: route_render
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
                return record.start_date.toString().includes(value as string);
            },
            filterDropdown(props) {
                return (
                    <div style={{ margin: 10, padding: 10 }}>
                        Date : <DatePicker open={true} style={{ width: '100%' }} onChange={(x, dateString) => {
                            const from_midnight = new Date(dateString + 'T00:00:00');
                            const to_midnight = new Date(dateString + 'T23:59:59');
                            props.setSelectedKeys([from_midnight.getTime(), to_midnight.getTime()]);
                            props.confirm();
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
            //sorter: (a, b) => a.containers - b.containers,

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

    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/api/missions/all")
            .then((response) => response.json())
            .then((data) => { setTableListDataSource(data) })
            .then(() => setLoading(false))
    }, [])

    return (
        <ProTable<TableListItem>
            columns={columns}

            dataSource={tableListDataSource}
            loading={loading}



            onChange={(_, _filter, _sorter) => {
                console.log('onChange', _);
                console.log('_filter', _filter);
                console.log('_sorter', _sorter);
            }}

            rowKey="id"
            pagination={{
                showQuickJumper: true,
                locale: locale_pagination
            }}
            expandable={{
                expandedRowRender,
                onExpand: (expanded, record) => {
                    // console.log(expanded, record);
                },
            }}
            dateFormatter="string"
            // sticky={true}
            // headerTitle="HeaderTitle"
            size='large'
            options={{
                fullScreen: true,
                reload: true,
                setting: true,
            }}
            locale={locale_table}
            toolBarRender={() => [
                <Button key="show" onClick={() => {
                    // update first element of tableListDataSource to test the update
                    tableListDataSource[0].start_date = new Date().toString();
                    setTableListDataSource([...tableListDataSource]);
                }}>SHOW</Button>,
                // <Button key="out">
                //     OUT
                //     <DownOutlined />
                // </Button>,
                // <Button key="primary" type="primary">
                //     PRIM
                // </Button>,
            ]}
        />
    );
};