import React from "react";

type Props = {
  children: React.ReactNode;
  isVisible: boolean;
  onCloseModal: () => void
};

export default function Popup({ children, isVisible, onCloseModal }: Props) {
  console.log('isVisible', isVisible)

  if (!isVisible) return null

  return (
    <div onClick={onCloseModal} className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center ">
      {children}
    </div>
  );
}
