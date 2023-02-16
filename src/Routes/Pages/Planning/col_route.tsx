import { Button, Col, Popover, Row, Steps, Tabs, Tag, Typography } from "antd"
import TabPane from "antd/es/tabs/TabPane"
import { TableListItem } from "./planning"

const Popup = (props: { element: TableListItem }) => {

    return (

        <Row style={{ width: 700 }}>

            <Col
                style={{
                    // Vertical align middle
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
                span={12}>
                <Steps
                    direction="vertical"
                    current={1}
                    percent={75}
                    items={props.element.location_steps.map((e, i: number) => {
                        return {
                            title: e,
                            description: i == 0 ? "Client récupéré à 8:00" : "En attente...",

                        }
                    })}
                />
            </Col>
            <Col span={12}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Itineraire" key="1">
                        <div style={{ height: 300, width: 300, backgroundColor: "red" }}>
                            <iframe width="300" height="300"
                                src="https://www.openstreetmap.org/export/embed.html?bbox=-62.04673002474011%2C16.95487694424327%2C-61.60521696321666%2C17.196751341562923&amp;layer=mapnik"
                            ></iframe>
                        </div>
                    </TabPane>
                    <TabPane tab="Liste" key="2">
                        <div style={{ height: 300, width: 300, backgroundColor: "blue" }}>
                            Liste
                        </div>
                    </TabPane>
                </Tabs>
            </Col>
        </Row>

    )

}

const ReactElement = (props: { element: TableListItem }) => {
    return (

        <Popover
            content={<Popup element={props.element} />}
            title="Route"
            trigger={["click"]}
        >
            <div style={{
                cursor: "pointer",
                position: "absolute", left: 0, right: 0, top: 0, bottom: 0,
                display: "flex", justifyContent: "center", alignItems: "center",
            }}>
                <Typography.Text style={{ fontSize: 20 }}>
                    {props.element.location_steps[0] + ' -> ' + props.element.location_steps[props.element.location_steps.length - 1]}
                </Typography.Text>
            </div>

        </Popover>

    )
}

export function route_render(node: React.ReactNode, element: TableListItem, index: number) {

    if (element.location_steps.length == 0) {
        return <Tag color="red">Pas de route</Tag>
    }

    return <ReactElement element={element} />
}
