import { Button, Divider, Popover } from "antd";
import { PlanningData } from "./planning";

export function type_render(node: React.ReactNode, element: PlanningData, index: number) {
    return(
        <div style={{
            backgroundColor:"rgba(255,0,0,0.5)",
            position: "absolute", left: 0, top: 0, bottom: 0, right: 0,
            color: "white",
            }}>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
                {element.type}
            </div>
        </div>
    )
}
