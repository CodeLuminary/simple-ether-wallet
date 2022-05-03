import login_style from "../css/views/login.module.css";
import ApiCall from "../components/apiCall";
import { useRef, useState } from "react";

const Login = ()=>{
    const email = useRef("");
    const password = useRef("");
    const [shouldRun, setShouldRun] = useState(false);
    const [apiObject, setApiObject] = useState({});

    return (
        <>
            <ApiCall apiObject={apiObject} setShouldRun={setShouldRun} shouldRun={shouldRun} />
            
            <div className={`col-12 ${login_style.login}`}>
                <div className="col-6 col-sm-12">
                    <div></div>
                </div>
                <div className="col-6 col-sm-12">
                    <form onSubmit={(e)=>{
                        e.preventDefault();
                        setApiObject({
                            url: `http://localhost:8000/account/login`,
                            method: 'post',
                            shouldAuthorize: false,
                            data: {
                                email: email.current.value,
                                password: password.current.value
                            }
                        })
                        setShouldRun(true)
                    }}>
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