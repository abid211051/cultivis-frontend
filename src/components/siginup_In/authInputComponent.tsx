"use client";
import Link from "next/link";
import React from "react";

type InputProps = {
  type: string;
  label: string;
  isForgotPass?: boolean;
  placeholder?: string;
  name: string;
  required?: boolean;
  className?: string;
};

const AuthInputComponent = ({
  type,
  label,
  isForgotPass = false,
  placeholder,
  name,
  required = false,
  className,
}: InputProps) => {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-1">
        <p className="text-sm">{label}</p>
        {isForgotPass && (
          <Link href={"#"} className="text-xs hover:underline">
            Forgot Password?
          </Link>
        )}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        required={required}
        className={`outline-0 border-2 p-1.5 w-full rounded-md ${className}`}
      />
    </div>
  );
};

export default React.memo(AuthInputComponent);
