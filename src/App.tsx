import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import ECommerce from './pages/Dashboard/ECommerce';
import ECommerceSeller from './pages/Dashboard/ECommerceSeller';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Products from './pages/Products';
import Users from './pages/Users';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import LoginForm from './pages/Form/LoginForm/LoginForm';
import Category from './pages/Category';
import { RootState, useAppDispatch, useAppSelector } from './store';
import { setCurrentUser, setSession } from './store/reducers/userReducer'


function App() {

  const toastModal = useAppSelector((state: RootState) => state.modals.toastModal)
  const [loading, setLoading] = useState<boolean>(true);
  const session = useAppSelector((state: RootState) => state.user.session)
  const dispatch = useAppDispatch()
  const [role, setRole] = useState<String>('')
  let userExist = false;
  useEffect(() => {
    if (localStorage.getItem("user")) {
      userExist = true
      dispatch(setSession(true))
    }
  }, [])

  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    const item = localStorage.getItem("user");
    if (item) {
      const userData = { ...JSON.parse(item) }
      dispatch(setCurrentUser(userData.data.user))
      setRole(userData.data.user.role)
    }
    setTimeout(() => setLoading(false), 1000);

  }, [session]);

  return (
      !session ? userExist ? (
        <>
          {
            dispatch(setSession(true))
          }
          <Routes>
            <Route path="/" element={<ECommerce />} />
            <Route path="/" element={<ECommerceSeller />} />
            <Route path="/forms/form-elements" element={<FormElements />} />
            <Route path="/forms/form-layout" element={<FormLayout />} />
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
            <Route path="/ui/alerts" element={<Alerts />} />
            <Route path="/ui/buttons" element={<Buttons />} />
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
          </Routes>
        </>
      )
        : (
          <>
            <LoginForm />
          </>
        ) : (
        <>
          <Routes>
            {role === 'admin' && <Route path="/" element={<ECommerce />} />}
            {role === 'admin' && <Route path="/category" element={<Category />} />}
            {role === 'seller' && <Route path="/" element={<ECommerceSeller />} />}
            <Route path="/forms/form-elements" element={<FormElements />} />
            <Route path="/forms/form-layout" element={<FormLayout />} />
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
            <Route path="/ui/alerts" element={<Alerts />} />
            <Route path="/ui/buttons" element={<Buttons />} />
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
          </Routes>
        </>
      )

    )
}

export default App;
