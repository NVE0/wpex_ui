import React, { ReactNode } from "react";
import { JsxElement } from "typescript";

export default ContextMenu;

function ContextMenu (props: {children: ReactNode, ContextMenu: ReactNode}) {

    const [visible, setVisible] = React.useState(false);
    const [x, setX] = React.useState(0);
    const [y, setY] = React.useState(0);

    const ref = React.useRef<HTMLDivElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log("click");
        e.preventDefault();
        setX(e.clientX);
        setY(e.clientY);
        setVisible(true);
    }

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log("click");
        e.preventDefault();
        setX(e.clientX);
        setY(e.clientY);
        setVisible(true);
    }

    const handleClose = () => {
        console.log("click");
        setVisible(false);
    }

    return (
        <div ref={ref} onClick={handleClick} onContextMenu={handleContextMenu}>
            {props.children}
            <div style={{position: "sticky", left: x, top: y, zIndex: 1000}}>
                {visible && props.ContextMenu}
            </div>
        </div>
    )

}
