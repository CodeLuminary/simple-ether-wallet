import dashboard_style from "../../css/views/dashboard.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react"
import Api from "../../Api";
import {addWallet} from "../../redux/reducers/accountReducer";
import {useNavigate} from "react-router-dom";
import Modal from "../../components/modal.js";
import Loading from "../../components/loading.js"

const Accounts = () =>{
    const wallet = useSelector((state)=> state.account.wallet_account);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [modalToggle, setModalToggle] = useState(false);
    const [modalText, setModalText] = useState("");
    const [showLoading, setShowLoading] = useState(false);
    

    return (
        <>
            <Loading shouldShow={showLoading} />
            <Modal modalObject={{ header: "", footer: "", body: modalText }} modalTogglee={modalToggle} closeModal={() => setModalToggle(false)} />
            <button className={dashboard_style.create_wallet} onClick={()=>{

                if(window.confirm('Are you sure you want to create a new wallet?')){
                    setShowLoading(true);
                    Api.getApi('/web3/create-ether-wallet', true)
                    .then(response=>response.json())
                    .then(result=>{
                        console.log(result)
                        setShowLoading(false)
                        if(result.isSuccessful){
                            setModalText(result.message);
                            setModalToggle(true);
                            dispatch(addWallet(result.account))
                        }
                        else{
                            sessionStorage.removeItem('wallet_tkn')
                            sessionStorage.removeItem('email');
                            navigate('/')
                        }
                    })
                    .catch(error=>{
                        setShowLoading(false);
                        sessionStorage.removeItem('wallet_tkn')
                        sessionStorage.removeItem('email');
                        navigate('/');
                    })
                }

            }}>Create wallet</button>
            {
                wallet.length > 0 ?
                (
                <table>
                    <tr>
                        <th>ADDRESS</th>
                        <th>BALANCE</th>
                        <th>KEY</th>
                    </tr>
                    {
                        wallet.map((account)=>(
                            <tr>
                                <td>{account.public_key}</td>
                                <td>{account.balance} ethers</td>
                                <td>**************&nbsp;<button onClick={()=>{
                                    setModalText(account.key);
                                    setModalToggle(true);
                                }}>Show</button></td>
                            </tr>
                        ))
                    }
                </table>
                ): ''
            }
        </>
    )
}

export default Accounts