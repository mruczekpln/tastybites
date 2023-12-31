"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LinkIcon } from "lucide-react";
import { type ClientSafeProvider } from "next-auth/react";
import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { api } from "~/trpc/react";
import NavLink from "../link";
import Button from "../ui/button";
import Input from "../ui/input";
import AuthWithGithub from "./auth-with-github";

const formSchema = z
  .object({
    username: z
      .string()
      .regex(new RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gi), {
        message: "Username can include only letters, dots, and underscores.",
      })
      .trim()
      .min(4, { message: "Username must have at least 4 characters." }),
    email: z
      .string()
      .trim()
      .min(4, { message: "Email is required!" })
      .email({ message: "Input a valid email!" }),
    repeatEmail: z.string().trim(),
    password: z
      .string()
      .min(8, { message: "Password must have at least 8 characters." }),
  })
  .refine((data) => data.email === data.repeatEmail, {
    path: ["repeatEmail"],
    message: "Emails do not match!",
  });

type SignInFormSchema = z.infer<typeof formSchema>;

type SignInFormProps = { githubProvider: ClientSafeProvider };
export default function SignInForm({ githubProvider }: SignInFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<SignInFormSchema>({ resolver: zodResolver(formSchema) });

  const createAccount = api.account.create.useMutation({
    onError: (error) =>
      setError("email", {
        type: "custom",
        message: error.message,
      }),
  });

  const onSubmit: SubmitHandler<SignInFormSchema> = (data) => {
    reset();
    createAccount.mutate({
      email: data.email,
      password: data.password,
      username: data.username,
    });
  };

  return createAccount.isSuccess ? (
    <div className="flex flex-col items-center gap-8">
      <h1 className="mb-8 self-center font-title text-6xl">
        Enjoy your time on TastyBites!
      </h1>
      <NavLink variant="button" href="/auth/login">
        Go to login page!
      </NavLink>
    </div>
  ) : (
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
      <Button
        disabled={createAccount.isLoading}
        className=" bg-yellow-500 py-4 text-xl font-bold"
      >
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
      <AuthWithGithub githubProvider={githubProvider}></AuthWithGithub>
    </form>
  );
}
