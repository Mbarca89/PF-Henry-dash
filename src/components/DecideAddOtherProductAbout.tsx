import React from "react"
import { useAppDispatch } from "../store";
import { activePostAddOtherModal, hiddenPostAddOtherModal } from "../store/reducers/modalReducer";


const DecideAddOtherProductAbout = () => {
    const dispatch = useAppDispatch();

    const handleHiddenPostAddOtherProductModal = () => {
        dispatch(hiddenPostAddOtherModal())
    }

    const handleActivePostAddOtherProductModal = () => {
        dispatch(activePostAddOtherModal())
    }

    return (
        <div className="flex justify-center items-center gap-x-4">
            <p className="text-boxdark-2">¿Deseas agregar otro producto?</p>
            <button type="button" onClick={handleHiddenPostAddOtherProductModal} className="text-sm font-semibold  text-gray-900 px-3 py-2 rounded-md bg-meta-7 text-white">Cancel</button>
            <button type="submit" onClick={handleActivePostAddOtherProductModal} className="rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-primary">Save</button>
        </div>
    );
}

export default DecideAddOtherProductAbout;