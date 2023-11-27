"use client";

import { LinkIcon } from "lucide-react";
import Button from "../ui/button";
import Input from "../ui/input";
import Link from "next/link";
import { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, type ClientSafeProvider } from "next-auth/react";
import AuthWithGithub from "./auth-with-github";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required!" })
    .email({ message: "Input a valid email!" }),

  password: z.string().min(1, { message: "Password is required!" }),
});

export type LoginFormSchema = z.infer<typeof formSchema>;

type LogInFormProps = { githubProvider: ClientSafeProvider };
export default function LogInForm({ githubProvider }: LogInFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<LoginFormSchema>({ resolver: zodResolver(formSchema) });

  const onSubmit: SubmitHandler<LoginFormSchema> = async (data) => {
    reset();

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });

    if (res?.error) {
      const [errorField, errorMessage] = res.error.split(",");

      setError(errorField as "email" | "password", {
        type: "custom",
        message: errorMessage,
      });
    } else void router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-xs flex-col items-stretch"
    >
      <h1 className="mb-8 self-center font-title text-4xl">Welcome back!</h1>
      {errors.email && (
        <label htmlFor="email" className="mb-1 text-xs font-bold text-red-400">
          {errors.email.message}
        </label>
      )}
      <Input<LoginFormSchema>
        kind="rhf"
        type="text"
        label="email"
        register={register}
        className="mb-4 p-4 "
        placeholder="Email adress"
        name="email"
        border
      ></Input>
      {errors.password && (
        <label htmlFor="email" className="mb-1 text-xs font-bold text-red-400">
          {errors.password.message}
        </label>
      )}
      <Input<LoginFormSchema>
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
        Don&apos;t have an account!{" "}
        <Link href="/auth/signin">
          <LinkIcon className="mx-2 inline" size={16}></LinkIcon>{" "}
          <b className="text-yellow-600">Sign in</b>
        </Link>
      </p>
      <hr />
      <AuthWithGithub githubProvider={githubProvider}></AuthWithGithub>
    </form>
  );
}
