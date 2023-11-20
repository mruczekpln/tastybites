import RouteDisplay from "~/components/recipes/path-display";
import Image from "next/image";
import { Clock, CornerDownRight, Shapes, Star } from "lucide-react";
import Button from "~/components/ui/button";
import ReviewRating from "~/components/recipes/[id]/review-rating";
import Pagination from "~/components/recipes/pagination";

export default function Recipe() {
  return (
    <div className="min-h-screen w-full">
      <main className="mx-auto h-auto w-full max-w-screen-2xl pb-16 pt-32">
        <RouteDisplay
          arr={[
            { displayedName: "recipes", href: "/recipes" },
            { displayedName: "dinner", href: "/recipes/category/dinner" },
            { displayedName: "Burger" },
          ]}
        ></RouteDisplay>
        <h1 className="mt-8 font-title text-6xl">Burger</h1>
        <h2 className="mb-4 mt-2 text-2xl">
          <b>by: </b>cytryneq95
        </h2>
        <div className="flex h-[512px] w-full gap-4">
          <div className="flex h-full shrink-0 gap-4">
            <div className="relative h-full w-auto overflow-x-hidden rounded-xl border-2 border-black shadow-button">
              <Image
                src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D"
                alt="recipe image"
                fill
                objectFit="contain"
                className="!relative h-full"
              ></Image>
            </div>
            <div className="grid gap-4">
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="relative h-full w-auto overflow-x-hidden rounded-xl border-2 border-black shadow-button"
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D"
                      alt="recipe image"
                      fill
                      objectFit="contain"
                      className="!relative h-full"
                    ></Image>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex grow flex-col justify-between rounded-xl border-2 border-black bg-yellow-50 p-6">
            <div>
              <h3 className="mb-2 text-2xl font-bold">Description</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat natus molestias quo numquam omnis saepe! Alias officiis
                illo provident dolorem!
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-2xl font-bold">Cooking time</h3>
              <div className="flex items-center gap-4">
                <Clock size={40}></Clock>
                <p className="text-lg">40 min</p>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-2xl font-bold">Rating</h3>
              <div className="flex -translate-x-[5px]">
                <Star className="fill-yellow-600 stroke-none" size={40}></Star>
                <Star className="fill-yellow-600 stroke-none" size={40}></Star>
                <Star className="fill-yellow-600 stroke-none" size={40}></Star>
                <Star className="fill-gray-300 stroke-none" size={40}></Star>
                <Star className="fill-gray-300 stroke-none" size={40}></Star>
                <u className="ml-4 mt-2 text-lg">3 reviews</u>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-2xl font-bold">Difficulty Level</h3>
              <div className="flex items-center gap-4">
                <Shapes size={40}></Shapes>
                <p className="text-lg">Easy</p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="mb-4 mt-16 text-4xl font-bold">Ingredients</h2>
        <div className="grid grid-cols-4 gap-4 text-xl">
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="rounded-lg border-2 border-black py-4 pl-8 shadow-button"
              >
                <b>500g</b> - AP Flour
              </div>
            ))}
        </div>

        <h2 className="mb-4 mt-16 text-4xl font-bold">Instructions</h2>
        <p className="text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sed
          alias perferendis blanditiis voluptates labore dolore libero dolorem
          aut exercitationem est, suscipit tempore magni eos voluptate
          praesentium rem dolorum sint id minus? Qui praesentium similique
          explicabo itaque, optio soluta? Ullam dignissimos earum aliquam
          pariatur repudiandae quae magnam itaque? Optio, commodi excepturi.
          Animi, sit eaque omnis, atque aut quia iste amet vitae, nostrum
          sapiente fugiat? Quae deleniti expedita quod voluptatum autem
          voluptatem, eius, sequi id dignissimos corporis animi distinctio ipsum
          quibusdam deserunt repudiandae odio ullam nesciunt corrupti sunt est
          quam nam iusto? Nemo at quos aspernatur minus nulla animi voluptatum
          commodi doloremque, eos porro voluptatibus earum dolor quae dolores
          obcaecati culpa a corrupti error, numquam deserunt fugiat minima
          accusantium quisquam! Eaque illum laudantium deleniti exercitationem
          dicta debitis ratione, commodi veniam obcaecati blanditiis tempore
          dignissimos eos eligendi, rem maiores veritatis odit error alias!
          Laboriosam nisi porro eius quidem reiciendis dignissimos, incidunt
          fugit exercitationem animi, ad aspernatur. Nobis nostrum, earum
          ducimus odio, eligendi recusandae ad expedita maxime officiis ullam
          dolor quaerat porro sunt laborum corrupti velit inventore impedit cum
          quas id? Reiciendis, incidunt velit? Delectus reiciendis ipsam iure
          exercitationem voluptatibus quos modi itaque, nisi voluptate nostrum
          blanditiis sit voluptates magni dignissimos assumenda magnam.
        </p>

        <div className="mt-16 flex gap-16">
          <div className="w-2/3">
            <h2 className="text-4xl font-bold">Write your review</h2>
            <div className="my-4 flex items-center gap-4">
              <h3 className="text-3xl">Rating</h3>
              <ReviewRating />
            </div>
            <div className="flex w-full gap-4">
              <textarea
                placeholder="I really liked the recipe cuz..."
                className="w-4/5 resize-none rounded-xl bg-gray-200 p-4"
                rows={4}
              ></textarea>
              <Button className="flex grow items-center justify-center rounded-xl bg-yellow-500">
                <CornerDownRight size={48}></CornerDownRight>
              </Button>
            </div>
            <h2 className="mb-6 mt-10 text-4xl font-bold">Reviews</h2>
            <div className="mb-8 w-min rounded-lg border-2 border-black bg-yellow-50 px-6 py-4 shadow-button">
              {Array.from({ length: 5 }, (_, rowIndex) => (
                <div key={rowIndex} className="my-2 flex items-center">
                  {Array.from({ length: 5 }, (_, starIndex) => (
                    <Star
                      key={starIndex}
                      className={
                        starIndex >= 5 - rowIndex
                          ? "fill-gray-300 stroke-none"
                          : "fill-yellow-600 stroke-none"
                      }
                      size={32}
                    />
                  ))}
                  <p className="mx-8 whitespace-nowrap text-sm">
                    {5 - rowIndex} stars
                  </p>
                  <b className="whitespace-nowrap text-2xl">4</b>
                  {/* <p>3</p>
                  <p>0</p>
                  <p>0</p>
                  <p>0</p> */}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="h-auto min-h-[128px] w-full rounded-lg border-2 border-black p-4 shadow-button"
                  >
                    <div className="mb-4 flex items-center  justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full border-2 border-black"></div>
                        <b>cytryneq95</b>
                        <p className="ml-4 font-light">1 week ago</p>
                      </div>
                      <div className="flex">
                        <Star
                          className="fill-yellow-600 stroke-none"
                          size={32}
                        ></Star>
                        <Star
                          className="fill-yellow-600 stroke-none"
                          size={32}
                        ></Star>
                        <Star
                          className="fill-yellow-600 stroke-none"
                          size={32}
                        ></Star>
                        <Star
                          className="fill-gray-300 stroke-none"
                          size={32}
                        ></Star>
                        <Star
                          className="fill-gray-300 stroke-none"
                          size={32}
                        ></Star>
                      </div>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Fuga reiciendis consequatur modi repellendus est ab
                      ducimus officia neque, quo quis consectetur? Officia illum
                      provident maxime repellat iste cupiditate ea aspernatur!
                    </p>
                  </div>
                ))}
              <Pagination></Pagination>
            </div>
          </div>
          <div className="flex w-1/3 flex-col gap-4">
            <h2 className="mb-2 text-4xl font-bold">You might also like:</h2>
            <div className="h-48 w-full rounded-xl border-2 border-black shadow-button"></div>
            <div className="h-48 w-full rounded-xl border-2 border-black shadow-button"></div>
            <div className="h-48 w-full rounded-xl border-2 border-black shadow-button"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
