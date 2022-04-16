import { useState } from "react";
import Sidebar from "../../components/sidebar";
import router_style from "../../css/views/admin_router.module.css";

const Router = ()=>{
    const [shouldRun, setShouldRun] = useState(false);
    const [apiObject, setApiObject] = useState({});

    return (
        <>
            <div className="col-12">
                <Sidebar />
                <div className={router_style.content}>
                    <div className="col-12">
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default Router;