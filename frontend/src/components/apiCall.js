import Loading from "./loading";
import Modal from "./modal";
import { useState } from "react";
import Api from "../Api";
import { memo } from "react";
import {useNavigate} from "react-router-dom";

const ApiCall = memo(({apiObject, shouldRun})=>{
    const [modalToggle, setModalToggle] = useState(false);
    const [modalText, setModalText] = useState("");
    const [showLoading, setShowLoading] = useState(false);

    if(shouldRun){
        setShowLoading(true);
        Api.PostApi(apiObject.url, apiObject.data, true)
        .then(response=>{
            if(apiObject.showModal){
                setModalText(response.message);
                setModalToggle(true);
            }
        })
        .catch(error=>{

        })
    }
    else{
        setShowLoading(false);
    }
    return (
        <>
            <Loading shouldShow={showLoading} />          
            <Modal modalObject={{ header: "", footer: "", body: modalText }} modalTogglee={modalToggle} closeModal={() => setModalToggle(false)} />
        </>
    )
});

export default ApiCall