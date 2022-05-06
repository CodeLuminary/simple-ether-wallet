import login_style from "../css/views/login.module.css";
import { useRef, useState } from "react";
import {useNavigate} from "react-router-dom";
import Modal from "../components/modal";
import Loading from "../components/loading";
import {loginUser} from "../HelperFunctions/account";
import {useDispatch} from "react-redux";
import {setUser} from "../redux/reducers/accountReducer";

const Login = ()=>{
    const email = useRef("");
    const password = useRef("");
    const dispatch = useDispatch();

    const [modalToggle, setModalToggle] = useState(false);
    const [modalText, setModalText] = useState("");
    const navigate = useNavigate();
    const [showLoading, setShowLoading] = useState(false);

    const handleLogin=(e)=>{
        e.preventDefault();
        setShowLoading(true);
        loginUser({
            email: email.current.value,
            password: password.current.value
        })
        .then(result=>{
            if(result.isSuccessful){
                sessionStorage.setItem('wallet_tkn', result.token);
                sessionStorage.setItem('wallet_email', result.email)
                dispatch(setUser({
                    email: result.email,
                    token: result.token
                }))
                setShowLoading(false);
                navigate('/admin')
            }  

        })
        .catch(error=>{
            setModalText(`Action failed. user could not be logged in`);
            setShowLoading(false);
            setModalToggle(true);
        })
    }

    return (
        <>
            <Loading shouldShow={showLoading} />
            <Modal modalObject={{ header: "", footer: "", body: modalText }} modalTogglee={modalToggle} closeModal={() => setModalToggle(false)} />
            <div className={`col-12 ${login_style.login}`}>
                <div className="col-6 col-sm-12">
                    <div></div>
                </div>
                <div className="col-6 col-sm-12">
                    <form onSubmit={handleLogin}>
                        <h3>Login</h3>
                        <span className="error"></span><br/>
                        <span className="label label-required">Email</span><br/>
                        <input required ref={email} className="input" type="text" placeholder="Enter email here" /><br/>
                        <span className="label label-required">Password</span><br/>
                        <input required ref={password} className="input" type="password" placeholder="Enter password here" /><br/>
                        <input type="submit" value="Login" className={`btn ${login_style.login_btn}`} />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;