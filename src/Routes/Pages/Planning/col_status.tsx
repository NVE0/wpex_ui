import { AimOutlined, InfoCircleTwoTone } from "@ant-design/icons";
import { Button, Divider, Popover, Tooltip, Typography } from "antd";
import { PlanningData } from "./planning";

const colors = [
    { key: '1', color: 'red' },
    { key: '2', color: 'green' },
    { key: '3', color: 'blue' },
    { key: '4', color: 'yellow' },
    { key: '5', color: 'orange' },
    { key: '6', color: 'purple' },
    { key: '7', color: 'pink' },
    { key: '8', color: 'brown' },
    { key: '9', color: 'grey' },
    { key: '10', color: 'black' },
]

export function status_render(node: React.ReactNode, element: PlanningData, index: number) {
    return(
        <>
            {/* Center this div */}
            <div style={{ display: 'flex', justifyContent: "start", alignItems:"center", height:"100%" }}>
                <InfoCircleTwoTone style={{fontSize: 20}} />
                {(Math.random() * 10) > 5 && <Tooltip title="Données GPS non fiables"><AimOutlined style={{marginLeft: 10, color: "red"}} /></Tooltip>}{/* TODO : detect if GPS is working */}
            </div>
            <div style={{
                backgroundColor: colors.find(e => e.key == element.status)?.color,
                position: "absolute", width: 15, top: 0, bottom: 0, right: 0,
                color: "white",
                opacity: 0.7,
                }}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
                    <Typography.Text style={{color: "white"}}>
                        {element.status}
                    </Typography.Text>
                </div>
            </div>
        </>
    );
}