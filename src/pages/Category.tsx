import Breadcrumb from '../components/Breadcrumb';

import { ModalUpdateProduct, ModalPostCategory } from '../components/Modals';
import { Toaster, toast } from 'react-hot-toast';
import TableOne from '../components/TableOne';
import TableThree from '../components/TableThree';
import DefaultLayout from '../layout/DefaultLayout';
import { RootState, useAppDispatch, useAppSelector } from '../store';
import FormPostCategory from './Form/FormPostCategory';
import FormUpdateCategory from './Form/FormUpdateCategory';

import { useEffect } from 'react';
import { clearStateToast } from '../store/reducers/modalReducer';

const Category = () => {
  const postProductModalisActive = useAppSelector(
    (state: RootState) => state.modals.postProductModalisActive
  );
  const updateProductModal = useAppSelector(
    (state: RootState) => state.modals.updateProductModal
  );
  const toastModal = useAppSelector(
    (state: RootState) => state.modals.toastModal
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    // console.log("products");

    if (toastModal.isActive) {
      if (toastModal.type == 'success') {
        console.log('success');

        toast.success(toastModal.message, {
          duration: 4000,
        });

        setTimeout(() => {
          dispatch(clearStateToast());
        }, 10000);
      } else {
        console.log('errpr');
        toast.error(toastModal.message, {
          duration: 6000,
        });
        setTimeout(() => {
          dispatch(clearStateToast());
        }, 10000);
      }
    }
  }, [toastModal.isActive]);

  return (
    <div>
      {toastModal.isActive && (
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              fontWeight: 'bold',
            },
          }}
        />
      )}
      <div className={postProductModalisActive ? 'block' : 'hidden'}>
        <ModalPostCategory>
          <FormPostCategory />
        </ModalPostCategory>
      </div>
      <div className={updateProductModal.isActive ? 'block' : 'hidden'}>
        <ModalPostCategory>
          <FormUpdateCategory />
        </ModalPostCategory>
      </div>

      {/* <div className={postAddOtherProductModalisActive ? "block" : "hidden"}>
        <ModalPostOtherProduct>
          <DecideAddOtherProductAbout />
        </ModalPostOtherProduct>
      </div> */}
      <DefaultLayout>
        <Breadcrumb pageName="Categorias" />
        <div className="relative flex flex-col gap-10">
          <TableThree />
          {/* <TableOne />
          <TableThree /> */}
        </div>
      </DefaultLayout>
    </div>
  );
};

export default Category;
