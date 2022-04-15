import Loading from "./loading";
import Modal from "./modal";
import { useState } from "react";

const ApiCall = ({apiObject, shouldRun})=>{
    const [modalToggle, setModalToggle] = useState(false);
    const [modalText, setModalText] = useState("");
    const [showLoading, setShowLoading] = useState(false);

    if(shouldRun){
        
    }

    return (
        <>
            <Loading shouldShow={showLoading} />          
            <Modal modalObject={{ header: "", footer: "", body: modalText }} modalTogglee={modalToggle} closeModal={() => setModalToggle(false)} />
        </>
    )
}