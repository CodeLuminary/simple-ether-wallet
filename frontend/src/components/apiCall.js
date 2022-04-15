import Loading from "./loading";
import Modal from "./modal";
import { useEffect, useState } from "react";
import Api from "../Api";
import { memo, useMemo } from "react";
import {useNavigate} from "react-router-dom";

const ApiCall = memo(({apiObject, shouldRun})=>{
    const [modalToggle, setModalToggle] = useState(false);
    const [modalText, setModalText] = useState("");
    const [showLoading, setShowLoading] = useState(true);

    useEffect(()=>{
        if(shouldRun){
            console.log("working")
            //setShowLoading(true);
            if(apiObject.method==='post')
                Api.PostApi(apiObject.url, apiObject.data, apiObject.shouldAuthorize)
                .then(response=>{
                    if(apiObject.showModal){
                        setShowLoading(false)
                        setModalText(response.message);
                        setModalToggle(true);
                    }
                })
                .catch(error=>{

                })
            else 
                Api.getApi(apiObject.url,apiObject.shouldAuthorize)
                .then(response=>{
                    if(apiObject.showModal){
                        setShowLoading(false)
                        setModalText(response.message);
                        setModalToggle(true);
                    }
                })
                .catch(error=>{
                })
        }
        else{
            //setShowLoading(false);
        }
    }, [])

    return (
        <>
            <Loading shouldShow={showLoading} />          
            <Modal modalObject={{ header: "", footer: "", body: modalText }} modalTogglee={modalToggle} closeModal={() => setModalToggle(false)} />
        </>
    )
});

export default ApiCall