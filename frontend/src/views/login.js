import login_style from "../css/views/login.module.css"

const Login = ()=>{
    return (
        <>
            <div className={`col-12 ${login_style.login}`}>
                <div className="col-6 col-sm-12">
                    <div></div>
                </div>
                <div className="col-6 col-sm-12">
                    <form >
                        <h3>Login</h3>
                        <span className="error"></span><br/>
                        <span className="label label-required">Email</span><br/>
                        <input className="input" type="text" placeholder="Enter email here" /><br/>
                        <span className="label label-required">Password</span><br/>
                        <input className="input" type="password" placeholder="Enter password here" /><br/>
                        <input type="submit" value="Login" className={`btn ${login_style.login_btn}`} />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;