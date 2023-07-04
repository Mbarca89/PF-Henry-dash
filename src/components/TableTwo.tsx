import { useEffect, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../store';
import { getAllCategories, getAllProducts, getProductByID, getProducts, logicDeleteProductByID } from '../store/thunks';
import { activePostProductModal, activeUpdateProductModal, clearStateToast } from '../store/reducers/modalReducer';
import { setCurrentProductID } from '../store/reducers/userReducer';
import { BsFillFileArrowDownFill, BsFillFileArrowUpFill, BsFillTrashFill } from "react-icons/bs"
import { AiFillCloseCircle } from "react-icons/ai"
import { Products } from '../types';
import axios from 'axios';
import { REACT_APP_SERVER_URL } from '../../config';

const TableTwo = () => {
  const products = useAppSelector((state: RootState) => state.user.products)
  const toastModal = useAppSelector((state: RootState) => state.modals.toastModal)
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state: RootState) => state.user.userData)
  const [gallery, setGallery] = useState(false)
  const [photos, setPhotos] = useState([])

  const [aux, setaux] = useState(false)

  const [loading, setLoading] = useState<boolean>(true);

  const preloader = document.getElementById('preloader');

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }

  // const handleActivePostProductModal = () => {
  //   dispatch(activeUpdateProductModal({
  //     isActive: true,
  //   }));
  // }

  const handleActivePostProductModal = () => {
    dispatch(activePostProductModal())
  };


  const handleStateToast = () => {
    toastModal.isActive && dispatch(clearStateToast())
  }

  const onUpdateProduct = (productID: string) => {
    dispatch(getProductByID(productID))
    dispatch(setCurrentProductID(productID))
    dispatch(activeUpdateProductModal({
      isActive: true,
    }));
  }

  const handleDeleteProduct = (product: Products) => {
    dispatch(logicDeleteProductByID(product))
    setaux(!aux)
  }

  useEffect(() => {
    dispatch(getProducts(currentUser.id));
    dispatch(getAllCategories())
    setTimeout(() => setLoading(false), 1000);
    setTimeout(() => dispatch(getProducts(currentUser.id)), 100);
  }, [currentUser, aux])

  const showGallery = async (product: Products) => {
    try {
      const { data } = await axios(`${REACT_APP_SERVER_URL}/products/photos/${product.id}`)
      setPhotos(data)
      setGallery(true)
    } catch (error) {
      console.log(error)
    }
  }

  const closeGallery = () => {
    setGallery(false)
    setPhotos([])
  }

  return loading ? (
    <div
      className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"
    ></div>
  ) : (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Mis Productos
        </h4>
      </div>
      <div
        onClick={handleActivePostProductModal}
        className="absolute cursor-pointer right-2 top-2 rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        <button onClick={handleStateToast}>
          Agregar Producto
        </button>
      </div>
      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Nombre</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Descripción</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Precio</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Rating</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Stock</p>
        </div>
      </div>
      {
        products?.map(product => {
          return (
            <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5" key={crypto.randomUUID()}>
              <div className="col-span-2 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="h-12.5 w-15 rounded-md">
                    <img src={product?.photos[0]?.url} alt="Product" onClick={() => showGallery(product)} />
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
              <div className="col-span-2 hidden items-center sm:flex">
                {
                  product.isActive ? (
                    <p className="text-sm text-black dark:text-white">{product.description}</p>
                  ) : (
                    <p>
                      {product.description}
                    </p>
                  )
                }

              </div>
              <div className="col-span-1 flex items-center">
                {
                  product.isActive ? (
                    <p className="text-sm text-black dark:text-white">{product.price}</p>
                  ) : (
                    <p>
                      ${product.price}
                    </p>
                  )
                }
              </div>
              <div className="col-span-1 flex items-center">
                {
                  product.isActive ? (
                    <p className="text-sm text-black dark:text-white">{product.ratingAverage}</p>
                  ) : (
                    <p>
                      {product.ratingAverage}
                    </p>
                  )
                }
              </div>
              <div className="col-span-1 flex items-center">
                {
                  product.isActive ? (
                    <p className="text-sm text-meta-3">{product.stock}</p>
                  ) : (
                    <p>
                      {product.stock}
                    </p>
                  )
                }

              </div>
              <div className="col-span-1 flex items-center" >
                {
                  product.isActive ? (
                    <p className="text-xl text-danger cursor-pointer" onClick={() => {
                      handleDeleteProduct(product)
                    }}><BsFillFileArrowDownFill /></p>
                  ) : (
                    <p className="text-xl text-meta-3 cursor-pointer" onClick={() => {
                      handleDeleteProduct(product)
                    }}><BsFillFileArrowUpFill /></p>
                  )
                }

              </div>
            </div>
          )
        })
      }
      {gallery &&
        <div className="w-full h-full absolute flex justify-center z-99999 top-3 p-3 bg-transparent ">
          <div className='w-100 h-full bg-bodydark2 flex flex-col  p-10 text-black font-bold rounded-3xl'>
            <div className="flex justify-center gap-x-4">
              <p className="text-sm text-white">Imagenes del producto</p>
              <p onClick={closeGallery} className="top-5 right-1 cursor-pointer text-sm absolute left-[720px] text-white font-bold"><AiFillCloseCircle size={30}/></p>
            </div>
            <div className='grid grid-cols-3 mt-10 gap-5' >
              {photos.map((photo: any, index) => {
                return (
                  <div key={crypto.randomUUID()} className='bg-white rounded-xl relative'>
                    <p className='cursor-pointer w-5 absolute right-1 text-danger'><AiFillCloseCircle size={20}/></p>
                    <img src={photo.url} className='w-auto h-auto'></img>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default TableTwo;
