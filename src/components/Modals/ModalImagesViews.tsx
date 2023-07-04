import React from "react"

type ModalUpdateProduct = {
    children: React.ReactNode
}

const ModalImagesViews = ({ children }: ModalUpdateProduct) => {
    return (
        <div className="w-full absolute bg-transparent flex justify-center z-99999 top-12">
            <div className="w-1/3 p-5 bg-white rounded-lg">
                {children}
            </div>
        </div>
    )
}

export default ModalImagesViews