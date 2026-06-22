'use client'
import { Button, Drawer } from "@heroui/react";
import Image from "next/image";
import logo from '@/assets/images/logo.png';
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  FiHome, FiUser, FiCreditCard, FiPlusCircle, FiList, 
  FiInbox, FiPieChart, FiShield, FiUsers, FiCheckSquare, 
  FiLayers, FiCompass, FiInfo, FiLogOut, FiMenu 
} from "react-icons/fi";
import toast from "react-hot-toast";

export function DashboardSidebar() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();

  // ডক অনুযায়ী User, Vendor এবং Admin এর রাউটগুলো 
  const roleNavItems = {
    user: [
      { icon: FiUser, label: "User Profile", href: "/dashboard/user" },
      { icon: FiList, label: "My Booked Tickets", href: "/dashboard/user/booked-tickets" },
      { icon: FiCreditCard, label: "Transaction History", href: "/dashboard/user/transactions" },
    ],
    vendor: [
      { icon: FiUser, label: "Vendor Profile", href: "/dashboard/vendor" },
      { icon: FiPlusCircle, label: "Add Ticket", href: "/dashboard/vendor/add-ticket" },
      { icon: FiList, label: "My Added Tickets", href: "/dashboard/vendor/my-tickets" },
      { icon: FiInbox, label: "Requested Bookings", href: "/dashboard/vendor/requests" },
      { icon: FiPieChart, label: "Revenue Overview", href: "/dashboard/vendor/revenue" },
    ],
    admin: [
      { icon: FiShield, label: "Admin Profile", href: "/dashboard/admin" },
      { icon: FiUsers, label: "Manage Users", href: "/dashboard/admin/users" },
      { icon: FiCheckSquare, label: "Manage Tickets", href: "/dashboard/admin/tickets" },
      { icon: FiLayers, label: "All Bookings", href: "/dashboard/admin/bookings" },
    ]
  };

  const publicNavItems = [
    { icon: FiHome, label: "View Home", href: "/" },
    { icon: FiCompass, label: "All Tickets", href: "/tickets" },
    { icon: FiInfo, label: "About Platform", href: "/about" },
  ];

  const currentRoleLinks = roleNavItems[user?.role || "user"] || [];

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("Sign out successful");
      router.replace('/auth/signin');
    } catch (error) {
      toast.error("Sign out failed");
    }
  };

  const navContent = (
    <nav className="flex flex-col h-full justify-between gap-4">
      <div className="flex flex-col gap-4">
        
        {/* User Profile Card (Light & Dark Mode Supported) */}
        <div className="w-full max-w-[240px] bg-gray-50 dark:bg-[#141416]/40 border border-gray-200 dark:border-zinc-800/80 backdrop-blur-md p-4 rounded-xl flex flex-col gap-3 shadow-sm dark:shadow-xl">
          <div className="mx-auto mb-1">
            <Image src={logo} height={32} width={120} alt="TicketFlow Logo" priority />
          </div>

          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 rounded-full overflow-hidden border border-gray-300 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-900 flex-shrink-0">
              <Image
                src={user?.image || "https://i.ibb.co.com/Xk4nZxs8/pngtree-man-avatar-image-for-profile-png-image-13001877.png"}
                fill
                alt="Avatar"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="text-sm font-bold tracking-tight text-black dark:text-white leading-tight truncate">
                {user?.name || "User Name"}
              </h3>
              <span className="text-[10px] text-gray-500 dark:text-zinc-400 truncate">
                {user?.email || "user@email.com"}
              </span>
              <span className="text-[10px] font-bold mt-0.5 capitalize px-1.5 py-0.5 bg-[#039855]/10 text-[#039855] border border-[#039855]/20 rounded w-max">
                {user?.role || "User"}
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Links */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider px-3 mb-1">
            Dashboard Navigation
          </span>
          {currentRoleLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                href={item.href}
                key={item.label}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${isActive
                    ? "bg-[#039855] text-white font-bold shadow-md shadow-[#039855]/20"
                    : "text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-900 hover:text-black dark:hover:text-white font-medium"
                  }`}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Public Links */}
        <div className="flex flex-col gap-1 border-t border-gray-200 dark:border-zinc-800 pt-4">
          <span className="text-[10px] font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider px-3 mb-1">
            Public Pages
          </span>
          {publicNavItems.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-900 hover:text-black dark:hover:text-white transition-colors font-medium"
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Logout Action */}
      <div className="pt-4 border-t border-gray-200 dark:border-zinc-800">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 transition-colors font-bold cursor-pointer"
        >
          <FiLogOut className="size-4" />
          Logout
        </button>
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar View */}
      <aside className="hidden w-72 shrink-0 border-r border-gray-200 dark:border-zinc-800 p-6 lg:block bg-gray-100 dark:bg-[#0A0A0C] min-h-screen pt-40">
        {navContent}
      </aside>

      {/* Mobile Drawer View */}
      <Drawer>
        <Button 
          variant="flat" 
          className="lg:hidden m-4 bg-white dark:bg-[#141416] border border-gray-200 dark:border-zinc-800 text-black dark:text-white font-bold"
        >
          <FiMenu className="size-5" />
          Menu
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left" className="bg-white dark:bg-[#0A0A0C] text-black dark:text-white p-2">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading className="text-gray-500 dark:text-zinc-400 text-sm font-bold uppercase tracking-wider">
                  Menu Panel
                </Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body className="px-4">
                {navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}