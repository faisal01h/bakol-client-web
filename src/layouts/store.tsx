import Navbar from "@/components/navbar";
import React from "react";

export default function StoreLayout(props : { children?: any } ) {
    
    return (
        <div>
            <Navbar />
            <div>
                {props.children}
            </div>
        </div>
    )
}