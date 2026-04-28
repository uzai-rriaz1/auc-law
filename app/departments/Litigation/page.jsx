"use client";
import React from "react";
import {
  LayoutDashboard,
  Users,
  User,
  Briefcase,
  CheckSquare,
  MessageCircle,
  Gavel,
  Wallet,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, active: true },
    { name: "Team", icon: Users },
    { name: "Clients", icon: User },
    { name: "Cases", icon: Briefcase },
    { name: "Tasks", icon: CheckSquare },
    { name: "Communications", icon: MessageCircle },
    { name: "Judges", icon: Gavel },
    { name: "Accounts", icon: Wallet },
  ];

  const stats = [
    { title: "Active Cases", count: 0, color: "blue" },
    { title: "Active Tasks", count: 0, color: "yellow" },
    { title: "Team Members", count: 1, color: "purple" },
  ];

  const colorMap = {
    blue: "bg-blue-100 text-blue-600",
    yellow: "bg-yellow-100 text-yellow-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 🔴 Top Header */}
      <div className="bg-red-50 border-b px-6 py-3 flex items-center gap-3">
        <div className="bg-red-500 text-white p-2 rounded-full">⚖️</div>
        <div>
          <h1 className="text-sm font-semibold text-gray-800">Litigation</h1>
          <p className="text-xs text-gray-500">Main Office Lahore</p>
        </div>
      </div>

      {/* 🔝 Navigation Bar */}
      <div className="bg-white border-b">
        <div className="flex items-center gap-8 px-6 h-14">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`flex items-center gap-2 cursor-pointer pb-3 border-b-2 transition-all
                ${
                  item.active
                    ? "text-red-500 border-red-500"
                    : "text-gray-500 border-transparent hover:text-gray-800"
                }`}
              >
                <Icon size={18} />
                <span
                  onClick={() =>
                    router.push(`/departments/Litigation/List/${item.name}`)
                  }
                  className="text-sm font-medium"
                >
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 🧠 Main Content */}
      <div className="p-6">
        {/* Greeting + Actions */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Good Afternoon, Uzair
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              It's April 28, 2026. Here's a snapshot of your litigation pulse.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg">
              <Plus size={16} /> Case
            </button>
            <button className="border px-4 py-2 rounded-lg text-sm">
              Proceeding
            </button>
            <button className="border px-4 py-2 rounded-lg text-sm">
              Task
            </button>
            <button className="border px-4 py-2 rounded-lg text-sm">
              Communication
            </button>
          </div>
        </div>

        {/* 📊 Stats */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          {stats.map((item, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <p className="text-gray-500 text-sm">{item.title}</p>
                <h3 className="text-2xl font-bold">{item.count}</h3>
              </div>

              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${colorMap[item.color]}`}
              >
                ●
              </div>
            </div>
          ))}
        </div>

        {/* 📦 Main Grid */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Recent Proceedings */}
          <div className="bg-white p-5 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Recent Proceedings</h3>
              <span className="text-sm text-purple-500 cursor-pointer">
                View All →
              </span>
            </div>

            <div className="flex gap-3 mb-4">
              <button className="px-3 py-1 text-sm bg-gray-100 rounded">
                Grid
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 rounded">
                Table
              </button>
            </div>

            <div className="text-center text-gray-400 py-10">
              No proceedings found
            </div>
          </div>

          {/* Inbox */}
          <div className="bg-white p-5 rounded-xl shadow">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Inbox Feed</h3>
              <select className="border px-2 py-1 rounded text-sm">
                <option>Un-archived</option>
              </select>
            </div>

            <div className="text-center text-gray-400 py-10">No messages</div>
          </div>

          {/* Tomorrow Cases */}
          <div className="bg-white p-5 rounded-xl shadow">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Tomorrow's Cases</h3>
              <span className="text-sm text-purple-500 cursor-pointer">
                View All →
              </span>
            </div>

            <div className="text-center text-gray-400 py-6">
              No cases scheduled for tomorrow
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
