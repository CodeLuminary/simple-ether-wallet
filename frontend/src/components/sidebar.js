import { memo } from "react";
import sidebar_style from "../css/components/sidebar.module.css";
import {FaEthereum} from "react-icons/fa"

const Sidebar = memo(()=>{
    return (
        <>
            <div className={sidebar_style.nav}>
                <span><FaEthereum />&nbsp;Balance</span><br/>
                <span></span>
                <div>
                    
                </div>
            </div>
        </>
    )
});

export default Sidebar;