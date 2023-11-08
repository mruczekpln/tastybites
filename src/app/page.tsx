import Image from "next/image";
import Button from "~/components/button";

export default function Home() {
  return (
    <div
      className="mx-auto flex h-full w-full items-center justify-center bg-cover"
      style={{
        backgroundImage: 'url("/hero/bg-wave.svg")',
        backgroundPosition: "800px",
      }}
    >
      <main className="flex h-[700px] w-full max-w-screen-2xl gap-24">
        <section className="flex h-full w-full flex-col justify-between py-16">
          <div className="flex flex-col gap-8">
            <h1 className="font-title text-6xl leading-none">
              Unlock the World of Culinary Creativity
              <Image
                src="/hero/symbol1.svg"
                alt="hero/photo"
                width={64}
                height={64}
                className="inline rotate-[100deg]"
              ></Image>
            </h1>
            <p className="w-3/4 text-2xl leading-loose">
              Welcome to <u>TastyBites</u>
              <Image
                src="/hero/symbol2.svg"
                alt="hero/photo"
                width={32}
                height={32}
                className="relative bottom-1 inline"
              ></Image>
              . Discover, share, and create mouthwatering recipes with a vibrant
              community of food enthusiasts.
            </p>
            <div className="flex items-center gap-4">
              <p className="text-xl font-light">
                Be like this guy, be your{" "}
                <b className="font-extrabold">own chef.</b>
              </p>
              <Image
                src="/hero/arrow1.svg"
                alt=" "
                width={64}
                height={64}
                className="rotate-90"
              ></Image>
            </div>
          </div>
          <div className="flex items-center gap-8 justify-self-end">
            <Button className="bg-yellow-700 px-6 py-4 text-3xl font-bold">
              Share your recipe
            </Button>
            <Button variant="ghost" className="px-8 py-4 text-2xl font-bold">
              Explore Recipes.
            </Button>
          </div>
        </section>
        <section className="flex h-[700px] min-w-[600px] items-center justify-center rounded-2xl border-2 border-black bg-yellow-300 duration-300 hover:translate-x-[2px] hover:translate-y-[-2px] hover:bg-yellow-500 hover:shadow-button">
          <Image
            src="/hero/illustration.svg"
            alt="hero/photo"
            width={600}
            height={600}
          ></Image>
        </section>
      </main>
    </div>
  );
}
