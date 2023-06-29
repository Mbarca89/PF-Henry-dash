import React from 'react';

type ModalPostCategory = {
  children: React.ReactNode;
};

const ModalPostCategory = ({ children }: ModalPostCategory) => {
  return (
    <div className="absolute top-12 z-99999 flex w-full justify-center bg-transparent">
      <div className="w-1/3 rounded-lg bg-white p-5">{children}</div>
    </div>
  );
};

export default ModalPostCategory;
