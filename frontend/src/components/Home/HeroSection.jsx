import { AlertTriangle, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { RefreshCw, Shield } from "lucide-react";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export default function HeroSection({ stats, isLoading }) {
  return (
    <div className="relative px-6 py-24 overflow-hidden flex flex-col items-center justify-center border-b border-blue-900/30 min-h-screen">
      {/*  Glowing Amber Ellipse  */}
      <div className="absolute top-0 right-[10%] w-60 h-60 rounded-full bg-gradient-to-r from-purple-600 to-blue-600/30 blur-3xl opacity-60 animate-pulse z-0" />

      {/* Glowing Amber Ellipse  */}
      <div className="absolute top-[60%] left-[80%] w-72 h-72 rounded-full bg-amber-500/20 blur-2xl opacity-70 shadow-[0_0_60px_15px_rgba(255,191,0,0.3)] z-0" />

      {/* glowing blue ellipse*/}
      <div className="absolute top-1/2 left-1/2 w-60 h-60 rounded-full bg-gradient-to-r from-blue-600 to-purple-600/30 blur-3xl opacity-60 animate-pulse z-0" />

      {/* glowing purple ellipse */}
      <div className="absolute top-0 left-[10%] w-60 h-60 rounded-full bg-gradient-to-r from-purple-600 to-blue-600/30 blur-3xl opacity-60 animate-pulse z-0" />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            {/* <div className="inline-flex h-8 items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 text-sm text-blue-400">
              
              
            </div> */}
            <div className="group relative mx-auto items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] w-fit inline-flex ">
              <span
                className={cn(
                  "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
                )}
                style={{
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "destination-out",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "subtract",
                  WebkitClipPath: "padding-box",
                }}
              />
              <AlertTriangle className="h-6 w-6 invert" />{" "}
              <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
              <AnimatedGradientText className="text-sm font-medium">
                Campus Lost & Found
              </AnimatedGradientText>
              <ChevronRight
                className="ml-1 size-4 stroke-neutral-500 transition-transform
 duration-300 ease-in-out group-hover:translate-x-0.5"
              />
            </div>

            <h1 className="mt-6 text-5xl md:text-7xl font-bold text-white">
              Find What !
              <span className="block mt-2 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                You've
              </span>
              <span className="block mt-2 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                <SparklesText>Lost On Campus </SparklesText>
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-300">
              Your ultimate solution for reporting and finding lost items across
              campus. Reunite with your belongings quickly and easily.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/lost-reports/post"
                className="inline-flex cursor-pointer h-12 items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 text-sm font-medium text-white transition-all z-10 hover:bg-blue-500"
              >
                Report Lost Item
                <AlertTriangle className="h-4 w-4" />
              </Link>
              <Link
                to="/found-reports/submit"
                className="inline-flex h-12 items-center  z-10 hover:bg-blue-500/20 justify-center gap-2 rounded-lg border border-blue-500/20 bg-blue-500/10 px-8 text-sm font-medium text-blue-300 transition-all"
              >
                Report Found Item
                <Check className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  label: "Items Lost",
                  value: stats.totalLost,
                  icon: <AlertTriangle className="h-4 w-4 text-blue-400" />,
                },
                {
                  label: "Items Found",
                  value: stats.totalFound,
                  icon: <Check className="h-4 w-4 text-blue-400" />,
                },
                {
                  label: "Items Returned",
                  value: stats.totalReturned,
                  icon: <RefreshCw className="h-4 w-4 text-blue-400" />,
                },
                {
                  label: "User Success Rate",
                  value: "94%",
                  icon: <Shield className="h-4 w-4 text-blue-400" />,
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-10 rounded-xl border border-blue-800/50 bg-slate-900/50 backdrop-blur-sm 
                      hover:bg-green-400 hover:border-green-400 hover:text-black transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                      {stat.icon}
                    </div>
                    <div className="text-sm text-white font-semibold">
                      {stat.label}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {isLoading ? "..." : stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
