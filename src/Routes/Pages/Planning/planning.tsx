import { ProColumns, useToken } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

import { Button, DatePicker, Popover, Steps, Tag } from 'antd';
import React, { useEffect } from 'react';

import { locale_pagination, locale_table } from '../../../Config/localization';
import { partner_render } from './col_partner';
import { passenger_render } from './col_passenger';
import { route_render } from './col_route';
import { status_render } from './col_status';
import {
	DateSelectorX,
	TimeSelector_EndDate as TsEd,
	TimeSelector_StartDate as TsSd,
} from './col_time';
import { type_render } from './col_type';

import "./style.css"

const { RangePicker } = DatePicker;

export type Status = {
	color: string;
	text: string;
};

export type TableListItem = {
	id: number;
	type: string;
	start_date: string;
	end_date: string;
	location_steps: string[];
	partnerId: number;
	partner: {
		name: string;
	};
	client: {
		id: number;
		name: string;
	}
	passenger?: {
        id: number;
		name: string;

        adults: number;
        children: number;
        babies: number;

        passenger_data: {
            phone: string;
            email: string;
            language: string;
        }
        luggage_data: {
            luggage: number;
            special_luggage: number;

            handicap: boolean;

            child_seat: number;
            booster_seat: number;
            baby_seat: number;
        },
        preferences: {
            sms: boolean;
            email: boolean;
        }
	}[];
	driverId: number;
	carId: number;
	folderId: number;
	operatorId: number;

    status: string;
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
			title: 'T',
			dataIndex: 'type',
			align: 'center',
			width: 1,
			render: type_render,
		},
		{
			title: 'Date et Heure',
			filters: true,
			width: 250,
			align: 'center',
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
			title: 'Client / Passager',
			dataIndex: 'passenger',
			align: 'center',
            width: 200,
			render: passenger_render,
		},
		{
			title: 'Route',
			dataIndex: 'location_steps',
			align: 'center',
			render: route_render,
		},
		{
			title: 'Conducteur',
			align: 'center',
			dataIndex: 'partnerId',
			width: 120,
			render: partner_render
		},
        {
			title: 'S',
			align: 'center',
			dataIndex: 'status',
			width: 65,
			render: status_render
		},
	];

	const [loading, setLoading] = React.useState(true);

	useEffect(() => {
		// fetch("http://localhost:3000/api/missions/all")
		//     .then((response) => response.json())
		//     .then((data) => { setTableListDataSource(data) })
		//     .then(() => setLoading(false))

		// Mock data ==================================================================================== MOCK DATA
		const data: TableListItem[] = [];
		function addDays(date: Date, days: number) {
			var result = new Date(date);
			result.setDate(result.getDate() + days);
			return result;
		  }
		for (let i = 0; i < 46; i++) {
			data.push({
				id: i,
				type: 'TA',
				carId: i,
				start_date: addDays(new Date(), i).toString(),
				end_date: new Date().toString(),
				driverId: i,
				folderId: i,
				location_steps: ['Paris', 'Lyon', 'Marseille'],
				operatorId: i,
				partnerId: i,
				partner: {
					name: 'Partner ' + i,
				},
				passenger: [
					{
                        id: i,
						name: 'Passenger ' + i,

                        adults: 1,
                        children: 0,
                        babies: 0,
                        passenger_data: {
                            email: 'aa@test.com',
                            language: 'fr',
                            phone: '0606060606',
                        },

                        luggage_data: {
                            luggage: 1,
                            special_luggage: 1,
                            baby_seat: 1,
                            booster_seat: 0,
                            handicap: false,
                            child_seat: 0,
                        },

                        preferences: {
                            email: true,
                            sms: true,
                        }
                    }
				],
				client: {
					id: i,
					name: 'PENINSULA ' + i,
				},

                status: ""+Math.floor(Math.random() * 10)
			});
		}
		setTableListDataSource(data);
		setLoading(false);
	}, []);

	return (
		<ProTable<TableListItem>
			rowClassName={(_, index) => {

                const is_dark_mode = document.body.classList.contains('ant-pro-dark');
                console.log('is_dark_mode', is_dark_mode)

				if (index % 2 === 0) {
					return 'table-row-light';
				}
				return 'table-row-dark';
			}}
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
            
			headerTitle="Liste des missions du jour"

            scroll={{ x: 'max-content'} }
            defaultSize='large'
			showHeader={true}
			size="large"
			options={{
				fullScreen: true,
				reload: false,
				setting: true,
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
