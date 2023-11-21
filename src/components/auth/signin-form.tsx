"use client";

import { LinkIcon, Github } from "lucide-react";
import Link from "next/link";
import Button from "../ui/button";
import Input from "../ui/input";
import { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(4, { message: "Username must have at least 4 characters." }),
    email: z
      .string()
      .trim()
      .min(4, { message: "Email is required!" })
      .email({ message: "Input a valid email!" }),
    repeatEmail: z.string().trim(),
    // { message: "Input a valid email!" }
    password: z
      .string()
      .min(8, { message: "Password must have at least 8 characters." }),
  })
  .refine((data) => data.email === data.repeatEmail, {
    path: ["repeatEmail"],
    message: "Emails do not match!",
  });

type SignInFormSchema = z.infer<typeof formSchema>;

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormSchema>({ resolver: zodResolver(formSchema) });

  const onSubmit: SubmitHandler<SignInFormSchema> = (data) => console.log(data);
  console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-xs flex-col items-stretch"
    >
      <h1 className="mb-8 self-center font-title text-4xl">Create Account!</h1>
      {errors.username && (
        <label htmlFor="email" className="mb-1 text-xs font-bold text-red-400">
          {errors.username.message}
        </label>
      )}
      <Input<SignInFormSchema>
        kind="rhf"
        type="text"
        label="username"
        register={register}
        className="p-4"
        placeholder="Username"
        border
      ></Input>
      <hr className="my-3" />
      {errors.email && (
        <label htmlFor="email" className="mb-1 text-xs font-bold text-red-400">
          {errors.email.message}
        </label>
      )}
      <Input<SignInFormSchema>
        kind="rhf"
        type="email"
        label="email"
        register={register}
        className="mb-4 p-4"
        placeholder="Email adress"
        border
      ></Input>
      {errors.repeatEmail && (
        <label htmlFor="email" className="mb-1 text-xs font-bold text-red-400">
          {errors.repeatEmail.message}
        </label>
      )}
      <Input<SignInFormSchema>
        kind="rhf"
        type="email"
        label="repeatEmail"
        register={register}
        className=" p-4"
        placeholder="Repeat email adress"
        border
      ></Input>
      <hr className="my-3" />
      {errors.password && (
        <label htmlFor="email" className="mb-1 text-xs font-bold text-red-400">
          {errors.password.message}
        </label>
      )}
      <Input<SignInFormSchema>
        kind="rhf"
        type="password"
        label="password"
        register={register}
        className="mb-6 p-4"
        placeholder="Password"
        border
      ></Input>
      <Button className=" bg-yellow-500 py-4 text-xl font-bold ">
        Continue
      </Button>
      <p className="my-4 self-center">
        Already have an account?
        <Link href="/auth/login">
          <LinkIcon className="mx-2 inline" size={16}></LinkIcon>{" "}
          <b className="text-yellow-600">Log in</b>
        </Link>
      </p>
      <hr />
      <Button className="mt-4" variant="ghost">
        Sign in with GitHub
        <Github className="ml-4 inline"></Github>
      </Button>
    </form>
  );
}
