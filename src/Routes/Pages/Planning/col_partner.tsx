import { Button, Divider, Popover } from "antd";
import { TableListItem } from "./planning";

export function partner_render_partner(node: React.ReactNode, element: TableListItem, index: number) {
    return(
        <Popover
            content={
                "ok"
            }
            title="Route"
            trigger={["click"]}
        >
            <Button type="dashed" style={{width: "80%"}}>
                {element.partner.name}
                <Divider type="vertical" />
                {element.partner.name}
            </Button>

        </Popover>
    )
}


export function partner_render(node: React.ReactNode, element: TableListItem, index: number) {
    return(
        <div style={{display: "flex"}}>
            <Button type="dashed" style={{flex: "50%"}}>
                {element.partner.name}
            </Button>
            <Button type="dashed" style={{flex: "50%"}}>
                {element.partner.name}
            </Button>
        </div>
    )
}
