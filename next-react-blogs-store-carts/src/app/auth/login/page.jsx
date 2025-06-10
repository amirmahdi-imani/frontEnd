'use client'

import React,{ useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock } from "lucide-react";
import  Link from "next/link";
import {loginSchema}from './loginSlice'
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../components/ui/toast";
import { loginUser } from './loginSlice'
import { useRouter } from 'next/navigation';

export default function Login() {
  const dispatch = useDispatch()
  const router = useRouter()
  const {showToast}= useToast()
  const {toastMessage, error,user,loading}= useSelector((state)=>state.login)

  useEffect(()=>{
    if(toastMessage){
      showToast({
        title :toastMessage,
        variant: error ? "error"
               :loading ? 'loading'
               :user ? 'success'
               :'default'
      })
    }

  },[toastMessage])

  useEffect(() => {
    if(user) {
      router.push('../../')
    }
  },[user])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log("Login data:", data);
    dispatch(loginUser(data))
    
  };

  return (
    <div className="
      flex justify-center items-center h-screen rounded-xl
      bg-gradient-to-br from-gray-400/20 via-gray-400/30 to-gray-400/90
    ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 rounded-xl shadow-md bg-gray-900"
      >
        <h2 className="text-4xl font-bold text-center text-gray-300 mb-8">
          Login
        </h2>
        {/* ایمیل */}
        <div className="mb-6">
          {errors.email && (
            <p className="text-sm text-rose-600/80">{errors.email.message}</p>
          )}
          <div className="relative flex items-center gap-2">
            <Mail className="text-gray-500" />
            <input
              type="email"
              {...register("email")}
              placeholder="Your Email"
              className="w-full px-3 py-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* رمز عبور */}
        <div className="mb-6">
          {errors.password && (
            <p className="text-sm text-rose-600/80">{errors.password.message}</p>
          )}
          <div className="relative flex items-center gap-2">
            <Lock className="text-gray-500" />
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="w-full px-3 py-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="flex flex-row ml-9 gap-3">
            <p>Need an account?</p><Link href="../../auth/signup" className="underline hover:text-blue-600" >Sign Up</Link>
          </div>
        </div>

        {/* دکمه ورود */}
        <button
          type="submit"
          className="
            w-full py-2 rounded bg-blue-600/60 text-white font-semibold text-lg
            hover:bg-blue-700 transition-colors
          "
        >
          Login
        </button>
      </form>
    </div>
  );
}





