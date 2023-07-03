import { configureStore } from "@reduxjs/toolkit"
import { counterReducer, modalsReducer, userReducer, categoriesReducer } from "./reducers"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"


export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer,
        modals: modalsReducer,
        categories: categoriesReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector