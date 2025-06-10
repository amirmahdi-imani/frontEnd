'use client'

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Lock, KeyRound } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, signUpSchema } from "./signupSlice";
import { useToast } from "../../components/ui/toast";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const { toastMessage, error, user, loading } = useSelector(
    (state) => state.signup
  );
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  useEffect(() => {
    if (toastMessage) {
      showToast({
        title: toastMessage,
        variant: error
          ? "error"
          : loading
          ? "loading"
          : user
          ? "success"
          : "default",
      });
    }
  }, [toastMessage]);

  useEffect(() => {
    if (user && !loading && !error) {
      router.push("/");
    }
  }, [user, loading, error, router]);

  const onSubmit = (data) => {
    console.log("Data submitted:", data);
    dispatch(signupUser(data));
  };

  return (
    <div
      className="
    grid lg:grid-cols-2  rounded-xl gap-2
    bg-gradient-to-br from-gray-400/20 via-gray-400/30 to-gray-400/90
    "
    >
      <form onSubmit={handleSubmit(onSubmit)} className="mt-15">
        <h2 className="py-2 text-5xl font-bold mb-6 mt-2 text-center text-gray-300">
          SignUp
        </h2>
        {/* نام */}
        <div className="flex flex-col justify-center items-center mt-25 ">
          {errors.name && (
            <p className="text-sm  text-rose-600/80">{errors.name.message}</p>
          )}
          <div className="relative flex flex-row justify-center items-center w-8/9 gap-5">
            <User />
            <input
              type="text"
              {...register("name")}
              className="
            w-1/2 rounded-sm px-3 py-1 
            border border-gray-400 focus:border-blue-500/95 focus:ring-1 focus:ring-blue-500/95 outline-none
            "
              placeholder="Your Name"
            />
          </div>
        </div>

        {/* ایمیل */}
        <div className="flex flex-col justify-center items-center py-5">
          {errors.email && (
            <p className="text-sm text-rose-600/80">{errors.email.message}</p>
          )}
          <div className="relative flex flex-row justify-center items-center w-8/9 gap-5">
            <Mail />
            <input
              type="email"
              {...register("email")}
              className="
            w-1/2 rounded-sm px-3 py-1 
            border border-gray-400 focus:border-blue-500/95 focus:ring-1 focus:ring-blue-500/95 outline-none
            "
              placeholder="Your Email"
            />
          </div>
        </div>

        {/* رمز عبور */}
        <div className="flex flex-col justify-center items-center">
          {errors.password && (
            <p className="text-sm text-rose-600/80">{errors.password.message}</p>
          )}
          <div className="relative flex flex-row justify-center items-center w-8/9 gap-5">
            <Lock />
            <input
              type="password"
              {...register("password")}
              className="
            w-1/2 rounded-sm px-3 py-1 
            border border-gray-400 focus:border-blue-500/95 focus:ring-1 focus:ring-blue-500/95 outline-none
            "
              placeholder="Password"
            />
          </div>
        </div>

        {/* تکرار رمز */}
        <div className="flex flex-col justify-center items-center py-5">
          {errors.confirmPassword && (
            <p className="text-sm text-rose-600/80">
              {errors.confirmPassword.message}
            </p>
          )}
          <div className="relative flex flex-row justify-center items-center w-8/9 gap-5">
            <KeyRound />
            <input
              type="password"
              {...register("confirmPassword")}
              className="
            w-1/2 rounded-sm px-3 py-1 
            border border-gray-400 focus:border-blue-500/95 focus:ring-1 focus:ring-blue-500/95 outline-none
            "
              placeholder="Repeat your password"
            />
          </div>
        </div>

        {/* دکمه ثبت */}
        <div className="flex flex-col justify-center items-center mb-15 ml-9 mt-15">
          <button
            type="submit"
            className="
                text-gray-300 font-semibold rounded-sm px-6 py-2 
    border border-gray-400
    bg-gradient-to-br from-gray-600/40 via-gray-600/60 to-gray-700/80
    hover:bg-gradient-to-br hover:from-gray-500/60 hover:via-gray-500/80 hover:to-gray-600/90
    transition-colors duration-300
    focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1
    cursor-pointer
          "
          >
            Register
          </button>
        </div>
      </form>
      <div className="hidden md:flex justify-center items-center px-12">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
          className="h-auto rounded-sm py-1 mt-14 mr-55"
          alt="SignUp Illustration"
        />
      </div>
    </div>
  );
}
