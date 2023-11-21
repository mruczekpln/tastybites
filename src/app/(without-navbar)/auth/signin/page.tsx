import Image from "next/image";
import SignInForm from "~/components/auth/signin-form";

export default function SignIn() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Image
        src="/navbar-logo.svg"
        alt="logo"
        className="absolute top-8 aspect-square"
        width={64}
        height={64}
      ></Image>
      <SignInForm></SignInForm>
    </div>
  );
}
