import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import router_style from "../../css/views/admin_router.module.css";
import {Routes, Route} from "react-router-dom";
import Accounts from "./Accounts"
import {useNavigate} from "react-router-dom";
import {MdLogout} from "react-icons/md";
import SendEther from "./SendEther";
import Api from "../../Api";
import {useDispatch, useSelector} from "react-redux";
import {setWallet} from "../../redux/reducers/accountReducer";

const Router = ()=>{
    const wallet = useSelector((state)=> state.account.wallet_account);
    const navigate = useNavigate();
    const [shouldShow, setShouldShow] = useState(true);
    const dispatch = useDispatch();
    const [loadingState, setLoadingState] = useState("loading");

    useEffect(()=>{
        if (sessionStorage.getItem("wallet_tkn") === null) {
            navigate('/');
        }
        else{
            navigate('/admin')
        }
    },[])

    const fetchWallets = async ()=>{
        Api.getApi('/web3/get-user-wallets', true)
        .then(response=>response.json())
        .then(result=>{ console.log(result)
            if(result.isSuccessful){
                dispatch(setWallet(result.data));
                if(shouldShow) {
                    setLoadingState("ready")
                }
            }
            else{
                if(shouldShow) {
                    navigate('/')
                }
            }      
        })
        .catch(err=>{
            if(shouldShow) {setLoadingState("error")};
        })
    }

    useEffect(() => {
        setShouldShow(true);
        if (wallet.length === 0) {
            fetchWallets();
        }
        else {
            if (shouldShow) setLoadingState("ready");
        }
        return () => {
            setShouldShow(false);
        };
    }, []);

    return (
        <>
            <div className="col-12">
                <Sidebar />
                <div className={router_style.content}>
                    <div className="col-12">
                        <div className={router_style.account}>
                                <span>{sessionStorage.getItem('wallet_email')}</span><button onClick={()=>{

                                    sessionStorage.removeItem('wallet_tkn')
                                    sessionStorage.removeItem('email');
                                    navigate('/');

                                }}><MdLogout/> LogOut</button>
                        </div>
                    </div>
                    <div>
                        <div>
                            <Routes>
                                <Route index element={<Accounts />}/>
                                <Route path="" element={<Accounts />}/>
                                <Route path='/send-ether' element={<SendEther/>}/>
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Router;