import { Button, Popover, Steps, Tag } from "antd"
import { TableListItem } from "./planning"

export function route_render(node: React.ReactNode, element: TableListItem, index: number) {

    if (element.location_steps.length == 0) {
        return <Tag color="red">Pas de route</Tag>
    }

    return (
        <Popover
            content={
                <Steps
                    direction="vertical"
                    current={1}
                    percent={75}
                    items={element.location_steps.map((e, i: number) => {
                        return {
                            title: e,
                            description:i==0?"Client récupéré à 8:00":"En attente...",

                        }
                    })}
                />
            }
            title="Route"
            trigger={["click"]}
        >
            <Button type="dashed" style={{width: "80%"}}>
                {element.location_steps[0] + ' -> ' + element.location_steps[element.location_steps.length - 1]}
            </Button>

        </Popover>
    )
}
