import React from "react"

type ModalPostOtherProduct = {
    children: React.ReactNode
}

const ModalPostOtherProduct = ({ children }: ModalPostOtherProduct) => {
    return (
        <div className="w-full absolute bg-transparent flex justify-center z-99999 top-12">
            <div className="w-1/3 p-5 bg-white rounded-lg">
                {children}
            </div>
        </div>
    )
}

export default ModalPostOtherProduct