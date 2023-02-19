import { GoldOutlined, ShoppingOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, MenuProps, Popconfirm, Popover, Tooltip, Typography } from 'antd';
import ContextMenu from '../../../utils/ContextMenu';
import { TableListItem } from './planning';

const { Title } = Typography;

export function passenger_render(
	node: React.ReactNode,
	element: TableListItem,
	index: number
) {

	const passenger_count = element.passenger?.length;
	const luggage_count = element.passenger?.reduce((acc, cur) => acc + cur.luggage_data.luggage, 0);

	const items: MenuProps['items'] = [
		{
			key: '0',
			label: (
				<>
					<Title level={5} style={{ textAlign: "center", color: "rgba(0 0 0 0.8)" }}>
						{element.client?.name.toUpperCase()}
					</Title>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<a href="tel:0000">
							<Typography style={{ textAlign: "center", color: "rgba(0 0 0 0.8)" }}>
								06 00 00 00 00
							</Typography>
						</a>
						<a href="mailto:aa@test.fr">
							<Typography style={{ textAlign: "center", color: "rgba(0 0 0 0.8)" }}>
								PPR@PENINSULA.COM
							</Typography>
						</a>
					</div>
				</>
			),
		},
		{
			key: '1',
			label: (
				<a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
					Filtrer : Afficher uniquement les missions {element.client?.name}
				</a>
			),
		},
		{
			key: '2',
			label: (
				<a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
					Ouvrir les informations de ce client
				</a>
			),
		},
	];

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
					display: 'flex', justifyContent: 'end'
				}}>
					<div style={{ textAlign: "center", margin: 0, padding: 0, width: "90%" }}>
						<Dropdown
							trigger={['contextMenu']}
							menu={{ items }}
						>
							<Typography.Text strong ellipsis>
								{element.client?.name.toUpperCase()}
							</Typography.Text>
						</Dropdown>

					</div>
					<div style={{ maxWidth: "15%", display: 'flex', justifyContent: 'start' }}>
						<div style={{ maxWidth: "50%", textAlign: "center" }}><SmileOutlined />{passenger_count}</div>
						<div style={{ maxWidth: "50%", textAlign: "center" }}><ShoppingOutlined />{luggage_count}</div>
					</div>
				</div>

				<div style={{ textAlign: "left" }}>
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
