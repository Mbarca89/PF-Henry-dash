import { FcGoogle } from "react-icons/fc"
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs"
import { useEffect, useState } from "react"
import { FieldErrors, useForm } from "react-hook-form"
import axios from "axios"
import { User } from "../../../types"
import { activeToast, clearStateToast } from "../../../store/reducers/modalReducer"
import { RootState, useAppDispatch, useAppSelector } from "../../../store"
import { Toaster, toast } from "react-hot-toast"
import { setCurrentUser, setSession } from "../../../store/reducers/userReducer"

export type RegisterFormValues = {
    name: string,
    email: string,
    password: string,
    address: string,
    city: string,
    province: string,
    postalCode: number
}

export type LoginFormValues = {
    email: string,
    password: string,
}

const LoginAndRegisterForm = () => {
    // Form Effects 
    const [rightPanelActive, setrightPanelActive] = useState("")
    const onRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setrightPanelActive("right-panel-active")
    }

    const onLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setrightPanelActive("")
    }

    const [loading, setLoading] = useState<boolean>(true);
    const preloader = document.getElementById('preloader');

    if (preloader) {
        setTimeout(() => {
            preloader.style.display = 'none';
            setLoading(false);
        }, 2000);
    }
    // Form Effects 

    // States/Reducer
    const dispatch = useAppDispatch()
    const toastModal = useAppSelector((state: RootState) => state.modals.toastModal)
    // States/Reducer


    // Control Register Form
    const formRegister = useForm<RegisterFormValues>({
        mode: "all"
    });
    const { register: registerRegister, control: registerControl, handleSubmit: registerHandleSubmit, formState: registerFormState, reset: registerReset } = formRegister;
    const { errors: registerErros, isDirty: registerIsDirty, isValid: registerIsValid, isSubmitting: registerIsSubmitting, isSubmitted: registerIsSubmitted, isSubmitSuccessful: registerIsSubmitSuccesfull } = registerFormState;
    const [currentRegisterFormData, setcurrentRegisterFormData] = useState<RegisterFormValues>()
    // Control Register Form

    // Control Login Form
    const formLogin = useForm<LoginFormValues>({
        mode: "all"
    });
    const { register: loginRegister, control: loginControl, handleSubmit: loginHandleSubmit, formState: loginFormState, reset: loginReset } = formLogin;
    const { errors: loginErrors, isDirty: loginIsDirty, isValid: loginIsValid, isSubmitting: loginIsSubmitting, isSubmitted: loginIsSubmitted, isSubmitSuccessful: loginIsSubmitSuccesfull } = loginFormState;
    const [currentLoginFormData, setcurrentLoginFormData] = useState<LoginFormValues>()

    const loginOnSubmit = (dataValues: LoginFormValues) => {
        setcurrentLoginFormData(dataValues);
    }

    const onLoginError = (errors: FieldErrors<LoginFormValues>) => {

    }

    const loginUser = async (data: LoginFormValues) => {

        console.log("login User")
        return await axios.post(
            'https://pf-henry-back-two.vercel.app/auth/login',
            data
        );
    }
    // Control Login Form


    useEffect(() => {
        console.log("loginform");

        // Submit Login Form
        if (loginIsSubmitted) {
            if (loginIsSubmitSuccesfull) {
                loginUser(currentLoginFormData as LoginFormValues).then(response => {
                    // SI TODO SALE BIEN 
                    dispatch(setSession(true))
                    dispatch(setCurrentUser(response.data.user))
                    setLoading(true)
                    if (preloader) {
                        preloader.style.display = 'fixed';
                    }
                    if (preloader) {
                        setTimeout(() => {
                            preloader.style.display = 'none';
                            setLoading(false);
                        }, 2000);
                    }
                    if(!localStorage.getItem("user")){
                        localStorage.setItem('user', JSON.stringify(response));
                    }
                    console.log(response);
                }).catch(error => {
                    // SI TODO SALE MAL
                    console.log(error);
                    dispatch(activeToast({
                        isOk: false,
                        message: `Ocurrio un problema. ${error?.response?.data}`
                    }))
                    toast.error(toastModal.message, {
                        duration: 8000,
                    });
                    setTimeout(() => {
                        dispatch(clearStateToast())
                    }, 10000);
                })
                loginReset()
                registerReset()
            }
        }

    }, [loginIsSubmitSuccesfull, loginReset, registerIsSubmitSuccesfull, registerReset, toastModal.isActive])


    return (
        <div className="body">
            {toastModal.isActive && <Toaster position="top-center" toastOptions={
                {
                    style: {
                        fontWeight: 'bold'
                    }
                }
            } />}
            <div className={`container ${rightPanelActive && rightPanelActive}`} id="container">
                <div className="formContainer registerContainer">
                    <form className="form">
                        <h1 className="h1">Register here.</h1>
                        <input type="text" placeholder="Name" className="input" />
                        <input type="email" placeholder="Email" className="input" />
                        <input type="password" placeholder="Password" className="input" />
                        <input type="text" placeholder="Address" className="input" />
                        <input type="text" placeholder="City" className="input" />
                        <input type="text" placeholder="Province" className="input" />
                        <input type="number" placeholder="Postal Code" className="input" />
                        <input type="text" placeholder="Phone" className="input" />
                        <input type="text" placeholder="Commerce Name" className="input" />
                        <button className="button">Register</button>
                        <span className="span">or use your account</span>
                        <div className="socialContainer">
                            <a href="#" className="social a"><FcGoogle className="socialIcon" /></a>
                        </div>
                    </form>
                </div>

                <div className="formContainer loginContainer">
                    <form className="form" onSubmit={loginHandleSubmit(loginOnSubmit, onLoginError)} noValidate>
                        <h1 className="h1">Login here.</h1>
                        <input type="email" placeholder="Email" className="input" {...loginRegister("email", {
                            required: {
                                value: true,
                                message: "El email es requerido."
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/,
                                message: "El email es invalido."
                            },
                            validate: {
                                // isExist: async (fieldValue) => {
                                //     const response = await axios.get("https://pf-henry-back-two.vercel.app/users")

                                //     let alreadyExistEmail = false;
                                //     if (response.data.find((user: User) => user.email.toLowerCase() === fieldValue.toLowerCase())) {
                                //         alreadyExistEmail = false;
                                //     } else {
                                //         alreadyExistEmail = true;
                                //     }

                                //     return alreadyExistEmail || "Ya existe ese email."
                                // }
                            }
                        })} />
                        {loginErrors.email?.message && <p className="p text-meta-7 shadow-0">{loginErrors.email?.message}</p>}
                        <input type="password" placeholder="Password" className="input" {...loginRegister("password", {
                            required: {
                                value: true,
                                message: "El password es requerido."
                            },
                            pattern: {
                                value: /^.{7,}$/,
                                message: "Debe tener mas de 6 caracteres."
                            },
                        })} />
                        {loginErrors.password?.message && <p className="p text-meta-7 shadow-0">{loginErrors.password?.message}</p>}
                        <div className="content">
                            <input type="checkbox" name="checkbox" id="checkbox" className="input checkbox" />
                            <label>Remember me</label>
                        </div>
                        <div className="passLink">
                            <a href="#" className="a">Forgot password?</a>
                        </div>
                        <button className="button" disabled={!loginIsDirty || !loginIsValid || loginIsSubmitting} type="submit">Login</button>
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
                            <button className="button ghost" onClick={onRegister} id="register">Register <BsFillArrowRightCircleFill className="socialIcon" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default LoginAndRegisterForm;