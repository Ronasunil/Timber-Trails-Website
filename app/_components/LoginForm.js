"use client";

import Link from "next/link";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthForm from "./AuthForm";
import FormInput from "./FormInput";
import AuthButton from "./AuthButton";

import { loginAction } from "../actions/authActions";
import { useState } from "react";
import SpinnerMini from "@/components/SpinnerMini";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "This field required 8 characters" }),
});

export default function LoginForm() {
  const [isLoading, setIsloading] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    setError,
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async function (data) {
    const { email, password } = data;
    setIsloading(true);
    const result = await loginAction(email, password);
    setIsloading(false);

    if (result.status === "fail") {
      setIsloading(false);
      setError("password", { type: "server", message: result.message });
      return;
    }

    router.push("/");
  };

  return (
    <AuthForm onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label="Email"
        error={errors?.email?.message}
        register={register("email")}
      />
      <FormInput
        label="Password"
        error={errors?.password?.message}
        register={register("password")}
        isPassWord={true}
      />
      <AuthButton disabled={isLoading}>
        {isLoading ? (
          <div className="flex gap-2 justify-center items-center  w-[100%]">
            <span>Login</span>
            <SpinnerMini />
          </div>
        ) : (
          "Login"
        )}
      </AuthButton>
      <Link href="/signup">
        First time here?{" "}
        <span className="underline text-slate-300 ">Sign up</span>
      </Link>
    </AuthForm>
  );
}
