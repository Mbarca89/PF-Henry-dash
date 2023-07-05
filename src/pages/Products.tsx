import Breadcrumb from '../components/Breadcrumb';
import { ModalUpdateProduct, ModalPostProduct, ModalImagesViews } from '../components/Modals';
import { Toaster, toast } from "react-hot-toast";
import TableOne from '../components/TableOne';
import TableTwo from '../components/TableTwo';
import DefaultLayout from '../layout/DefaultLayout';
import { RootState, useAppDispatch, useAppSelector } from '../store';
import FormPostProduct from "./Form/FormPostProduct"
import FormUpdateProduct from "./Form/FormUpdateProduct"
import { useEffect } from 'react';
import { clearStateToast } from '../store/reducers/modalReducer';
import { getProducts, getAllProducts, getAllCategories } from '../store/thunks';
import TableFive from '../components/TableFive';

const Products = () => {
  const postProductModalisActive = useAppSelector((state: RootState) => state.modals.postProductModalisActive)
  const updateProductModal = useAppSelector((state: RootState) => state.modals.updateProductModal)
  const imagesViewsModal = useAppSelector((state: RootState) => state.modals.imagesViewsModal)
  const toastModal = useAppSelector((state: RootState) => state.modals.toastModal)
  const currentUser = useAppSelector((state: RootState) => state.user.userData)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(currentUser.role === 'admin'){
      dispatch(getAllProducts())
      if (toastModal.isActive) {
        if (toastModal.type == "success") {  
          toast.success(toastModal.message, {
            duration: 4000,
          });
  
          setTimeout(() => {
            dispatch(clearStateToast())
          }, 10000);
        } else {
          toast.error(toastModal.message, {
            duration: 6000,
          });
          setTimeout(() => {
            dispatch(clearStateToast())
          }, 10000);
        }
      }
    } else {
      
      dispatch(getAllCategories())
      dispatch(getProducts(currentUser.id))
      if (toastModal.isActive) {
        if (toastModal.type == "success") {  
          toast.success(toastModal.message, {
            duration: 4000,
          });
  
          setTimeout(() => {
            dispatch(clearStateToast())
          }, 10000);
        } else {
          toast.error(toastModal.message, {
            duration: 6000,
          });
          setTimeout(() => {
            dispatch(clearStateToast())
          }, 10000);
        }
      }
    }
  }, [toastModal.isActive])

  return (
    <div>
      {toastModal.isActive && <Toaster position="top-center" toastOptions={
        {
          style: {
            fontWeight: 'bold'
          }
        }
      } />}
      {/* FORM POST PRODUCT MODAL */}
      <div className={postProductModalisActive ? "block" : "hidden"}>
        <ModalPostProduct>
          <FormPostProduct />
        </ModalPostProduct>
      </div>

      {/* FORM UPDATE PRODUCT MODAL */}
      <div className={updateProductModal.isActive ? "block" : "hidden"}>
        <ModalPostProduct>
          <FormUpdateProduct />
        </ModalPostProduct>
      </div>

      {/* FORM IMAGES VIEWS MODAL */}
      <div className={imagesViewsModal.isActive ? "block" : "hidden"}>
        <ModalImagesViews>
          {/* MODAL QUE QUIERES MOSTRAR */}
        </ModalImagesViews>
      </div>

      
      <DefaultLayout>
        <Breadcrumb pageName="Mis productos" />
        <div className="flex flex-col gap-10 relative">
          {currentUser.role === 'seller' ? <TableTwo /> : <TableFive/>}
          {/* <TableOne />
          <TableThree /> */}
        </div>
      </DefaultLayout>

    </div>

  );
};

export default Products;
