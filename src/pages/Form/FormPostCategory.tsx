import { useEffect, useState } from 'react';
import { useForm, FieldErrors } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import {
  activeToast,
  hiddenPostProductModal,
} from '../../store/reducers/modalReducer';
import axios from 'axios';
import { getProducts } from '../../store/thunks';

export type formValues = {
  name: string;
  category?: string;
  freeShipping: boolean;
  description: string;
  price: number;
  stock: number;
  photos: FormData;
};

let images: FileList;

const FormPostCategory = () => {
  const dispatch = useAppDispatch();
  const activeDrop = useState(false);

  // products reducer
  const products = useAppSelector((state: RootState) => state.user.products);
  const currentUser = useAppSelector((state: RootState) => state.user.userData);

  // control form Post Product
  const form = useForm<formValues>({
    // defaultValues: async () => {
    //     if(isUpdate){
    //         const response = await axios(`http://localhost:3000/products/${currentUser.id}`);
    //     const data = response.data;
    //     return data
    //     } else {
    //         return {

    //         }
    //     }

    // },
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
  const [currentPostProduct, setcurrentPostProduct] = useState<formValues>();

  /*   const onSubmit = (data: formValues) => {
    console.log(data);
    // dispatch(hiddenPostProductModal())
    // setcurrentPostProduct(data)
    setcurrentPostProduct({ ...data, photos: formData });
    // console.log(currentPostProduct);
  }; */

  /*   const onSubmit = async (data: formValues) => {
    try {
      const modifiedData = { ...data, categoryName: data.category };
      delete modifiedData.category;
      const response = await axios.post(
        'http://localhost:3000/categories',
        modifiedData
      );

      if (response.status === 201) {
        console.log('User has been created');
             alert('Category created successfully!');

    
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
  }; */

  const onSubmit = async (data: formValues) => {
    try {
      const modifiedData = { ...data, categoryName: data.category };
      delete modifiedData.category;
      const response = await axios.post(
        'http://localhost:3000/categories',
        modifiedData
      );

      if (response.status === 201) {
        console.log('User has been created');
        /*      alert('Category created!'); */

        dispatch(hiddenPostProductModal());

        dispatch(
          activeToast({
            isOk: true,
            message: `La categoría ${response?.data?.categoryName} fue creada exitosamente`,
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

  const onError = (errors: FieldErrors<formValues>) => {
    console.log(errors);
  };

  // hidden Modal Post Product
  const handleHiddenPostProductModal = () => {
    dispatch(hiddenPostProductModal());
  };

  // handling images files

  let formData = new FormData();

  const onChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      images = e.target.files;
    }
    console.log(images);
  };

  // Post product
  /*   const postProduct = async (data: formValues) => {
    let formData = new FormData();

    formData.append('data', JSON.stringify(currentPostProduct));
    console.log(images);
    for (let i = 0; i < images.length; i++) {
      formData.append('photos', images[i]);
    }

    return await axios.post('http://localhost:3000/categories', formData);
  };
 */
  /*   useEffect(() => {
    // console.log("FormPostCategory");

    if (isSubmitted) {
      if (isSubmitSuccessful) {
        dispatch(hiddenPostProductModal());

        postProduct(currentPostProduct as formValues)
          .then((response) => {
            console.log(response);

            dispatch(
              activeToast({
                isOk: true,
                message: `El producto ${response?.data?.name} fue creado exitosamente`,
              })
            );
            dispatch(getProducts(currentUser.id));
          })
          .catch((error) => {
            console.log(error);

            dispatch(
              activeToast({
                isOk: false,
                message: `Ocurrio un problema. ${error?.response?.data}`,
              })
            );
          });
        reset();
      }
    }
  }, [isSubmitSuccessful, reset]);
 */
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
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
                    <input
                      type="text"
                      {...register('category')}
                      id="username"
                      className="text-gray-900 placeholder:text-gray-400 block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="categoria"
                    />
                  </div>
                </div>
              </div>

              {/* <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Imagenes del producto
                </label>
                <div
                  className={`mt-2 flex justify-center rounded-lg border border-dashed  px-6 py-10 ${
                    !activeDrop && 'bg-bodydark'
                  }`}
                >
                  <div className="text-center">
                    <svg
                      className="text-gray-300 mx-auto h-12 w-12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="text-gray-600 mt-4 flex text-sm leading-6">
                      <label
                        htmlFor="file-upload"
                        className={`text-indigo-600 focus-within:ring-indigo-600 hover:text-indigo-500 relative cursor-pointer rounded-md bg-white font-semibold focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2`}
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          {...register('photos')}
                          onChange={onChangeImages}
                          type="file"
                          className="sr-only"
                          multiple
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-gray-600 text-xs leading-5">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </div>
              </div> */}
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
            disabled={!isDirty || !isValid || isSubmitting}
            className={`bg-indigo-600 hover:bg-indigo-500 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              !isDirty || !isValid || isSubmitting
                ? 'bg-bodydark'
                : 'bg-primary'
            }`}
          >
            Create
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default FormPostCategory;
