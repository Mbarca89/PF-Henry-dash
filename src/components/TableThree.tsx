import { useEffect, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../store';
import { getProductByID, getProducts } from '../store/thunks';
import { getCategories } from '../store/thunks';
import {
  activePostProductModal,
  activeUpdateProductModal,
  clearStateToast,
  activeUpdateCategoryModal
} from '../store/reducers/modalReducer';
import { setCurrentProductID } from '../store/reducers/userReducer';
import { fetchCategoriesSuccess } from '../store/reducers/categoriesReducer';

const TableFour = () => {
  /*   const categories = useAppSelector((state: RootState) => state.categories); */

  /*   const categories = useAppSelector((state: RootState) => state.categories);
  console.log(categories); */

  const categories = useAppSelector(
    (state: RootState) => state.categories.categories
  );

  const products = useAppSelector((state: RootState) => state.user.products);

  /*   const categories = useAppSelector((state: RootState) =>
    state.user.products.map((product) => product.category)
  );
 */

  const toastModal = useAppSelector(
    (state: RootState) => state.modals.toastModal
  );
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state: RootState) => state.user.userData);

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
    dispatch(activePostProductModal());
  };

  // const handleStateToast = () => {
  //   toastModal.isActive && dispatch(clearStateToast())
  // }

  /*   const handleActiveDeleteCategoryModal = () => {
    dispatch(activeDeleteCategoryModal());
  };
 */

  const handleActiveUpdateProductModal = () => {
    dispatch(
      activeUpdateProductModal({
        isActive: true,
      })
    );
  };

  const onUpdateProduct = (productID: string) => {
    dispatch(
      activeUpdateProductModal({
        isActive: true,
      })
    );
  };

  useEffect(() => {
    dispatch(getCategories())
      .then((response) => {
        dispatch(fetchCategoriesSuccess(response.payload));
      })
      .catch((error) => {
        console.log('Error fetching categories:', error);
      });
  }, []);

  const handleActiveUpdateCategoryModal = () => {
    dispatch(
      activeUpdateCategoryModal({
        isActive: true,
      })
    );
  };

  return loading ? (
    <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
  ) : (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Categorias
        </h4>
      </div>

      {/*  <div
        onClick={handleActiveDeleteCategoryModal}
        className="absolute right-100 top-2 cursor-pointer rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-5"
      >
        <button>Delete Category</button>
      </div> */}

      <div onClick={handleActiveUpdateCategoryModal} className="absolute right-48 top-2 cursor-pointer rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-5">
        <button>Modify Category</button>
      </div>
      <div
        onClick={handleActivePostProductModal} className="absolute right-2 top-2 cursor-pointer rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-5">
        <button>Add Category</button>
      </div>

      {categories?.map((category) => {
        return (
          <div
            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={crypto.randomUUID()}
          >
            <div className="col-span-3 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {/* <div className="h-12.5 w-15 rounded-md">
                  <img src={category?.photos[0]?.url} alt="Product" />
                </div> */}
                <p
                  className="text-sm text-black hover:underline dark:text-white"
                >
                  {category.categoryName}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TableFour;
