import { useEffect, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../store';
import { getAllCategories, getProductByID, getAllProducts, logicDeleteProductByID } from '../store/thunks';
import { activeToast, activeUpdateProductModal } from '../store/reducers/modalReducer';
import { setCurrentProductID } from '../store/reducers/userReducer';
import { BsFillFileArrowDownFill, BsFillFileArrowUpFill } from "react-icons/bs"
import axios from 'axios';
import { REACT_APP_SERVER_URL } from '../../config'

const TableSix = () => {

  const dispatch = useAppDispatch()

  const currentUser = useAppSelector((state: RootState) => state.user.userData)
  const [loading, setLoading] = useState<boolean>(true);

  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }

  const [clients, setClients] = useState([{
    user: {
      name: '',
      email: ''
    },
    product: {
      productName: '',
      productPrice: 0
    },
    quantity: 0
  }])


  useEffect(() => {
    const getClients = async () => {
      try {
        const { data } = await axios(`${REACT_APP_SERVER_URL}/users/clients/${currentUser.id}`)
        setClients(data)
      } catch (error:any) {
        dispatch(activeToast({
          isOk: false,
          message: `Ocurrio un problema. ${error?.response?.data}`
      }))
      }
    }
    getClients()
  }, [])

  return loading ? (
    <div
      className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"
    ></div>
  ) : (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Ventas
        </h4>
      </div>
      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Nombre Cliente</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Email</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Producto</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Cantidad</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Precio</p>
        </div>
      </div>
      {
        clients?.map(client => {

          return (
            <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5" key={crypto.randomUUID()}>
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-black dark:text-white hover:underline hover:cursor-pointer">{client.user.name}</p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-black dark:text-white">{client.user.email}</p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-black dark:text-white">{client.product.productName}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">{client.quantity}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">{client.product.productPrice * client.quantity}</p>
              </div>
            </div>
          )
        })
      }
    </div >
  );
};

export default TableSix;
