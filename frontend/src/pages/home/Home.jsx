import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import Header from "../../components/Header";
import Footer from "../../components/Footer";

import {
  Search,
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
    setTimeout(() => {
      setRecentItems([
        {
          _id: "1",
          title: "Black Wallet",
          type: "lost",
          location: "University Library",
          date: "2025-04-28",
          image: "/api/placeholder/100/100",
        },
        {
          _id: "2",
          title: "Blue Backpack",
          type: "found",
          location: "Student Center",
          date: "2025-04-29",
          image: "/api/placeholder/100/100",
        },
        {
          _id: "3",
          title: "House Keys",
          type: "lost",
          location: "Cafeteria",
          date: "2025-04-27",
          image: "/api/placeholder/100/100",
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
        <div className="relative px-6 py-24 overflow-hidden flex flex-col items-center justify-center border-b border-blue-900/30 min-h-screen">
          <div className="absolute inset-0 bg-blue-600/5" />
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex h-8 items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 text-sm text-blue-400">
                  <AlertTriangle className="h-6 w-6" />
                  Campus Lost & Found
                </div>

                <h1 className="mt-6 text-5xl md:text-7xl font-bold text-white">
                  Find What !
                  <span className="block mt-2 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                    You've
                  </span>
                  <span className="block mt-2 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    Lost On Campus
                  </span>
                </h1>

                <p className="mt-6 text-lg text-slate-300">
                  Your ultimate solution for reporting and finding lost items
                  across campus. Reunite with your belongings quickly and
                  easily.
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

              {/* Stats Panel */}
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

        {/* Search Section */}
        <div className="px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-xl border border-blue-800/30 bg-slate-900/50 p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white text-center mb-6">
                Find Your Lost Items
              </h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-blue-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="w-full pl-10 pr-4 py-3 bg-slate-800/80 border border-blue-800/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400"
                  />
                </div>
                <select className="px-4 py-3 bg-slate-800/80 border border-blue-800/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                  <option value="all">All Items</option>
                  <option value="lost">Lost Items</option>
                  <option value="found">Found Items</option>
                </select>
                <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-all">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Items Section */}
        <div className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white">Recent Items</h2>
                <p className="mt-2 text-slate-400">
                  Recently reported lost and found items on campus
                </p>
              </div>
              <Link
                to="/items"
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
                          to={`/items/${item._id}`}
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
              <h2 className="text-3xl font-bold text-white">How It Works</h2>
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
              <h2 className="text-2xl font-bold text-white text-center mb-12">
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

        {/* CTA Section */}
        <div className="px-6 py-24 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-6">
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
