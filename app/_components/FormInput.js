import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function FormInput({
  register,
  label,
  error,
  isPassWord = false,
}) {
  const [showPassword, setShowPassword] = useState(isPassWord);

  const handleShowPassword = function () {
    setShowPassword((password) => !password);
  };
  return (
    <div className="flex flex-col gap-1 relative">
      <label>{label}</label>
      <div className="relative w-[100%]">
        {isPassWord && (
          <i
            onClick={handleShowPassword}
            className="absolute top-[50%] translate-y-[-50%] left-[90%] w-[5%] text-primary-800 cursor-pointer"
          >
            {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
          </i>
        )}
        <input
          className="h-10 outline-none focus: outline-2 w-[100%] focus: outline-offset-1 focus:outline-yellow-600 text-gray-800 px-4 text-xl"
          type={showPassword ? "text" : "password"}
          {...register}
        />
      </div>

      {error && (
        <label className="text-red-600 absolute top-full">{error}</label>
      )}
    </div>
  );
}
