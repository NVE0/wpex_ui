import { GoldOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Divider, Popover, Typography } from 'antd';
import { TableListItem } from './planning';

export function passenger_render(
	node: React.ReactNode,
	element: TableListItem,
	index: number
) {

	const passenger_count = element.passenger?.length;
	const luggage_count = element.passenger?.reduce((acc, cur) => acc + cur.luggage_data.luggage, 0);

	return (
		// Everything is written in small letters, first line is the client name, second line is the passenger
		<>

			<Popover
				trigger={"click"}
				content={element.passenger?.[0].name}
				title="Passenger">
				<div style={{
					cursor: "pointer",
					position: "absolute", left: 0, top: 0, bottom: 0, right: 0, textAlign: "left",
					display: 'flex', justifyContent: 'space-between'
				}}>
					<div style={{ textAlign: "center", margin: 0, padding: 0, maxWidth: "90%" }}>
						<Typography.Text strong ellipsis>
							{element.client?.name.toUpperCase()}
						</Typography.Text>
					</div>
					<div style={{ maxWidth: "15%", display: 'flex', justifyContent: 'start'}}>
						<div style={{ maxWidth: "50%", textAlign: "center" }}><SmileOutlined />{passenger_count}</div>
						<div style={{ maxWidth: "50%", textAlign: "center" }}><GoldOutlined />{luggage_count}</div>
					</div>
				</div>

				<div style={{textAlign:"left"}}>
					{element.passenger?.map((passenger, index) => (
						<Typography.Text>
							{passenger.name}
						</Typography.Text>
					))}
				</div>
			</Popover>

		</>
	);
}
