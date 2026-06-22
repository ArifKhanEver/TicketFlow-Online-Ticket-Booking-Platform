'use client';
import logo from '@/assets/images/logo.png';
import { useState, useEffect } from "react";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { BsGear, BsPersonSquare } from 'react-icons/bs';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

const containerVariants = {
  hidden: { opacity: 0, y: -15, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 25, staggerChildren: 0.08, delayChildren: 0.05 }
  },
  exit: { opacity: 0, y: -15, scale: 0.95, transition: { duration: 0.15, ease: "easeIn" } }
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);

  const router = useRouter();
  const { data: session } = authClient.useSession();

  // Dark Mode Logic
  useEffect(() => {
    setMounted(true);
    const isDark = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(isDark);
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      setIsMenuOpen(false);
      router.push('/auth/signin');
    } catch (error) { toast.error("Sign out failed"); }
  };

  const navLinks = [
    { name: "Home", href: "/", id: "home" },
    { name: "About", href: "/about", id: "about" },
    { name: "All Tickets", href: "/tickets", id: "tickets" },
  ];

  if (mounted && session?.user) {
    const userRole = session.user.role;
    let dashboardRoute = userRole === 'admin' ? '/dashboard/admin' : userRole === 'vendor' ? '/dashboard/vendor' : '/dashboard/user';
    navLinks.push({ name: "Dashboard", href: dashboardRoute, id: "dashboard" });
  }

  if (!mounted) return null;

  return (
    <div className={`w-full sticky bg-transparent top-0 z-50 px-4 py-4 md:px-8 md:py-6 transition-colors duration-300 -mb-30 md:-mb-40`}>

      <nav className="mx-auto max-w-7xl bg-white dark:bg-[#141416]/90 border border-zinc-200 dark:border-zinc-800/60 backdrop-blur-xl rounded-2xl h-20 flex items-center justify-between px-6 md:px-10 text-zinc-900 dark:text-white shadow-lg dark:shadow-2xl transition-all duration-300">

        {/* Logo */}
        <Link href="/" className="text-2xl font-black tracking-tight mb-2">
          <Image src={logo} height={30} width={140} alt="Logo" priority />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-7 text-[14px] font-normal text-zinc-600 dark:text-zinc-400" onMouseLeave={() => setHoveredTab(null)}>
            {navLinks.map((link) => (
              <li key={link.id} className="relative cursor-pointer" onMouseEnter={() => setHoveredTab(link.id)}>
                <Link href={link.href} className="relative block py-2 px-3 hover:text-black dark:hover:text-white transition-colors">
                  <span className="relative z-10">{link.name}</span>
                  {hoveredTab === link.id && (
                    <motion.div layoutId="navHover" className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800/40 rounded-xl" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* USER INFO BEFORE SIGN OUT (Desktop) */}
          {session?.user && (
            // <div className="flex items-center gap-2">
            //   <Image width={10} height={10} src={session.user.image || "https://i.ibb.co.com/Xk4nZxs8/pngtree-man-avatar-image-for-profile-png-image-13001877.png"} className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700" alt="Avatar" />
            //   <div className='flex flex-col gap-0'>
            //   <span className="text-sm font-semibold capitalize">{session.user.role || "Role"}</span>
            //   <span className="text-sm font-semibold capitalize">{session.user.name}</span>
            //   </div>
            // </div>
            <Dropdown>
              <Dropdown.Trigger className="rounded-full flex gap-2">
                <Avatar>
                  <Avatar.Image
                    alt="Junior Garcia"
                    src={session.user.image || "https://i.ibb.co.com/Xk4nZxs8/pngtree-man-avatar-image-for-profile-png-image-13001877.png"}
                  />
                  <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
                </Avatar>
                <div className='flex flex-col text-left'>
                  <span className="text-sm font-semibold capitalize">{session.user.role || "Role"}</span>
                  <span className="text-sm font-semibold capitalize">{session.user.name}</span>
                </div>
              </Dropdown.Trigger>
              <Dropdown.Popover className="p-2">
                <div className="px-3 pt-3 pb-1">
                  <div className="flex items-center gap-2">
                    <Avatar size="sm">
                      <Avatar.Image
                        alt="Junior Garcia"
                        src={session.user.image || "https://i.ibb.co.com/Xk4nZxs8/pngtree-man-avatar-image-for-profile-png-image-13001877.png"}
                      />
                      <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
                    </Avatar>
                    <div className="flex flex-col gap-0">
                      <p className="text-sm leading-5 font-medium">{session?.user.name}</p>
                      <p className="text-xs leading-none text-muted">{session?.user.email}</p>
                    </div>
                  </div>
                </div>
                <Dropdown.Menu>
                  <Dropdown.Item id="dashboard" textValue="Dashboard">
                    <Link href={ session?.user.role === 'admin' ? '/dashboard/admin' : session?.user.role === 'vendor' ? '/dashboard/vendor' : '/dashboard/user'}>My Profile</Link>
                  </Dropdown.Item>
                  {/* <Dropdown.Item id="profile" textValue="Profile">
                    <Link href={"/profile"}>My Profile</Link>
                  </Dropdown.Item> */}
                  <Dropdown.Item id="logout" textValue="Logout" variant="danger">
                    <button onClick={handleSignOut} className="flex w-full items-center justify-between gap-2 cursor-pointer">
                      <Label>Log Out</Label>
                      <FaArrowUpRightFromSquare className="size-3.5 text-danger" />
                    </button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          )}

          {session ? "" : (
            <Link href="/auth/signin" className="text-sm font-medium text-[#5B51F9]">Sign In</Link>
          )}

          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit"
              className="absolute top-[90px] left-0 w-full bg-white dark:bg-[#141416] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col gap-4 shadow-2xl md:hidden z-50">
              <motion.ul className="flex flex-col gap-4">

                {/* Navigation Links */}
                {navLinks.map((link) => (
                  <motion.li key={link.id} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-2 text-zinc-900 dark:text-zinc-200 hover:text-black dark:hover:text-white font-medium transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}

                {/* Divider */}
                <motion.div variants={itemVariants} className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-800 my-2" />

                {/* USER INFO BEFORE THEME TOGGLE AND SIGN OUT (Mobile) */}
                {session?.user && (
                  <motion.li variants={itemVariants} className="flex items-center gap-3">
                    <Image width={10} height={10} src={session.user.image || "/default-avatar.png"} className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700" alt="Avatar" />
                    <div className='flex flex-col'>
                      <span className="font-semibold !text-zinc-900 dark:text-white">{session.user.name}</span>
                      <span className="font-semibold !text-zinc-900 dark:text-white">{session.user.role || "Role"}</span>
                    </div>
                  </motion.li>
                )}

                {/* Theme Toggle (Mobile) */}
                <motion.li variants={itemVariants}>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-3 w-full text-left py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                    <span>Switch to {isDarkMode ? 'Light' : 'Dark'} Mode</span>
                  </button>
                </motion.li>

                {/* Auth Action (Mobile) */}
                <motion.li variants={itemVariants} className="mt-2">
                  {session ? (
                    <button
                      onClick={handleSignOut}
                      className="w-full bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 font-medium py-3 rounded-xl text-center border border-red-100 dark:border-red-900/50 transition-colors"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)} className="block">
                      <button className="w-full bg-[#5B51F9] hover:bg-[#483EFF] text-white font-medium py-3 rounded-xl text-center shadow-lg shadow-[#5B51F9]/20 transition-colors">
                        Sign In
                      </button>
                    </Link>
                  )}
                </motion.li>

              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}