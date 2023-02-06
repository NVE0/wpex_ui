import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

import { Button, DatePicker, Popover, Steps, Tag } from 'antd';
import React, { useEffect } from 'react';

import { locale_pagination, locale_table } from '../../../Config/localization';
import { partner_render } from './col_partner';
import { route_render } from './col_route';
import {
	DateSelectorX,
	TimeSelector_EndDate as TsEd,
	TimeSelector_StartDate as TsSd,
} from './col_time';

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
	partner: {
		name: string;
	}
	driverId: number;
	carId: number;
	folderId: number;
	operatorId: number;
};
const tableListDataSource: TableListItem[] = [];

export default () => {
	const [tableListDataSource, setTableListDataSource] = React.useState<
		TableListItem[]
	>([]);

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
		return <div>ok</div>;
	};

	const columns: ProColumns<TableListItem>[] = [
		{
			title: 'Date and time',
			filters: true,
			width: 250,
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
			}) => {
				return (
					<div style={{ margin: 10, padding: 10 }}>
						Date :{' '}
						<DatePicker
							style={{ width: '100%' }}
							onChange={(x, dateString) => {
								const from_midnight = new Date(
									dateString + 'T00:00:00'
								);
								const to_midnight = new Date(
									dateString + 'T23:59:59'
								);
								setSelectedKeys([
									from_midnight.getTime(),
									to_midnight.getTime(),
								]);
								confirm();
							}}
							picker="date"
						/>
						<hr />
						Range :{' '}
						<RangePicker style={{ width: '100%' }} showTime />
					</div>
				);
			},
			onFilter: (value, record) => {
				console.log('value', value);
				console.log('record', record);
				return true;
			},
			sorter: (a, b) => {
				const datetime_a = new Date(a.start_date);
				const datetime_b = new Date(b.start_date);
				return datetime_a.getTime() - datetime_b.getTime();
			},
			render: (node, element, index) => {
				const datetime = new Date(element.start_date);
				return (
					<>
						<DateSelectorX
							onDone={() =>
								setTableListDataSource([...tableListDataSource])
							}
							element={element}
							index={index}
						/>
						<TsSd
							onDone={() =>
								setTableListDataSource([...tableListDataSource])
							}
							element={element}
							index={index}
						/>
						<TsEd
							onDone={() =>
								setTableListDataSource([...tableListDataSource])
							}
							element={element}
							index={index}
						/>
					</>
				);
			},
		},
		{
			title: 'Partner',
			align: 'center',
			dataIndex: 'partnerId',
			render: partner_render
		},
		{
			title: 'Route',
			dataIndex: 'location_steps',
			align: 'center',
			render: route_render,
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
		// fetch("http://localhost:3000/api/missions/all")
		//     .then((response) => response.json())
		//     .then((data) => { setTableListDataSource(data) })
		//     .then(() => setLoading(false))

		// Mock data
		const data: TableListItem[] = [];
		for (let i = 0; i < 46; i++) {
			data.push({
				id: i,
				carId: i,
				start_date: new Date().toString(),
				end_date: new Date().toString(),
				driverId: i,
				folderId: i,
				location_steps: ['Paris', 'Lyon', 'Marseille'],
				operatorId: i,
				partnerId: i,
				partner: {
					name: 'Partner ' + i,
				}
			});
		}
		setTableListDataSource(data);
		setLoading(false);
	}, []);

	return (
		<ProTable<TableListItem>
			columns={columns}
			dataSource={tableListDataSource}
			loading={loading}
			search={false}
			onChange={(_, _filter, _sorter) => {
				console.log('onChange', _);
				console.log('_filter', _filter);
				console.log('_sorter', _sorter);
			}}
			rowKey="id"
			pagination={{
				showQuickJumper: true,
				locale: locale_pagination,
			}}
			expandable={{
				expandedRowRender,
				onExpand: (expanded, record) => {
					// console.log(expanded, record);
				},
			}}
			dateFormatter="string"
			sticky={{ offsetHeader: 55, offsetScroll: 32, getContainer: () => document.getElementById('root') || document.body }}
            
			// headerTitle="HeaderTitle"
            scroll={{ x: 'max-content'} }
            defaultSize='large'
			showHeader={true}
			size="large"
			options={{
				fullScreen: false,
				reload: false,
				setting: false,
                density: false,
                search: false
			}}
			locale={locale_table}
			toolBarRender={() => [
				// <Button key="show" onClick={() => {
				//     // update first element of tableListDataSource to test the update
				//     tableListDataSource[0].start_date = new Date().toString();
				//     setTableListDataSource([...tableListDataSource]);
				// }}>SHOW</Button>,
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
