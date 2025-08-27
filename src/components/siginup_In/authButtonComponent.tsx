"use client";
import React from "react";
import AuthLoadingComponent from "./authLoadingComponent";

const AuthButtonComponent = ({
  children = null,
  text = "",
  disabled = false,
}: {
  children?: React.ReactNode;
  text?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      className={`flex-1 flex items-center p-2.5 ${
        disabled
          ? "bg-gray-200"
          : "lg:bg-black lg:text-white bg-white text-black"
      } gap-3 text-sm rounded-md active:scale-95 font-medium`}
      disabled={disabled}
    >
      {children}
      {!disabled && text ? (
        <span className="flex-1 text-center">{text}</span>
      ) : (
        <AuthLoadingComponent loading={disabled} />
      )}
    </button>
  );
};

export default React.memo(AuthButtonComponent);
