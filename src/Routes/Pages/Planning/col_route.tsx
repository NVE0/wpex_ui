import { Button, Col, Popover, Row, Steps, Tabs, Tag, Typography } from "antd"
import TabPane from "antd/es/tabs/TabPane"
import { TableListItem } from "./planning"

export function route_render(node: React.ReactNode, element: TableListItem, index: number) {

    if (element.location_steps.length == 0) {
        return <Tag color="red">Pas de route</Tag>
    }

    return (
        <Popover
            content={
                <Row style={{width: 700}}>
                    
                    <Col span={12}>
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
                    </Col>
                    <Col span={12}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Itineraire" key="1">
                                <div style={{height: 300, width: 300, backgroundColor: "red"}}>
                                    Map
                                </div>
                            </TabPane>
                            <TabPane tab="Liste" key="2">
                                <div style={{height: 300, width: 300, backgroundColor: "blue"}}>
                                    Liste
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            }
            title="Route"
            trigger={["click"]}
        >
            <div style={{
                cursor: "pointer",
                position: "absolute", left: 0, right: 0, top: 0, bottom: 0,
                display: "flex", justifyContent: "center", alignItems: "center",
            }}>
                <Typography.Text style={{fontSize: 20}}>
                    {element.location_steps[0] + ' -> ' + element.location_steps[element.location_steps.length - 1]}
                </Typography.Text>
            </div>

        </Popover>
    )
}
