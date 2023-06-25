import { useEffect, useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools"
import { RootState, useAppDispatch, useAppSelector } from "../../store"
import { activeToast, hiddenPostProductModal, hiddenUpdateProductModal } from "../../store/reducers/modalReducer";
import axios from "axios";
import { getProducts } from "../../store/thunks";
import { clearCurrentProductID } from "../../store/reducers/userReducer";
import { Products } from "../../types";

// export type formValues = {
//     name: string,
//     category?: string,
//     freeShipping: boolean,
//     description: string,
//     price: number,
//     stock: number,
//     photos?: [[
//         {
//             url: '',
//             public_id: '',
//         },
//     ],]
// }

let images: FileList

const FormUpdateProduct = () => {
    const currentProductID = useAppSelector((state: RootState) => state.user.currentProductID)
    const currentProductbyID = useAppSelector((state: RootState) => state.user.currentProductbyID)
    // console.log(currentProductID);
    // const [aux, setaux] = useState(true)
    // if(currentProductID){
    //     setaux(!aux);
    // }

    const dispatch = useAppDispatch();
    const activeDrop = useState(false)

    // products reducer
    const currentUser = useAppSelector((state: RootState) => state.user.userData)


    // modal Update Product is active?
    const updateProductModal = useAppSelector((state: RootState) => state.modals.updateProductModal)

    // control form Post Product
    const form = useForm<Products>({
        // defaultValues: async () => {
        //     if (currentProductID) {
        //         console.log(currentProductID);

        //         const response = await axios.get(`https://pf-henry-back-two.vercel.app/products/detail/${currentProductID}`)
        //         console.log(response.data);

        //         return response.data
        //     } 
        // },
        mode: "all",
    });


    const { register, control, handleSubmit, formState, reset } = form;
    const { errors, isDirty, isValid, isSubmitting, isSubmitted, isSubmitSuccessful } = formState;
    const [currentUpdatedProduct, setcurrentUpdatedProduct] = useState<Products>()

    const onSubmit = (data: Products) => {
        // dispatch(hiddenPostProductModal())
        // setcurrentPostProduct(data)
        console.log({Set: data});
        
        setcurrentUpdatedProduct(data);
        // console.log(currentPostProduct);
    }

    const onError = (errors: FieldErrors<Products>) => {
        console.log({errors});
    }

    // hidden Modal Post Product
    const handleHiddenPostProductModal = () => {
        dispatch(hiddenUpdateProductModal())
        dispatch(clearCurrentProductID())
    }


    // handling images files 

    let formData = new FormData();

    const onChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            images = e.target.files
        }
        console.log(images)
    };


    // Update product
    const uploadUpdatedProduct = async (data: Products) => {
        // let formData = new FormData();
        console.log({ currentUpdatedProduct2: currentProductbyID });

        // console.log(currentUpdatedProduct?.photos[0]);

        // console.log({ data, photos: currentUpdatedProduct?.photos[0] });
        // console.log(data.photos);

        // formData.append('data', JSON.stringify(currentUpdatedProduct))
        // console.log(images)
        // if (images.length) {
        //     for (let i = 0; i < images.length; i++) {
        //         formData.append('photos', images[i])
        //     }
        // }

        return await axios.put(
            'https://pf-henry-back-two.vercel.app/products/',
            currentUpdatedProduct
        );
    }

    useEffect(() => {
        if (isSubmitted) {
            if (isSubmitSuccessful) {

                dispatch(hiddenUpdateProductModal())

                console.log({ defaultvalues: formState.defaultValues })
                console.log({ currentProductbyID });

                uploadUpdatedProduct(currentUpdatedProduct as Products).then(response => {
                    console.log(response);

                    dispatch(activeToast({
                        isOk: true,
                        message: `El producto ${response?.data?.name} fue actualizado exitosamente`
                    }))
                    dispatch(getProducts(currentUser.id))
                }).catch(error => {
                    console.log(error);

                    dispatch(activeToast({
                        isOk: false,
                        message: `Ocurrio un problema. ${error?.response?.data}`
                    }))
                })
                reset()
            }
        }
        reset(currentProductbyID)

    }, [isSubmitSuccessful, reset, currentProductbyID])

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                <div className=" text-black">
                    <div className="pb-6">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="nameProduct" className="block text-sm font-medium leading-6 text-gray-900">Nombre del Producto</label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input type="text" {...register("name", {
                                            required: {
                                                value: true,
                                                message: "El nombre es requerido."
                                            },
                                            pattern: {
                                                value: /^[A-Za-z0-9\s]+$/,
                                                message: "El nombre es invalido."
                                            },
                                            validate: {
                                                // nameAlreadyExist: async (fieldValue) => {
                                                //     const response = await axios.post(
                                                //         'https://pf-henry-back-two.vercel.app/products?page=1',
                                                //         {
                                                //             price: { isSorted: true, order: 'desc' },
                                                //             relevant: { isSorted: false, order: 'asc' },
                                                //         }
                                                //     );

                                                //     // Si ya existe un producto con ese nombre
                                                //     let alreadyExistProduct = false;
                                                //     if (response.data.products?.find((product: Products) => (product.name.toLowerCase() == fieldValue.toLowerCase()))) {
                                                //         alreadyExistProduct = false;
                                                //     } else {
                                                //         alreadyExistProduct = true;
                                                //     }

                                                //     return alreadyExistProduct || "Ya existe un producto con ese nombre."
                                                // }
                                            },
                                        })} id="nameProduct" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full" placeholder="nombre del producto" />
                                    </div>
                                    <p className="text-xs">{errors.name?.message}</p>
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Categoria</label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input type="text" {...register("category")} id="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full" placeholder="categoria" />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-2 flex row-span-1 justify-center items-center">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Envio Gratis</label>
                                <input type="checkbox" {...register("freeShipping")} id="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="categoria" />
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Precio</label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input type="text" {...register("price", {
                                            required: {
                                                value: true,
                                                message: "El precio es requerido."
                                            },
                                            validate: {
                                                isNumber: (fieldValue) => {
                                                    return (!isNaN(Number(fieldValue)) && Number(fieldValue) > 0) || "El precio es invalido."
                                                }
                                            }
                                        })} id="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full" placeholder="precio" />
                                    </div>
                                    <p className="text-xs">{errors.price?.message}</p>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Cantidad</label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                        <input type="text" {...register("stock", {
                                            required: {
                                                value: true,
                                                message: "La cantidad es requerida."
                                            },
                                            validate: {
                                                isNumber: (fieldValue) => {
                                                    return (!isNaN(Number(fieldValue)) && Number(fieldValue) > 0) || "La cantidad es invalida."
                                                }
                                            }
                                        })} id="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full" placeholder="cantidad" />
                                    </div>
                                    <p className="text-xs">{errors.stock?.message}</p>
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">Descripcion</label>
                                <div className="mt-2">
                                    <textarea id="about" {...register("description", {
                                        required: {
                                            value: true,
                                            message: "La descripcion es requerida."
                                        },
                                        pattern: {
                                            value: /^[A-Za-z0-9\s]+$/,
                                            message: "La descripcion es invalida.."
                                        },
                                    })} rows={3} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "></textarea>
                                    <p className="text-xs">{errors.description?.message}</p>
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Imagenes del producto</label>
                                <div className={`mt-2 flex justify-center rounded-lg border border-dashed  px-6 py-10 ${!activeDrop && "bg-bodydark"}`}>
                                    <div className="text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                        </svg>
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label htmlFor="file-upload" className={`relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500`}>
                                                <span>Upload a file</span>
                                                <input id="file-upload" {...register("photos")} onChange={(onChangeImages)} type="file" className="sr-only" multiple />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-x-4">
                    <button type="button" onClick={handleHiddenPostProductModal} className="text-sm font-semibold  text-gray-900 px-3 py-2 rounded-md bg-meta-7 text-white">Cancel</button>
                    <button type="submit" onClick={() => {
                        console.log("presiono aqui");

                    }} disabled={!isDirty || !isValid || isSubmitting} className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${(!isDirty || !isValid || isSubmitting) ? "bg-bodydark" : "bg-meta-3"}`}>Update</button>
                </div>
            </form>
            <DevTool control={control} />
        </div>

    )
}

export default FormUpdateProduct