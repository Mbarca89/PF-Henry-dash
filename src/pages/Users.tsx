import Breadcrumb from '../components/Breadcrumb';
import { Toaster, toast } from "react-hot-toast";
import TableFour from '../components/TableFour';
import DefaultLayout from '../layout/DefaultLayout';
import { RootState, useAppDispatch, useAppSelector } from '../store';
import { useEffect } from 'react';
import { clearStateToast } from '../store/reducers/modalReducer';
import { getUser } from '../store/thunks';

const Users = () => {
  
  const toastModal = useAppSelector((state: RootState) => state.modals.toastModal)
  const users = useAppSelector((state: RootState) => state.user.users)
  const dispatch = useAppDispatch()

  useEffect(() => {
    // console.log("products");
    dispatch(getUser())
    if (toastModal.isActive) {
      if (toastModal.type == "success") {
        console.log("success");

        toast.success(toastModal.message, {
          duration: 4000,
        });

        setTimeout(() => {
          dispatch(clearStateToast())
        }, 10000);
      } else {
        console.log("errpr");
        toast.error(toastModal.message, {
          duration: 6000,
        });
        setTimeout(() => {
          dispatch(clearStateToast())
        }, 10000);
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
   
      <DefaultLayout>
        <Breadcrumb pageName="Usuarios" />
        <div className="flex flex-col gap-10 relative">
          <TableFour />
        </div>
      </DefaultLayout>

    </div>

  );
};

export default Users;
