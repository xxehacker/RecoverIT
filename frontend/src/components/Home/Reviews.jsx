import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { reviews } from "@/utils/helper";

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 md:w-72 cursor-pointer overflow-hidden rounded-2xl border backdrop-blur-md p-4 shadow-lg transition-all duration-300 hover:scale-105",
        // light styles
        "border-gray-200/[.1] bg-white/10 hover:bg-white/20",
        // dark styles
        "dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/20"
      )}
    >
      <div className="flex items-center gap-3">
        <img
          className="rounded-full border border-white/20"
          width="40"
          height="40"
          alt={name}
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-semibold text-white">
            {name}
          </figcaption>
          <p className="text-xs text-white/60">{username}</p>
        </div>
      </div>
      <blockquote className="mt-3 text-sm text-white/90 leading-relaxed">
        {body}
      </blockquote>
    </figure>
  );
};

export function Reviews() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden  py-10">
      <Marquee pauseOnHover className="[--duration:25s] gap-6">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:25s] gap-6 mt-4">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      {/* Left Gradient */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-black to-transparent" />
      {/* Right Gradient */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-black to-transparent" />
    </div>
  );
}

export default Reviews;
