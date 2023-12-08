import { type ComponentProps } from "react";
import cn from "../cn";

type OverviewCardProps = ComponentProps<"div">;

export default function OverviewCard({
  className,
  children,
}: OverviewCardProps) {
  return (
    <div
      className={cn(
        "-translate-y-[2px] translate-x-[2px] rounded-lg border-2 border-black bg-yellow-100 p-4 shadow-button duration-300 hover:translate-x-0 hover:translate-y-0 hover:bg-yellow-200 hover:shadow-none",
        className,
      )}
    >
      {children}
    </div>
  );
}
