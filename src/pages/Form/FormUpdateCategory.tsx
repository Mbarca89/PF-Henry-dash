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
        'http://localhost:3000/categories',
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
        console.error('Bad request:', error.response.data);
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

  // handling images files

  let formData = new FormData();

  const onChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      images = e.target.files;
    }
    console.log(images);
  };

  useEffect(() => {
    dispatch(getCategories())
      .then((response) => {
        console.log('Categories:', response);
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
                  Categoria
                </label>
                <div className="mt-2">
                  <div className="ring-gray-300 focus-within:ring-indigo-600 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                    <select
                      id="username"
                      name="category"
                      className="text-gray-900 placeholder:text-gray-400 block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                      onChange={(e) => {
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
                        value=""
                        disabled
                        selected
                        style={{ color: 'lightgray' }}
                      >
                        Select a category
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

                  {/*  <div className="mt-2">
                  <div className="ring-gray-300 focus-within:ring-indigo-600 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                    <input
                      {...register('id')}
                      type="text"
                      id="id"
                      className="text-gray-900 placeholder:text-gray-400 block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Nuevo nombre "
                    />
                  </div> */}
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
            Cancel
          </button>
          <button
            type="submit"
            onClick={() => {
              console.log('presiono aqui');
            }}
            disabled={!isDirty || !isValid || isSubmitting}
            className={`bg-indigo-600 hover:bg-indigo-500 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              !isDirty || !isValid || isSubmitting ? 'bg-bodydark' : 'bg-meta-3'
            }`}
          >
            Update
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default FormUpdateCategory;
