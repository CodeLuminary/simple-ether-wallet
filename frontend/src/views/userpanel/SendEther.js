import {useDispatch, useSelector} from "react-redux";
import {useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import Modal from "../../components/modal.js";
import Loading from "../../components/loading.js";
import Api from "../../Api";
import sendether_style from "../../css/views/sendether.module.css";

const SendEther = ()=>{

    const wallets = useSelector((state)=> state.account.wallet_account);
    const [shouldShow, setShouldShow] = useState(true);
    const dispatch = useDispatch();
    const [loadingState, setLoadingState] = useState("loading");
    const navigate = useNavigate();
    const [modalToggle, setModalToggle] = useState(false);
    const [modalText, setModalText] = useState("");
    const [showLoading, setShowLoading] = useState(false);
    const [isFromContract, setIsFromContract] = useState(false);

    const amount = useRef(); const receiver = useRef();
    const sender = useRef();

    return (
        <>
            <Loading shouldShow={showLoading} />
            <Modal modalObject={{ header: "", footer: "", body: modalText }} modalTogglee={modalToggle} closeModal={() => setModalToggle(false)} />      
            <h2>SEND ETHER</h2>
            <form className={sendether_style.send} onSubmit={(e)=>{
                e.preventDefault();
                setShowLoading(true);
                Api.PostApi('/web3/transfer-ether',{
                    isFromContract,
                    value: amount.current.value,
                    reciever_address: receiver.current.value,
                    address: wallets[Number(sender.current.value)].public_key,
                    private_key: wallets[Number(sender.current.value)].key
                }, true)
                .then(response=>response.json())
                .then(result=>{
                    console.log(result)
                    setShowLoading(false)
                    if(result.isSuccessful){
                        setModalText(result.message);
                        setModalToggle(true);
                    }
                    else{
                        setModalText(result.message);
                        setModalToggle(true);
                    }
                })
                .catch(error=>{
                    alert("nothing oo")
                    /*setShowLoading(false);
                    sessionStorage.removeItem('wallet_tkn')
                    sessionStorage.removeItem('email');
                    navigate('/');*/
                })

            }}>
                <span>Send From</span><br/>
                <select onChange={(e)=>{
                    if(e.target.value=='0') setIsFromContract(false)
                    else setIsFromContract(true)
                }}>
                    <option value="0">From Personal Wallet</option>
                    <option value="1">From Smart Contract</option>
                </select><br/>
                <div style={{display: isFromContract ? 'none': 'block'}}>
                    <span>Select Address</span><br/>
                    <select ref={sender}>
                        {
                            wallets.length > 0 ? 
                            (
                                wallets.map((account, index)=>(
                                    <option value={index}>{account.public_key}</option>
                                ))
                            ): ''
                        }
                    </select>
                </div>
                <span>Receiver Address</span><br/>
                <input ref={receiver} type="text" placeholder="Enter receiver address" required/><br/>
                <span>Amount(In Ether)</span><br/>
                <input ref={amount} type="text" placeholder="Enter amount in ether" required/><br/>
                <input type="submit" value="Send Ether"/>
            </form>
        </>
    )
}

export default SendEther;