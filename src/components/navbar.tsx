import NavLink from "./link";
import Logo from "./logo";

export default function Navbar() {
  return (
    <div className="absolute z-10 w-full border-b-2 border-black bg-white text-black">
      <nav className="mx-auto flex h-20 w-full max-w-screen-2xl items-center justify-between font-bold">
        <Logo></Logo>

        <div className="flex items-center gap-8">
          <NavLink href="/">Home.</NavLink>
          <NavLink href="/recipes">Recipes.</NavLink>
          <NavLink
            variant="button"
            className=" border-2 px-4 py-2"
            href="/recipes/create"
          >
            Add your recipe
          </NavLink>
          <div className="h-2 w-2 rounded-full bg-black"></div>
          <NavLink
            variant="button"
            href="/auth/login"
            className="bg-yellow-500"
          >
            Sign in / up
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
