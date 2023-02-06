import { Button, Divider, Popover } from 'antd';
import { TableListItem } from './planning';

export function passenger_render(
	node: React.ReactNode,
	element: TableListItem,
	index: number
) {
	return (
		// Everything is written in small letters, first line is the client name, second line is the passenger
		<>

				<Popover style={{position: "absolute", left: 0, top: 0, bottom: 0, right: 0,}}
					content={element.passenger?.[0].name}
					title="Passenger">
					<Button type="ghost" style={{ padding: 0 }}>
						{element.passenger?.[0].name}
					</Button>
				</Popover>
		</>
	);
}
