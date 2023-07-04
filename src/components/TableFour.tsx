import { useEffect, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../store';
import { getUsers, changeUserActivation } from '../store/thunks';
import { activePostProductModal, clearStateToast } from '../store/reducers/modalReducer';
import { BsFillFileArrowDownFill, BsFillFileArrowUpFill, BsFillTrashFill } from "react-icons/bs"
import { User, Users } from '../types';

const TableFour = () => {
  const users = useAppSelector((state: RootState) => state.user.users)
  const toastModal = useAppSelector((state: RootState) => state.modals.toastModal)
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state: RootState) => state.user.userData)
  const [confirmation,setConfirmation] = useState({
    show:false,
    user:{} as User
  })

  const [aux, setAux] = useState(false)

  const [loading, setLoading] = useState<boolean>(true);

  const preloader = document.getElementById('preloader');

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }

  const changeUserStatus = async () => {    
    dispatch(changeUserActivation(confirmation.user))
    setConfirmation({
      show:false,
      user: {
        name:'',
        email:'',
        address:'',
        city:'',
        province:'',
        postalCode:0,
        role: '',
        cart: '',
        id: '',
        active: false
      }
    })
    setAux(!aux)
  }

  const showConfirmation = (user:User) => {
    setConfirmation({
      show:true,
      user:user
    })
  }

  const cancelAction = () => {
    setConfirmation({
      show:false,
      user: {
        name:'',
        email:'',
        address:'',
        city:'',
        province:'',
        postalCode:0,
        role: '',
        cart: '',
        id: '',
        active: false
      }
    })
  }

  useEffect(() => {
    dispatch(getUsers());
    setTimeout(() => setLoading(false), 1000);
    setTimeout(() => dispatch(getUsers()), 100);
  }, [aux])

  return loading ? (
    <div
      className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"
    ></div>
  ) : (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-auto">
      {/* <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Usuarios
        </h4>
      </div> */}
      <div className="grid justify-items-center grid-cols-4 md:grid-cols-6  border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6  2xl:px-7.5 w-auto text-center ">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Nombre</p>
        </div>
        <div className="col-span-2 items-center hidden md:block">
          <p className="font-medium">Email</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Rol</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Estado</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Cambiar Estado</p>
        </div>
      </div>
      {
        users?.map((user: User) => {

          return (
            <div className="grid justify-items-center grid-cols-4 md:grid-cols-6  border-t border-stroke py-4.5 px-4 dark:border-strokedark  md:px-6 2xl:px-7.5 " key={crypto.randomUUID()}>
              <div className="col-span-1 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {
                    user.active ? (
                      <p className="text-sm text-black dark:text-white hover:underline hover:cursor-pointer" >
                        {user.name}
                      </p>
                    ) : (
                      <p>
                        {user.name}
                      </p>
                    )
                  }
                </div>
              </div>
              <div className="col-span-2 items-center hidden md:block">
                {
                  user.active ? (
                    <p className="text-sm text-black dark:text-white">{user.email}</p>
                  ) : (
                    <p>
                      {user.email}
                    </p>
                  )
                }

              </div>
              <div className="col-span-1 flex items-center">
                {
                  user.active ? (
                    <p className="text-sm text-black dark:text-white">{user.role}</p>
                  ) : (
                    <p>
                      {user.role}
                    </p>
                  )
                }
              </div>
              <div className="col-span-1 flex items-center" >
                {
                  user.active ? (

                    <p className="text-sm text-meta-3" >Activo</p>
                  ) : (
                    <p className="text-sm text-danger" >Inactivo</p>
                  )
                }

              </div>
              <div className="col-span-1 flex items-center" >
                {
                  user.active ? (

                    <p className="text-sm text-danger cursor-pointer" onClick={() => showConfirmation(user)}><BsFillFileArrowDownFill /></p>
                  ) : (
                    <p className="text-sm text-meta-3 cursor-pointer" onClick={() => showConfirmation(user)}><BsFillFileArrowUpFill /></p>
                  )
                }

              </div>
            </div>
          )
        })
      }
      {confirmation.show && <div className="w-full h-full absolute bg-transparent flex justify-center z-99999 top-12">
        <div className='w-90 fixed bg-boxdark flex flex-col justify-center z-99999 top-48 mx-auto my-auto'>
          <div className="flex items-center justify-center gap-x-4">
            <p className="text-sm text-white dark:text-white">¿Seguro que quieres cambiar el estado del usuario?</p>
          </div>
          <div className="mt-5 mb-5 flex items-center justify-center gap-x-4">
            <button
              type="button"
              onClick={changeUserStatus}
              className=" bg-primary rounded-md px-4 py-2 text-sm font-semibold text-white"
            >
              SI
            </button>
            <button
            onClick={cancelAction}
              className={`bg-meta-7 rounded-md px-3 py-2 text-sm font-semibold text-white`}>
              NO
            </button>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default TableFour;
