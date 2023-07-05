import { useEffect, useState } from 'react';
import { useForm, FieldErrors } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import {
  activeToast,
  hiddenPostProductModal,
  hiddenUpdateProductModal,
} from '../../store/reducers/modalReducer';
import { getCategories } from '../../store/thunks';
import axios from 'axios';
import { getProducts } from '../../store/thunks';
import { clearCurrentProductID } from '../../store/reducers/userReducer';
import { Products } from '../../types';
import { fetchCategoriesSuccess } from '../../store/reducers/categoriesReducer';
import { REACT_APP_SERVER_URL } from '../../../config';

export type formValues = {
  name: string;
  category?: string;
  freeShipping: boolean;
  description: string;
  price: number;
  stock: number;
  id: string;
  photos: FormData;
};

let images: FileList;

const FormUpdateCategory = () => {
  /*   const currentProductID = useAppSelector(
    (state: RootState) => state.user.currentProductID
  ); */
  /*   const currentProductbyID = useAppSelector( 
    (state: RootState) => state.user.currentProductbyID
  ); */

  const categories = useAppSelector(
    (state: RootState) => state.categories.categories
  );

  const categories2 = useAppSelector(
    (state: RootState) => state.categories.categories
  );

  /* 
  const [selectedCategory, setSelectedCategory] = useState<string>(''); */

  const [selectedCategory, setSelectedCategory] = useState<{
    categoryName: string;
    // Update the type of 'products' based on your requirements
    id: string;
  }>({
    categoryName: '',

    id: '',
  });

  console.log(categories);

  const dispatch = useAppDispatch();
  const activeDrop = useState(false);
  const [handleDisabledButtonEliminar, sethandleDisabledButtonEliminar] = useState(true)
  const [handleDisabledButtonActualizar, sethandleDisabledButtonActualizar] = useState(true)

  const form = useForm<formValues>({
    mode: 'all',
  });

  const { register, control, handleSubmit, formState, reset } = form;
  const {
    errors,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
  } = formState;

  const onSubmit = async (data: formValues) => {
    try {
      const modifiedData = {
        categoryName: selectedCategory.categoryName,
        id: selectedCategory.id,
      };

      const response = await axios.put(
        `${REACT_APP_SERVER_URL}/categories`,
        modifiedData
      );

      if (response.status === 200) {
        console.log('User has been created');
        dispatch(hiddenUpdateProductModal()); // Dispatch the action to close the modal

        dispatch(
          activeToast({
            isOk: true,
            message: `La categoría ${response?.data?.categoryName} fue modificada exitosamente`,
          })
        );
        reset();

        setTimeout(() => {
          // Refresh the page
          window.location.reload();
        }, 800);
      }

      return response;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        dispatch(
          activeToast({
            isOk: false,
            message: `${error.response.data}`,
          })
        );
      } else {
        dispatch(
          activeToast({
            isOk: false,
            message: `${error.response.data}`,
          })
        );
      }
    }
  };

  const onSubmitDelete = async (data: formValues) => {
    try {
      const response = await axios.delete(
        `${REACT_APP_SERVER_URL}/categories/${selectedCategory.id}` // Include the id in the URL
      );

      if (response.status === 200) {
        dispatch(hiddenUpdateProductModal()); // Dispatch the action to close the modal

        dispatch(
          activeToast({
            isOk: true,
            message: `La categoría ${selectedCategory.categoryName} fue eliminada exitosamente`,
          })
        );
        reset();

        setTimeout(() => {
          // Refresh the page
          window.location.reload();
        }, 800);
      }

      return response;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data);
      } else {
        console.error('An error occurred:', error.message);
      }
    }
  };

  const onError = (errors: FieldErrors<Products>) => {
    console.log({ errors });
  };

  // hidden Modal Post Product
  const handleHiddenPostProductModal = () => {
    dispatch(hiddenUpdateProductModal());
    dispatch(clearCurrentProductID());
    reset();
  };

  useEffect(() => {
    dispatch(getCategories())
      .then((response) => {
        dispatch(fetchCategoriesSuccess(response.payload)); // Dispatch the fetchCategoriesSuccess action with the payload data
      })
      .catch((error) => {
        console.log('Error fetching categories:', error);
      });
  }, [dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation(); // Stop the event from propagating to the button
    const { value } = event.target;
    setSelectedCategory((prevState) => ({
      ...prevState,
      categoryName: value,
    }));
  };

  /*  */
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className=" text-black">
          <div className="pb-6">
            <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Modificar Categoria
                </label>
                <div className="mt-2">
                  <div className="ring-gray-300 focus-within:ring-indigo-600 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                    <select
                      id="username"
                      name="category"
                      defaultValue={'Seleccionar Categoría'}
                      className="text-gray-900 placeholder:text-gray-400 block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                      onChange={(e) => {
                        sethandleDisabledButtonActualizar(false)
                        const selectedCategoryId = e.target.value;
                        const selectedCategoryObject = categories.find(
                          (category) => category.id === selectedCategoryId
                        );
                        setSelectedCategory({
                          ...selectedCategory,
                          /*  categoryName:
                            selectedCategoryObject?.categoryName ?? '', */
                          id: selectedCategoryId,
                        });
                      }}
                    >
                      <option
                        value="Seleccionar Categoría"
                        disabled
                        style={{ color: 'lightgray' }}
                      >
                        Seleccionar Categoría
                      </option>
                      {categories2.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Nuevo nombre Categoria
                </label>

                <div className="mt-2">
                  <div className="ring-gray-300 focus-within:ring-indigo-600 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                    <input
                      {...register('category')}
                      id="username"
                      type="text"
                      className="text-gray-900 placeholder:text-gray-400 block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Nuevo nombre "
                      onInput={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-4">
          <button
            type="button"
            onClick={handleHiddenPostProductModal}
            className="text-gray-900 rounded-md  bg-meta-7 px-3 py-2 text-sm font-semibold text-white"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={handleDisabledButtonActualizar}
            className={`bg-indigo-600 hover:bg-indigo-500 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${handleDisabledButtonActualizar ? 'bg-bodydark' : 'bg-meta-3'
              }`}
          >
            Actualizar
          </button>
        </div>
      </form>
      <hr className='mt-2 ring-gray-300' />
      <form onSubmit={handleSubmit(onSubmitDelete)} noValidate>
        <div className=" text-black">
          <div className="pb-6">
            <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Eliminar Categoria
                </label>
                <div className="mt-2">
                  <div className="ring-gray-300 focus-within:ring-indigo-600 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                    <select
                      id="username"
                      name="category"
                      defaultValue={'Seleccionar Categoría'}
                      className="text-gray-900 placeholder:text-gray-400 block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                      onChange={(e) => {
                        sethandleDisabledButtonEliminar(false)
                        console.log('onChange event fired');
                        const selectedCategoryId = e.target.value;
                        console.log('selectedCategoryId:', selectedCategoryId);
                        const selectedCategoryObject = categories.find(
                          (category) => category.id === selectedCategoryId
                        );
                        console.log(
                          'selectedCategoryObject:',
                          selectedCategoryObject
                        );

                        setSelectedCategory({
                          ...selectedCategory,
                          /*  categoryName:
                            selectedCategoryObject?.categoryName ?? '', */
                          id: selectedCategoryId,
                        });
                      }}
                    >
                      <option
                        value="Seleccionar Categoría"
                        disabled
                        style={{ color: 'lightgray' }}
                      >
                        Seleccionar Categoría
                      </option>
                      {categories2.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-4">
          <button
            type="button"
            onClick={handleHiddenPostProductModal}
            className="text-gray-900 rounded-md  bg-meta-7 px-3 py-2 text-sm font-semibold text-white"
          >
            Cancelar
          </button>
          <button
            type="submit"
            onClick={() => {
              console.log('presiono aqui');
            }}
            disabled={handleDisabledButtonEliminar}
            className={`bg-indigo-600 hover:bg-indigo-500 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${handleDisabledButtonEliminar ? 'bg-bodydark' : 'bg-meta-3'
              }`}>
            Eliminar
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default FormUpdateCategory;
