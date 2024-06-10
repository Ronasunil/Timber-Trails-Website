"use client";

import { useState } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthForm from "./AuthForm";
import FormInput from "./FormInput";
import AuthButton from "./AuthButton";
import SpinnerMini from "@/components/SpinnerMini";

import { signupAction } from "../actions/authActions";

// validation schema
const loginSchema = z.object({
  name: z.string().min(3, { message: "Name atleast need 3 characters" }),
  email: z.string().min(1, { message: "This field is required" }).email(),
  password: z.string().min(8, { message: "Atleast need 8 characters" }),
});

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "", name: "" },
    resolver: zodResolver(loginSchema),
  });

  const [isLoading, setIsloading] = useState(false);

  const onSubmit = async function (data) {
    const { name, email, password } = data;

    setIsloading(true);
    await signupAction(name, email, password);
    setIsloading(false);
  };
  return (
    <AuthForm onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label="Name"
        register={register("name")}
        error={errors?.name?.message}
      />
      <FormInput
        label="Email"
        register={register("email")}
        error={errors?.email?.message}
      />
      <FormInput
        label="Password"
        register={register("password")}
        error={errors?.password?.message}
        isPassWord={true}
      />
      <AuthButton disabled={isLoading}>
        {isLoading ? (
          <div className="flex justify-center items-center gap-2">
            <span>Creating</span>
            <SpinnerMini />
          </div>
        ) : (
          "Create an account"
        )}
      </AuthButton>
    </AuthForm>
  );
}
