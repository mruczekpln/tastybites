import Image from "next/image";
import LogInForm from "~/components/auth/login-form";

export default function LogIn() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Image
        src="/navbar-logo.svg"
        alt="logo"
        className="absolute top-8 aspect-square"
        width={64}
        height={64}
      ></Image>
      <LogInForm></LogInForm>
    </div>
  );
}
