import { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

import { Button, DatePicker, Popover, Steps, Tag } from 'antd';
import { truncate } from 'fs';
import React, { useEffect } from 'react';

import { locale_pagination, locale_table } from '../../../Config/localization';
import Faker_Create_User from '../../../utils/faker';
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

export type PlanningData = {
	id: number;
	type: string;
	start_date?: Date;
	end_date?: Date;
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
	driver?: {
		first_name: string;
		last_name: string;
	};
	carId: number;
	folderId: number;
	operatorId: number;

    status: string;
};
const tableListDataSource: PlanningData[] = [];

//@ts-ignore
export default () => {
	const [tableListDataSource, setTableListDataSource] = React.useState<
		PlanningData[]
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

	const columns: ProColumns<PlanningData>[] = [
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
			filterSearch:true,
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
				close,
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
									new Date(dateString + "T12:00:00").getTime(),
									from_midnight.getTime(),
									to_midnight.getTime(),
								]);
								confirm();
							}}
							picker="date"
						/>
						<hr />
						Range :{' '}
						<RangePicker
							style={{ width: '100%' }}
							showTime

							onChange={(x, dateString) => {

								const from_date = new Date(dateString[0]);
								const to_date = new Date(dateString[1]);

								setSelectedKeys([
									from_date.getTime(),
									to_date.getTime(),
								]);

								confirm();

							}}
							
						/>
					</div>
				);
			},
			onFilter: (value, record : PlanningData) => {
				console.log({v: new Date(value as string)});
				return true;
			},
			sorter: (a, b) => {
				if(a.start_date && b.start_date)
					return b.start_date.getTime() - a.start_date.getTime();
				else
					return 0;
			},
			render: (node, element, index) => {
				const datetime = element.start_date;
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
			width: 350,
			render: route_render,
		},
		{
			title: 'Conducteur',
			align: 'center',
			dataIndex: 'partnerId',
			width: 220,
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
		const data: PlanningData[] = [];
		function addDays(date: Date, days: number) {
			var result = new Date(date);
			result.setDate(result.getDate() + days);
			return result;
		  }
		for (let i = 0; i < 46; i++) {

			const faker_chauffeur = Faker_Create_User();
			const faker_passenger = Faker_Create_User();

			data.push({
				id: i,
				type: 'TA',
				carId: i,
				start_date: addDays(new Date(), i),
				end_date: new Date(),
				driverId: ( (i%2==0) ? i : 0 ),
				driver: ( (i%2==0) ? { first_name: faker_chauffeur.firstName, last_name: faker_chauffeur.lastName } : undefined ),
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
						name: faker_passenger.firstName + ' ' + faker_passenger.lastName,

                        adults: 1,
                        children: 0,
                        babies: 0,
                        passenger_data: {
                            email: faker_passenger.email,
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
					id: 1,
					name: 'PENINSULA',
				},

                status: ""+Math.floor(Math.random() * 10)
			});

		}
		setTableListDataSource(data);
		setLoading(false);
	}, []);

	return (
		<ProTable<PlanningData>
			rowClassName={(_, index) => {

                const is_dark_mode = document.body.classList.contains('ant-pro-dark');
                //console.log('is_dark_mode', is_dark_mode)

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
			sticky={{ offsetHeader: 55, offsetScroll: 32, getContainer: () => document.getElementsByClassName('ant-pro-page-container-children-content')[0] as HTMLElement || document.body }}
            
			headerTitle="Liste des missions du jour"

            scroll={{ x: 'max-content'} }
            defaultSize='large'
			showHeader={true}
			size="large"
			options={{
				fullScreen: true,
				reload: true,
				setting: true,
                density: false,
                search: true	
			}}
			locale={locale_table}
			toolBarRender={() => [
				// <Button key="show" onClick={() => {
				//     // update first element of tableListDataSource to test the update
				//     tableListDataSource[0].start_date = new Date().toString();
				//     setTableListDataSource([...tableListDataSource]);
				// }}>SHOW</Button>,
				<Button key="add" type="primary" onClick={() => {
					// add new element to tableListDataSource to test the update
					const new_element : PlanningData = {
						id: tableListDataSource.length,
						type: 'TA',
						carId: tableListDataSource.length,
						start_date: /* first of january */ new Date(new Date().getFullYear(), 0, 1),
						end_date: new Date(),
						driverId: tableListDataSource.length,
						driver: undefined,
						folderId: tableListDataSource.length,
						location_steps: ['Paris', 'Lyon', 'Marseille'],
						operatorId: tableListDataSource.length,
						partnerId: tableListDataSource.length,
						partner: {
							name: 'Partner ' + tableListDataSource.length,
						},
						passenger: [
							{
								id: 0,
								name: 'Passenger ' + tableListDataSource.length,
								adults: 1,
								children: 0,
								babies: 0,
								passenger_data: {
									email: '',
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
							id: 1,
							name: 'PENINSULA',
						},
						status: '0'
					};
					setTableListDataSource([...tableListDataSource, new_element]);
				}}>Ajouter</Button>,

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
