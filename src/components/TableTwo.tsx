import { useEffect, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../store';
import { getProducts } from '../store/thunks';
import { activePostProductModal, clearStateToast } from '../store/reducers/modalReducer';

const TableTwo = () => {
  const products = useAppSelector((state: RootState) => state.user.products)
  const toastModal = useAppSelector((state: RootState) => state.modals.toastModal)
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(true);

  const preloader = document.getElementById('preloader');

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }

  const handleActivePostProductModal = () => {
    dispatch(activePostProductModal());
  }

  const handleStateToast = () => {
    toastModal.isActive && dispatch(clearStateToast())
  }

  useEffect(() => {
    console.log("table two");
    
    dispatch(getProducts());
    setTimeout(() => setLoading(false), 1000);
  }, [])


  return loading ? (
    <div
      className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"
    ></div>
  ) : (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          My Products
        </h4>
      </div>
      <div
        onClick={handleActivePostProductModal}
        className="absolute cursor-pointer right-2 top-2 rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        <button onClick={handleStateToast}>
          Add Product
        </button>
      </div>
      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
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
              <div className="col-span-3 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="h-12.5 w-15 rounded-md">
                    <img src={product?.photos[0]?.url} alt="Product" />
                  </div>
                  <p className="text-sm text-black dark:text-white">
                    {product.name}
                  </p>
                </div>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">{product.description}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">${product.price}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">{product.rating}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-meta-3">{product.stock}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  );
};

export default TableTwo;
