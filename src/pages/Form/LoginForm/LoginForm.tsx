import { FcGoogle } from "react-icons/fc"
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs"
import { useEffect, useState } from "react"

const LoginForm = () => {
    const [rightPanelActive, setrightPanelActive] = useState("")

    const onRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setrightPanelActive("right-panel-active")
    }

    const onLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setrightPanelActive("")
    }


    useEffect(() => {
        console.log("login");
        
    }, [])


    return (
        <div className="body">
            <div className={`container ${rightPanelActive && rightPanelActive}`} id="container">
                <div className="formContainer registerContainer">
                    <form className="form">
                        <h1 className="h1">Register here.</h1>
                        <input type="text" placeholder="Name" className="input" />
                        <input type="email" placeholder="Email" className="input" />
                        <input type="password" placeholder="Password" className="input" />
                        <button className="button">Register</button>
                        <span className="span">or use your account</span>
                        <div className="socialContainer">
                            <a href="#" className="social a"><FcGoogle className="socialIcon" /></a>
                        </div>
                    </form>
                </div>

                <div className="formContainer loginContainer">
                    <form className="form">
                        <h1 className="h1">Login here.</h1>
                        <input type="email" placeholder="Email" className="input" />
                        <input type="password" placeholder="Password" className="input" />
                        <div className="content">
                            <input type="checkbox" name="checkbox" id="checkbox" className="input checkbox" />
                            <label>Remember me</label>
                        </div>
                        <div className="passLink">
                            <a href="#" className="a">Forgot password?</a>
                        </div>
                        <button className="button">Login</button>
                        <span className="span">or use your account</span>
                        <div className="socialContainer">
                            <a href="#" className="social a"><FcGoogle className="socialIcon" /></a>
                        </div>
                    </form>
                </div>

                <div className="overlayContainer">
                    <div className="overlay">
                        <div className="overlayPanel overlayLeft">
                            <h1 className="title">Hello!!</h1>
                            <p className="p">If you have an account, login here</p>
                            <button className="button ghost" id="login" onClick={onLogin}>Login <BsFillArrowLeftCircleFill className="socialIcon" /></button>
                        </div>
                        <div className="overlayPanel overlayRight">
                            <h1 className="title">Start selling now</h1>
                            <p className="p">If you do not have an account yet, join us and start selling. </p>
                            <button className="button ghost"  onClick={onRegister} id="register">Register <BsFillArrowRightCircleFill className="socialIcon" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;