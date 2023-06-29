import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Products from './pages/Products';
import Users from './pages/Users';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import LoginForm from './pages/Form/LoginForm/LoginForm';
import { RootState, useAppDispatch, useAppSelector } from './store';
import { FcSalesPerformance } from 'react-icons/fc';
import { setCurrentUser, setSession } from './store/reducers/userReducer'


function App() {

  const toastModal = useAppSelector((state: RootState) => state.modals.toastModal)
  const [loading, setLoading] = useState<boolean>(true);
  const session = useAppSelector((state: RootState) => state.user.session)
  const dispatch = useAppDispatch()

  let userExist = false;
  if (localStorage.getItem("user")) {
    userExist = true
    dispatch(setSession(true))
  }

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
    }
    setTimeout(() => setLoading(false), 1000);

  }, [session]);

  return (
    (
      !session ? userExist ? (
        <>
          {
            dispatch(setSession(true))
          }
          <Routes>
            <Route path="/" element={<ECommerce />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forms/form-elements" element={<FormElements />} />
            <Route path="/forms/form-layout" element={<FormLayout />} />
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
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
            <Route path="/" element={<ECommerce />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forms/form-elements" element={<FormElements />} />
            <Route path="/forms/form-layout" element={<FormLayout />} />
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/ui/alerts" element={<Alerts />} />
            <Route path="/ui/buttons" element={<Buttons />} />
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
          </Routes>
        </>
      )

    )

  );
}

export default App;
