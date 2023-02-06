import { Button, Popover } from "antd";
import { TableListItem } from "./planning";

export function partner_render(node: React.ReactNode, element: TableListItem, index: number) {
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
            </Button>

        </Popover>
    )
}
