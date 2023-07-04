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
import {REACT_APP_SERVER_URL} from '../../../../config'

export type RegisterFormValues = {
    name: string,
    email: string,
    password: string,
    address: string,
    city: string,
    province: string,
    postalCode: number,
    phone: string;
    commerceName: string;
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
    const { errors: registerErrors, isDirty: registerIsDirty, isValid: registerIsValid, isSubmitting: registerIsSubmitting, isSubmitted: registerIsSubmitted, isSubmitSuccessful: registerIsSubmitSuccesfull } = registerFormState;
    const [currentRegisterFormData, setcurrentRegisterFormData] = useState<RegisterFormValues>()

    const registerOnSubmit = async (data: RegisterFormValues) => {
        setcurrentRegisterFormData(data);
    };

    const registerUser = async (data: RegisterFormValues) => {
       
        
        const modifiedData = { ...data, role: 'seller' };
       

        return await axios.post(
            `${REACT_APP_SERVER_URL}/users/register`,
            modifiedData
        );
    }

    const onRegisterError = (errors: FieldErrors<RegisterFormValues>) => {

    }
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

    const loginUser = async (data: LoginFormValues) => {
        return await axios.post(
            `${REACT_APP_SERVER_URL}/auth/login`,
            data
        );
    }

    const onLoginError = (errors: FieldErrors<LoginFormValues>) => {

    }
    // Control Login Form


    useEffect(() => {
       

        //handling toast
        if (toastModal.isActive) {
            if (toastModal.type == "success") {
               

                toast.success(toastModal.message, {
                    duration: 4000,
                });

                setTimeout(() => {
                    dispatch(clearStateToast())
                }, 10000);
            } else {
               
                toast.error(toastModal.message, {
                    duration: 6000,
                });
                setTimeout(() => {
                    dispatch(clearStateToast())
                }, 10000);
            }
        }
        //handling toast

        // Submit Login Form
        if (loginIsSubmitted) {
            if (loginIsSubmitSuccesfull) {
                loginUser(currentLoginFormData as LoginFormValues).then(response => {
                    // SI TODO SALE BIEN 
                    if (response.data.user.role === "seller" || response.data.user.role === "admin") {
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
                        if (!localStorage.getItem("user")) {
                            localStorage.setItem('user', JSON.stringify(response));
                            const token = response.data.token;
                            localStorage.setItem("token", token);
                        }
                    } else {
                        throw Error("Usuario inautorizado.")
                    }
                    console.log(response);
                }).catch(error => {
                    // SI TODO SALE MAL
                    dispatch(activeToast({
                        isOk: false,
                        message: `Ocurrio un problema. ${error?.response?.data}`
                    }))
                })
                loginReset()
            }
        }
        // Submit Login Form

        // Submit Register Form
        if (registerIsSubmitted) {
            if (registerIsSubmitSuccesfull) {
                registerUser(currentRegisterFormData as RegisterFormValues).then(response => {
                    // SI TODO SALE BIEN 
                    dispatch(setSession(true))
                    dispatch(setCurrentUser(response.data.newUser))
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
                    if (!localStorage.getItem("user")) {
                        localStorage.setItem('user', JSON.stringify(response));
                    }
                    
                }).catch(error => {
                    // SI TODO SALE MAL
                   
                    dispatch(activeToast({
                        isOk: false,
                        message: `Ocurrio un problema. ${error?.response?.data}`
                    }))
                })
                registerReset()
            }
        }
        // Submit Register Form

    }, [loginIsSubmitSuccesfull, loginReset, registerIsSubmitSuccesfull, registerReset, toastModal.isActive])


    return (
        <>
            {toastModal.isActive && <Toaster position="top-center" toastOptions={
                {
                    style: {
                        fontWeight: 'bold'
                    }
                }
            } />}
            <div className="body">
                <div className={`container ${rightPanelActive && rightPanelActive}`} id="container">
                    <div className="formContainer registerContainer">
                        <form className="form registerForm" onSubmit={registerHandleSubmit(registerOnSubmit, onRegisterError)} noValidate>
                            <h1 className="h1 col-span-2">Regístrate</h1>
                            <div>
                                {registerErrors.name?.message && <span className=" text-meta-7 text-[20px] absolute -translate-y-[8.3px]"><span className="text-black text-xs absolute translate-x-4">Nombre&nbsp;</span>{registerErrors.name?.message}</span>}
                                <input type="text" placeholder="Nombre" className="input col-start-1 col-span-1" {...registerRegister('name', {
                                    required: {
                                        value: true,
                                        message: '*',
                                    },
                                    pattern: {
                                        value: /^[A-Za-z\s]+$/,
                                        message: '*',
                                    },
                                })} />
                            </div>
                            <div>
                                {registerErrors.email?.message && <span className=" text-meta-7 text-[20px] absolute -translate-y-[8.3px]"><span className="text-black text-xs absolute translate-x-4">Email&nbsp;</span>{registerErrors.email?.message}</span>}
                                <input type="email" placeholder="Email" className="input col-start-2 col-span-1" {...registerRegister('email', {
                                    required: {
                                        value: true,
                                        message: '*',
                                    },
                                    pattern: {
                                        value:
                                            /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/,
                                        message: '*',
                                    },
                                    // validate: {
                                    //     isExist: async (fieldValue) => {
                                    //         const response = await axios.get(`${REACT_APP_SERVER_URL}/users`)
                                    //         let alreadyExistEmail = false;
                                    //         if (response.data.find((user: User) => user.email.toLowerCase() === fieldValue.toLowerCase())) {
                                    //             alreadyExistEmail = false;
                                    //         } else {
                                    //             alreadyExistEmail = true;
                                    //         }
                                    //         return alreadyExistEmail || "*"
                                    //     }
                                    // },
                                })} />
                            </div>
                            <div>
                                {registerErrors.password?.message && <span className=" text-meta-7 text-[20px] absolute -translate-y-[8.3px]"><span className="text-black text-xs absolute translate-x-4">Contraseña&nbsp;</span>{registerErrors.password?.message}</span>}
                                <input type="password" placeholder="Contraseña" className="input col-start-1 col-span-1" {...registerRegister('password', {
                                    required: {
                                        value: true,
                                        message: '*',
                                    },
                                    pattern: {
                                        value: /^.{7,}$/,
                                        message: '*',
                                    },
                                })} />
                            </div>
                            <div>
                                {registerErrors.address?.message && <span className=" text-meta-7 text-[20px] absolute -translate-y-[8.3px]"><span className="text-black text-xs absolute translate-x-4">Dirección&nbsp;</span>{registerErrors.address?.message}</span>}
                                <input type="text" placeholder="Dirección" className="input col-start-2 col-span-1" {...registerRegister('address', {
                                    required: {
                                        value: true,
                                        message: '*',
                                    },
                                    pattern: {
                                        value: /^[A-Za-z0-9\s.,'#-]+$/,
                                        message: '*',
                                    },
                                })} />
                            </div>
                            <div>
                                {registerErrors.city?.message && <span className=" text-meta-7 text-[20px] absolute -translate-y-[8.3px]"><span className="text-black text-xs absolute translate-x-4">Ciudad&nbsp;</span>{registerErrors.city?.message}</span>}
                                <input type="text" placeholder="Ciudad" className="input col-start-1 col-span-1" {...registerRegister('city', {
                                    required: {
                                        value: true,
                                        message: '*',
                                    },
                                    pattern: {
                                        value: /^[A-Za-z\s]+$/,
                                        message: '*',
                                    },
                                })} />
                            </div>
                            <div>
                                {registerErrors.province?.message && <span className=" text-meta-7 text-[20px] absolute -translate-y-[8.3px]"><span className="text-black text-xs absolute translate-x-4">Provincia&nbsp;</span>{registerErrors.province?.message}</span>}
                                <input type="text" placeholder="Provincia" className="input col-start-2 col-span-1" {...registerRegister('province', {
                                    required: {
                                        value: true,
                                        message: '*',
                                    },
                                    pattern: {
                                        value: /^[A-Za-z\s]+$/,
                                        message: '*',
                                    },
                                })} />
                            </div>
                            <div>
                                {registerErrors.postalCode?.message && <span className=" text-meta-7 text-[20px] absolute -translate-y-[8.3px]"><span className="text-black text-xs absolute translate-x-4">Código postal&nbsp;</span>{registerErrors.postalCode?.message}</span>}
                                <input type="text" placeholder="Código postal" className="input col-start-1 col-span-1" {...registerRegister('postalCode', {
                                    required: {
                                        value: true,
                                        message: '*',
                                    },
                                    validate: {
                                        isNumber: (fieldValue) => {
                                            return (!isNaN(Number(fieldValue)) && Number(fieldValue) > 0) || "*"
                                        }
                                    }
                                })} />
                            </div>
                            <div>
                                {registerErrors.phone?.message && <span className=" text-meta-7 text-[20px] absolute -translate-y-[8.3px]"><span className="text-black text-xs absolute translate-x-4">Teléfono&nbsp;</span>{registerErrors.phone?.message}</span>}
                                <input type="text" placeholder="Teléfono" className="input col-start-2 col-span-1" {...registerRegister('phone', {
                                    required: {
                                        value: true,
                                        message: '*',
                                    },
                                    pattern: {
                                        value: /^[+-\d]+$/,
                                        message: '*',
                                    },
                                })} />
                            </div>
                            <div>
                                {registerErrors.commerceName?.message && <span className=" text-meta-7 text-[20px] absolute -translate-y-[8.3px]"><span className="text-black text-xs absolute translate-x-4">Tienda&nbsp;</span>{registerErrors.commerceName?.message}</span>}
                                <input type="text" placeholder="Tienda" className="input col-span-2" {...registerRegister('commerceName', {
                                    required: {
                                        value: true,
                                        message: '*',
                                    },
                                    pattern: {
                                        value: /^[A-Za-z0-9\s]+$/,
                                        message: '*',
                                    },
                                })} />
                            </div>
                            <button className="button col-span-2" disabled={!registerIsDirty || !registerIsValid || registerIsSubmitting} type="submit">Registrarme</button>
                            {/* <span className="span">or use your account</span>
                        <div className="socialContainer">
                            <a href="#" className="social a"><FcGoogle className="socialIcon" /></a>
                        </div> */}
                        </form>
                    </div>

                    <div className="formContainer loginContainer">
                        <form className="form" onSubmit={loginHandleSubmit(loginOnSubmit, onLoginError)} noValidate>
                            <h1 className="h1">Ingresar</h1>
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
                                    //     const response = await axios.get("${REACT_APP_SERVER_URL}/users")

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
                            <input type="password" placeholder="Contraseña" className="input" {...loginRegister("password", {
                                required: {
                                    value: true,
                                    message: "La contraseña es requerida."
                                },
                                pattern: {
                                    value: /^.{7,}$/,
                                    message: "Debe tener mas de 6 caracteres."
                                },
                            })} />
                            {loginErrors.password?.message && <p className="p text-meta-7 shadow-0">{loginErrors.password?.message}</p>}
                            {/* <div className="content">
                                <input type="checkbox" name="checkbox" id="checkbox" className="input checkbox" />
                                <label>Remember me</label>
                            </div> */}
                            {/* <div className="passLink">
                                <a href="#" className="a">Forgot password?</a>
                            </div> */}
                            <button className="button" disabled={!loginIsDirty || !loginIsValid || loginIsSubmitting} type="submit">Ingresar</button>
                            {/* <span className="span">or use your account</span>
                        <div className="socialContainer">
                            <a href="#" className="social a"><FcGoogle className="socialIcon" /></a>
                        </div> */}
                        </form>
                    </div>

                    <div className="overlayContainer">
                        <div className="overlay">
                            <div className="overlayPanel overlayLeft">
                                <h1 className="title">Hola!!</h1>
                                <p className="p">Si tienes una cuenta, ingresa aqui</p>
                                <button className="button ghost" id="login" onClick={onLogin}>Ingresar <BsFillArrowLeftCircleFill className="socialIcon" /></button>
                            </div>
                            <div className="overlayPanel overlayRight">
                                <h1 className="title">Comienza a vender ahora!</h1>
                                <p className="p">Si no tienes una cuenta, regístrate y comienza a vender!</p>
                                <button className="button ghost" onClick={onRegister} id="register">Registro <BsFillArrowRightCircleFill className="socialIcon" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginAndRegisterForm;