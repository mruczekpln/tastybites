import Image from "next/image";

export default function LoadingSpinnner() {
  return (
    <Image
      src="/loading-spinner.svg"
      alt="loading..."
      width={64}
      height={64}
      className={"animate-spin h-32 w-32"}
    ></Image>
  );
}
