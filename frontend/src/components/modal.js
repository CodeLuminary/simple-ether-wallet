import modalcss from "../css/component/modal.module.css";
import { memo } from "react";

const Modal = memo(({ modalObject, modalTogglee, closeModal }) => {

    return (
        <div className={modalcss.modal} style={{ display: modalTogglee ? "block" : "none" }}>
            <div className={modalcss.modal_content}>
                <div className={modalcss.modal_header}>
                    <span className={modalcss.close} onClick={closeModal}>&times;</span>
                    <h2>{modalObject.header}</h2>
                </div>
                <div className={modalcss.modal_body}>
                    {modalObject.body}
                </div>
                <div className={modalcss.modal_footer}>
                    <h3>{modalObject.footer}</h3>
                </div>
            </div>
        </div>
    );

});

export default Modal;