import React, { ReactElement } from 'react'

interface Props {
    label: string;
    current: boolean;
}

export default function MenuItem(props: Props): ReactElement {
    return (
        <div 
            className="menu-item-container header-menu-primary"
            style={
                props.current ? {
                    borderLeftWidth: "2px",
                    borderLeftColor: "blue",
                    borderLeftStyle: "solid"
                } :
                {}
            }    
        >
            {props.label}
        </div>
    )
}