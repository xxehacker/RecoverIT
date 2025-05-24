import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Reviews from "../../components/Home/Reviews";
import HeroSection from "@/components/Home/HeroSection";

import {
  Map,
  Shield,
  AlertTriangle,
  Clock,
  Inbox,
  ArrowRight,
  Check,
  RefreshCw,
} from "lucide-react";

const Home = () => {
  const [recentItems, setRecentItems] = useState([]);
  const [stats, setStats] = useState({
    totalLost: 0,
    totalFound: 0,
    totalReturned: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:9000");
    setTimeout(() => {
      setRecentItems([
        {
          _id: "1",
          title: "Black Wallet",
          type: "lost",
          location: "University Library",
          date: "2025-04-28",
          image: "/api/placeholder/100/100",
          path:"/lost-reports"
        },
        {
          _id: "2",
          title: "Blue Backpack",
          type: "found",
          location: "Student Center",
          date: "2025-04-29",
          image: "/api/placeholder/100/100",
          path:"/found-reports"
        },
        {
          _id: "3",
          title: "House Keys",
          type: "lost",
          location: "Cafeteria",
          date: "2025-04-27",
          image: "/api/placeholder/100/100",
          path:"/lost-reports"
        },
      ]);

      setStats({
        totalLost: 156,
        totalFound: 124,
        totalReturned: 98,
      });

      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 to-black selection:bg-blue-500/20">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(29,78,216,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.1),transparent_50%)]" />
      </div>

      <main className="relative">
        {/* Hero Section */}
        <HeroSection stats={stats} isLoading={isLoading} />

        {/* Recent Items Section */}
        <div className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                  Recent Items
                </h2>
                <p className="mt-2 text-slate-400">
                  Recently reported lost and found items on campus
                </p>
              </div>
              <Link
                to="/lost-reports"
                className="text-blue-400 hover:text-blue-300 font-medium group flex items-center mt-4 md:mt-0"
              >
                View All Items
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentItems.map((item) => (
                  <div
                    key={item._id}
                    className="group relative overflow-hidden rounded-xl border border-blue-800/30 bg-slate-900/50 backdrop-blur-sm transition-all hover:bg-slate-800/50"
                  >
                    <div className="absolute top-4 right-4 z-10">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          item.type === "lost"
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : "bg-green-500/20 text-green-400 border border-green-500/30"
                        }`}
                      >
                        {item.type.toUpperCase()}
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-white mb-2">
                            {item.title}
                          </h3>
                          <div className="text-sm text-slate-400 flex items-center mb-1">
                            <Map className="h-4 w-4 mr-1" />
                            {item.location}
                          </div>
                          <div className="text-sm text-slate-500 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {new Date(item.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-blue-900/30">
                        <Link
                          to={`${item.path}`}
                          className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium group"
                        >
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Process Steps */}
        <div className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                How It Works
              </h2>
              <p className="mt-4 text-slate-400">
                Simple steps to report and recover lost items
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Report",
                  description:
                    "Submit detailed information about your lost item or something you've found with supporting images.",
                  icon: <AlertTriangle className="h-6 w-6 text-blue-400" />,
                },
                {
                  title: "Connect",
                  description:
                    "Our system automatically matches lost items with found reports and notifies the relevant parties.",
                  icon: <RefreshCw className="h-6 w-6 text-blue-400" />,
                },
                {
                  title: "Recover",
                  description:
                    "Verify ownership and arrange for the safe recovery of your item through our secure platform.",
                  icon: <Check className="h-6 w-6 text-blue-400" />,
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-xl border border-blue-800/30 bg-slate-900/50 p-6 backdrop-blur-sm transition-all hover:bg-slate-800/50"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="px-6 py-24 bg-slate-950/50">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-xl border border-blue-800/30 bg-slate-900/50 p-8 backdrop-blur-sm">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-12">
                Platform Features
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "User Authentication",
                    description:
                      "Secure login system to manage your lost and found reports.",
                    icon: <Shield className="h-6 w-6 text-blue-400" />,
                  },
                  {
                    title: "Find Lost Items",
                    description:
                      "Find lost items by searching through the database of reported items.",
                    icon: <Inbox className="h-6 w-6 text-blue-400" />,
                  },
                  {
                    title: "Claim Ownership",
                    description:
                      "Claim ownership of an item by providing the necessary information.",
                    icon: <Check className="h-6 w-6 text-blue-400" />,
                  },
                ].map((feature, i) => (
                  <div key={i} className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="px-4 py-20  bg-black">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-2xl bg-black shadow-xl backdrop-blur-sm">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center mb-10">
                What Our Students Say
              </h2>
              <div className="grid">
                <Reviews />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}

        <div className="px-6 py-24 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Find What You've Lost?
            </h2>
            <p className="mb-8 text-slate-400">
              Join our community of users who have successfully reunited with
              their lost belongings
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/signup"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 text-sm font-medium text-white transition-all hover:bg-blue-500"
              >
                Sign Up Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/login"
                className="inline-flex h-12 items-center hover:bg-blue-500/20 justify-center gap-2 rounded-lg border border-blue-500/20 bg-blue-500/10 px-8 text-sm font-medium text-blue-300 transition-all"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
