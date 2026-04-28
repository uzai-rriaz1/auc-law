"use client";
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
const layout = ({ children }) => {
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
  return (
    <>
      <div className="bg-red-50 border-b px-6 py-3 flex items-center gap-3 mt-0">
        <div className="bg-red-500 text-white p-2 rounded-full">⚖️</div>
        <div>
          <h1 className="text-sm font-semibold text-gray-800">Litigation</h1>
          <p className="text-xs text-gray-500">Main Office Lahore</p>
        </div>
      </div>

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
        <div>
          <main className="p-4">{children}</main>
        </div>
      </div>
    </>
  );
};

export default layout;
