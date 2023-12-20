import Image from "next/image";
import Link from "next/link";
import RedirectForm from "~/components/landing/redirect-form";
import NavLink from "~/components/link";
import RecommendationList from "~/components/recommendation-list";

// export const dynamic = "force-static";

function Hero() {
  return (
    <div
      className="mx-auto flex h-screen w-full items-center justify-center bg-cover"
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
                alt="symbol1"
                width={64}
                height={64}
                className="inline rotate-[100deg]"
                priority
              ></Image>
            </h1>
            <p className="w-3/4 text-2xl leading-loose">
              Welcome to <u>TastyBites</u>
              <Image
                src="/hero/symbol2.svg"
                alt="symbol2"
                width={32}
                height={32}
                className="relative bottom-1 inline"
                priority
              ></Image>
              .
              <br />
              Discover, share, and create mouthwatering recipes with a vibrant
              community of food enthusiasts.
            </p>
            <div className="flex items-center gap-4">
              <p className="text-xl font-light">
                Be like this guy, be your{" "}
                <b className="font-extrabold">own chef.</b>
              </p>
              <Image
                src="/hero/arrow1.svg"
                alt="arrow1"
                width={64}
                height={64}
                className="rotate-90"
                priority
              ></Image>
            </div>
          </div>
          <div className="flex items-center gap-8 justify-self-end">
            <NavLink
              href="/recipes/create"
              variant="button"
              className="bg-yellow-500 px-6 py-4 text-3xl font-bold"
            >
              Share your recipe
            </NavLink>
            <NavLink
              href="/recipes"
              variant="ghost"
              className="px-8 py-4 text-2xl font-bold"
            >
              Explore Recipes.
            </NavLink>
          </div>
        </section>
        <section className="flex h-[700px] min-w-[600px] items-center justify-center rounded-2xl border-2 border-black bg-yellow-200 duration-300 hover:translate-x-[2px] hover:translate-y-[-2px] hover:bg-yellow-500 hover:shadow-button">
          <Image
            src="/hero/illustration.svg"
            alt="illustration"
            width={600}
            height={600}
            priority
          ></Image>
        </section>
      </main>
    </div>
  );
}

function PoweredBy() {
  return (
    <div className="flex h-32 w-full items-center justify-center gap-8 border-y-2 border-black bg-yellow-100">
      <p className="text-xl font-bold">Powered by:</p>
      <div className="flex items-center gap-12">
        <Link href="https://create.t3.gg" target="_blank">
          <Image
            src="/powered/t3-dark.svg"
            alt="T3 Stack"
            width={96}
            height={96}
            priority
          ></Image>
        </Link>
        <p className="text-2xl">+</p>
        <Link href="https://planetscale.com" target="_blank">
          <Image
            className="object-cover"
            src="/powered/planetscale.png"
            alt="PlanetScale"
            width={200}
            height={96}
            priority
          ></Image>
        </Link>
      </div>
    </div>
  );
}

function Featured() {
  return (
    <div
      className="flex min-h-full w-full items-center justify-center  bg-contain bg-no-repeat"
      style={{
        backgroundImage: 'url("/featured/background.svg")',
        backgroundPositionX: "100px",
        backgroundSize: "120%",
      }}
    >
      <main className="flex w-full max-w-screen-2xl gap-24 py-16">
        {/* <div
          className="w-16 min-w-[64px] self-stretch bg-repeat-round"
          style={{ backgroundImage: "url(/navbar-logo.svg)" }}
        ></div> */}
        <section className="flex min-w-[600px] flex-col justify-center gap-8">
          <h2 className="text-4xl font-extrabold">
            See featured{" "}
            <Image
              src="/featured/arrow1.svg"
              alt="arrow1"
              width={48}
              height={48}
              className="inline"
            ></Image>
          </h2>
          <div className="w-full">
            <div className="flex h-10 items-center gap-2">
              <Image
                src="/featured/arrow2.svg"
                alt="arrow2"
                width={32}
                height={32}
                className="rotate-90"
              ></Image>
              <h2 className="whitespace-nowrap text-xl font-bold leading-none">
                Top Recipes
              </h2>
              <Link href="/" className="text-sm hover:underline">
                see more
              </Link>
            </div>
            <article className="flex flex-col gap-6">
              <RecommendationList type="liked" />
            </article>
          </div>
          <div className="w-full">
            <div className="flex h-10 items-center gap-2">
              <Image
                src="/featured/arrow2.svg"
                alt=""
                width={32}
                height={32}
                className="rotate-90"
              ></Image>
              <h2 className="whitespace-nowrap text-xl font-bold ">
                Latest recipes
              </h2>
              <Link href="/" className="text-sm hover:underline">
                see more
              </Link>
            </div>
            <article className="flex flex-col gap-6">
              <RecommendationList type="latest" />
            </article>
          </div>
        </section>
        <section className="sticky top-32 flex h-min w-full flex-col gap-8">
          <h1 className="font-title text-6xl leading-none">
            What do you wanna make today?
          </h1>
          <RedirectForm></RedirectForm>
          <div className="flex w-min items-center gap-4">
            <Image
              src="/featured/bracket-left.svg"
              alt="bracket-left"
              width={32}
              height={32}
            ></Image>
            <p className="whitespace-nowrap text-2xl">Make it creative!</p>
            <Image
              src="/featured/bracket-right.svg"
              alt="bracket-right"
              width={32}
              height={32}
            ></Image>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/featured/symbol2.svg"
              alt="symbol2"
              width={48}
              height={48}
              className="inline"
            ></Image>
            <p className="text-2xl font-extrabold">You can try:</p>
          </div>
          <div className="flex max-h-full flex-wrap gap-x-8 gap-y-2 [&>*]:cursor-default [&>*]:text-2xl">
            <NavLink
              href="/recipes/category/breakfast"
              className="hover:underline"
            >
              for breakfast.
            </NavLink>
            <NavLink href="/recipes/category/lunch" className="hover:underline">
              for lunch.
            </NavLink>
            <NavLink
              href="/recipes/category/dinner"
              className="hover:underline"
            >
              for dinner.
            </NavLink>
            <NavLink
              href="/recipes/category/appetizers"
              className="hover:underline"
            >
              a snack.
            </NavLink>
            <NavLink
              href="/recipes/category/drinks"
              className="hover:underline"
            >
              as a drink.
            </NavLink>
            <NavLink
              href="/recipes/category/desserts"
              className="hover:underline"
            >
              something sweet.
            </NavLink>
          </div>
        </section>
        <div
          className="w-16 min-w-[64px] self-stretch bg-repeat-round"
          style={{ backgroundImage: "url(/navbar-logo.svg)" }}
        ></div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero></Hero>
      <PoweredBy></PoweredBy>
      <Featured></Featured>
    </>
  );
}
