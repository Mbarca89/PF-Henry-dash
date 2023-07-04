import { useEffect, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../store';
import { getAllCategories, getProductByID, getAllProducts, logicDeleteProductByID } from '../store/thunks';
import { activeUpdateProductModal } from '../store/reducers/modalReducer';
import { setCurrentProductID } from '../store/reducers/userReducer';
import { BsFillFileArrowDownFill, BsFillFileArrowUpFill } from "react-icons/bs"
import { Products } from '../types';

const TableFive = () => {
  const products = useAppSelector((state: RootState) => state.user.products)
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state: RootState) => state.user.userData)

  const [aux, setAux] = useState(false)
  const [loading, setLoading] = useState<boolean>(true);
  const preloader = document.getElementById('preloader');

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }

  const [confirmation,setConfirmation] = useState({
    show:false,
    product:{} as Products
  })

  const onUpdateProduct = (productID: string) => {
    dispatch(getProductByID(productID))
    dispatch(setCurrentProductID(productID))
    dispatch(activeUpdateProductModal({
      isActive: true,
    }));
  }

  const handleDeleteProduct = (product: Products) => {
    dispatch(logicDeleteProductByID(product))
    setAux(!aux)
  }

  const changeProductStatus = async () => {    
    dispatch(logicDeleteProductByID(confirmation.product))
    setConfirmation({
      show:false,
      product: {
        name:'',
        price: 0,
        description:'',
        stock: 0,
        hasDiscount: false,
        discount: 0,
        photos: [],
        category:'',
        freeShipping:false,
        sales:0,
        rating:0,
        reviews:[],
        seller:{id:'', name:''},
        isActive:false,
        id:'',
        ratingAverage:0
      }
    })
    setAux(!aux)
  }

  const showConfirmation = (product:Products) => {
    setConfirmation({
      show:true,
      product:product
    })
  }

  const cancelAction = () => {
    setConfirmation({
      show:false,
      product: {
        name:'',
        price: 0,
        description:'',
        stock: 0,
        hasDiscount: false,
        discount: 0,
        photos: [],
        category:'',
        freeShipping:false,
        sales:0,
        rating:0,
        reviews:[],
        seller:{id:'', name:''},
        isActive:false,
        id:'',
        ratingAverage:0
      }
    })
  }

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories())
    setTimeout(() => setLoading(false), 1000);
    setTimeout(() => dispatch(getAllProducts()), 100);
  }, [currentUser, aux])

  return loading ? (
    <div
      className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"
    ></div>
  ) : (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Productos
        </h4>
      </div>
      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
      <div className="col-span-1 flex items-center">
          <p className="font-medium"></p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Nombre</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Vendedor</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Stock</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Estado</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Cambiar estado</p>
        </div>
        {/* <div className="col-span-1 flex items-center">
          <p className="font-medium">Delete</p>
        </div> */}
      </div>
      {
        products?.map(product => {

          return (
            <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5" key={crypto.randomUUID()}>
              <div className="col-span-3 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="h-12.5 w-15 rounded-md">
                    <img src={product?.photos[0]?.url} alt="Product" />
                  </div>
                  {
                    product.isActive ? (
                      <p className="text-sm text-black dark:text-white hover:underline hover:cursor-pointer" onClick={() => {
                        onUpdateProduct(product.id)
                      }}>
                        {product.name}
                      </p>
                    ) : (
                      <p>
                        {product.name}
                      </p>
                    )
                  }
                </div>
              </div>
              <div className="col-span-1 flex items-center">
                {
                  product.isActive ? (
                    <p className="text-sm text-black dark:text-white">{product.seller?.name}</p>
                  ) : (
                    <p>
                      {product.seller?.name}
                    </p>
                  )
                }
              </div>
              <div className="col-span-1 flex items-center">
                {
                  product.isActive ? (
                    <p className="text-sm text-black dark:text-white">{product.stock}</p>
                  ) : (
                    <p>
                      {product.stock}
                    </p>
                  )
                }
              </div>
              <div className="col-span-1 flex items-center">
                {
                  product.isActive ? (
                    <p className="text-sm text-meta-3">activo</p>
                  ) : (
                    <p className="text-sm text-danger">
                      inactivo
                    </p>
                  )
                }

              </div>
              <div className="col-span-1 flex items-center" >
                {
                  product.isActive ? (
                    <p className="text-xl text-danger cursor-pointer" onClick={() => {
                      showConfirmation(product)
                    }}><BsFillFileArrowDownFill /></p>
                  ) : (
                    <p className="text-xl text-meta-3 cursor-pointer" onClick={() => {
                      showConfirmation(product)
                    }}><BsFillFileArrowUpFill /></p>
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
            <p className="text-sm text-white dark:text-white">¿Seguro que quieres cambiar el estado del producto?</p>
          </div>
          <div className="mt-5 mb-5 flex items-center justify-center gap-x-4">
            <button
              type="button"
              onClick={changeProductStatus}
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

export default TableFive;
