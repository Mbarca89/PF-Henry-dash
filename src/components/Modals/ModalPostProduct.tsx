import React from "react"

type ModalPostProduct = {
    children: React.ReactNode
}

const ModalPostProduct = ({ children }: ModalPostProduct) => {
    return (
        <div className="w-full absolute bg-transparent flex flex-row justify-center z-99999 items-center">
            <div className="w-1/3 p-5 bg-white rounded-lg">
                {children}
            </div>
        </div>
    )
}

export default ModalPostProduct