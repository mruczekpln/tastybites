import Image from "next/image";
import Link from "next/link";

type RecommendationCardProps = {
  data: {
    id: number;
    username: string;
    name: string;
    titleImageUrl: string;
  };
};

export default function RecommendationCard({
  data: { id, username, name, titleImageUrl },
}: RecommendationCardProps) {
  return (
    <section className="relative h-[200px] overflow-hidden rounded-2xl border-2 border-black bg-white shadow-button duration-300 hover:shadow-none">
      <Image
        src={titleImageUrl}
        alt={name}
        className="object-cover object-top"
        fill
      />
      <div className="absolute bottom-0 left-0 z-10 flex h-10 w-full items-center justify-between border-t-2 border-black bg-white px-4">
        <h3 className="font-bold">{name}</h3>
        <p>
          by:{" "}
          <Link className="z-30 hover:underline" href={`/account/${username}`}>
            {username}
          </Link>
        </p>
      </div>
      <Link
        className="absolute inset-0 z-20 h-full w-full"
        href={`/recipes/${id}`}
      ></Link>
    </section>
  );
}
