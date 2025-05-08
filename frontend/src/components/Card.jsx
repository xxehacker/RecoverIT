import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react"; // Install lucide-react if not already

export default function Card({
  title,
  description,
  image,
  owner,
  date,
  location,
  borderColor,
}) {
  return (
    <div
      className={cn(
        "max-w-xs w-full rounded-2xl bg-white shadow-md hover:shadow-amber-200 transition duration-300 transform hover:-translate-y-1 border-2 overflow-hidden",
        borderColor || "border-amber-300"
      )}
    >
      <div className="relative h-48">
        <img
          src={`http://localhost:9000/${image}`}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/40 to-transparent" />
      </div>

      <div className="p-5 flex flex-col gap-2">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        {/* Location Row */}
        <div className="flex items-center gap-2 text-sm text-amber-600 mt-1">
          <MapPin size={16} className="text-amber-500" />
          <span className="line-clamp-1">{location}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 text-xs text-gray-500 border-t pt-3 border-amber-100">
          <span className="font-semibold text-amber-700">{owner}</span>
          <span className="text-gray-400">{date}</span>
        </div>
      </div>
    </div>
  );
}
