import Image from "next/image";
import Link from "next/link";
import NavLink from "~/components/link";
import Button from "~/components/ui/button";
import Input from "~/components/ui/input";

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
          ></Image>
        </Link>
      </div>
    </div>
  );
}

function FeaturedRecipeCard() {
  return (
    <section className="h-[200px] items-center justify-center rounded-2xl border-2 border-black bg-white shadow-button duration-300 hover:shadow-none"></section>
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
              {new Array(3).fill("").map((_, i) => (
                <FeaturedRecipeCard key={i}></FeaturedRecipeCard>
              ))}
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
                Top deserts
              </h2>
              <Link href="/" className="text-sm hover:underline">
                see more
              </Link>
            </div>
            <article className="flex flex-col gap-6">
              {new Array(3).fill("").map((_, i) => (
                <FeaturedRecipeCard key={i}></FeaturedRecipeCard>
              ))}
            </article>
          </div>
        </section>
        <section className="sticky top-32 flex h-min w-full flex-col gap-8">
          <h1 className="font-title text-6xl leading-none">
            What do you wanna make today?
          </h1>
          <form className="flex h-16 w-full gap-8">
            <Input
              placeholder="Whatever you like!"
              className="w-full pl-4"
            ></Input>
            <Button
              name="submit"
              type="submit"
              className="aspect-square min-w-[64px] bg-yellow-600 p-2"
            >
              <Image
                src="/navbar-logo.svg"
                alt="logo"
                width={48}
                height={48}
              ></Image>
            </Button>
          </form>
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
          <div className="flex max-h-full flex-wrap gap-x-8 gap-y-2 [&>*]:cursor-default">
            <NavLink className="hover:underline">Spaghetti</NavLink>
            <NavLink className="hover:underline">Burgers</NavLink>
            <NavLink className="hover:underline">Salmon</NavLink>
            <NavLink className="hover:underline">Pizza</NavLink>
            <NavLink className="hover:underline">Tacos</NavLink>
            <NavLink className="hover:underline">Chicken Curry</NavLink>
            <NavLink className="hover:underline">Pasta Salad</NavLink>
            <NavLink className="hover:underline">Lasagna</NavLink>
            <NavLink className="hover:underline">Omelette</NavLink>
            <NavLink className="hover:underline">Steak</NavLink>
            <NavLink className="hover:underline">Avocado Toast</NavLink>
            <NavLink className="hover:underline">Shrimp Scampi</NavLink>
            <NavLink className="hover:underline">Chocolate Cake</NavLink>
            <NavLink className="hover:underline">Veggie Stir-Fry</NavLink>
            <NavLink className="hover:underline">Sushi</NavLink>
            <NavLink className="hover:underline">Margarita Pizza</NavLink>
            <NavLink className="hover:underline">Ramen</NavLink>
            <NavLink className="hover:underline">Grilled Cheese</NavLink>
            <NavLink className="hover:underline">Apple Pie</NavLink>
            <NavLink className="hover:underline">Tuna Sandwich</NavLink>
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
