import { Button, Divider, Popover, Typography } from "antd";
import { TableListItem } from "./planning";

// This is the column definition for the partner column
// This column is used in two different cases
// 1. We can choose a partner from a list of partners, and this partner will fill in his vehicle and driver
//    If the partner has only one vehicle and/or driver, this vehicle and/or driver will be automatically selected
// 2. We can choose ourselves as a partner, and we will fill in our vehicle and driver

const { Title } = Typography;

export function partner_render(node: React.ReactNode, element: TableListItem, index: number) {
    return(
        <div style={{
            position:"absolute", top: 0, left: 0, right: 0, bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            textAlign: "center",
        }}>
            <Typography style={{textAlign: "center", color: "rgba(0 0 0 0.8)"}}>{element.partner.name.toUpperCase()}</Typography>
            <Typography style={{textAlign: "center", color: "rgba(0 0 0 0.8)"}}>
                {element.driver == null && <>----</>}
                {element.driver != null && <>
                    {element.driver.first_name} {element.driver.last_name.toUpperCase()}
                </>}
            </Typography>
        </div>
    )
}
