import { memo, useState } from "react";
import sidebar_style from "../css/components/sidebar.module.css";
import {FaEthereum, FaWallet} from "react-icons/fa";
import {MdSend} from "react-icons/md";
import {Link} from "react-router-dom"

const Sidebar = memo(()=>{
    const [ menuNumber,setMenuNumber] = useState(1);

    const highlight = (num)=>{
        setMenuNumber(num)
    }

    return (
        <>
            <div className={sidebar_style.nav}>
                <span><FaEthereum style={{fontSize: 20}} />&nbsp;ETHER WALLET</span><br/>
                <div className={sidebar_style.menu}>
                    <Link to="" className={`${menuNumber==1? `${sidebar_style.highlight}`: ''}`} onClick={()=>setMenuNumber(1)}><FaWallet />&nbsp;<span>ACCOUNTS</span></Link>
                    <Link to="send-ether" className={`${menuNumber==2? `${sidebar_style.highlight}`: ''}`} onClick={()=>setMenuNumber(2)}><MdSend/><span>ETHER TRANSFER</span></Link>
                </div>
            </div>
        </>
    )
});

export default Sidebar;