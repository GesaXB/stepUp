"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingBag, 
  Settings, 
  ChevronLeft, 
  Menu,
  LogOut,
  Bell,
  Search,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clearLocalCart } from "@/lib/cart";

const SIDEBAR_LINKS = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [adminUser, setAdminUser] = useState<any>(null);

  useEffect(() => {
    // Auto-collapse sidebar on smaller screens
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const userRes = await fetch("/api/auth/me");
        const userData = await userRes.json();
        
        if (userData.user?.role !== "ADMIN") {
          router.push("/");
          return;
        }
        setAdminUser(userData.user);
      } catch (err) {
        router.push("/login?redirect=/admin");
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkAdmin();
  }, [router]);

  const handleLogout = async () => {
    try {
      clearLocalCart();
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-black" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-black flex font-sans overflow-x-hidden">
      {/* Sidebar Overlay (Mobile Only) */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ 
          width: isSidebarOpen ? 280 : 80,
          x: typeof window !== 'undefined' && window.innerWidth < 1024 
             ? (isMobileSidebarOpen ? 0 : -280) 
             : 0
        }}
        className={`bg-black text-white h-screen fixed lg:sticky top-0 flex flex-col transition-all duration-300 z-[70] overflow-hidden`}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white flex items-center justify-center shrink-0">
               <span className="text-black font-black italic text-xl">S</span>
            </div>
            {(isSidebarOpen || isMobileSidebarOpen) && (
              <span className="font-black italic uppercase tracking-tighter text-2xl">StepUP</span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {SIDEBAR_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileSidebarOpen(false)}
                className={`flex items-center gap-4 p-3 transition-all group relative rounded-sm ${
                  isActive ? "bg-white text-black shadow-lg shadow-black/20" : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={18} className="shrink-0" />
                {(isSidebarOpen || isMobileSidebarOpen) && (
                  <span className="text-[11px] font-black uppercase tracking-widest italic">{link.name}</span>
                )}
                {!isSidebarOpen && !isMobileSidebarOpen && (
                  <div className="absolute left-16 bg-black text-white px-2 py-1 text-[9px] font-bold uppercase rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 border border-white/10">
                    {link.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 shrink-0 space-y-2 hidden lg:block">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center gap-4 p-3 text-zinc-400 hover:text-white transition-colors rounded-sm hover:bg-white/5"
          >
            {isSidebarOpen ? <ChevronLeft size={18} /> : <Menu size={18} />}
            {isSidebarOpen && <span className="text-[10px] font-bold uppercase tracking-widest">Collapse View</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-black/5 flex items-center justify-between px-6 md:px-8 sticky top-0 z-40">
           <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMobileSidebarOpen(true)}
                className="p-2 -ml-2 lg:hidden text-black hover:bg-zinc-50 rounded-md transition-colors"
              >
                 <Menu size={20} />
              </button>

              <div className="relative group hidden sm:block">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-black transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-zinc-50 border-none focus:ring-0 focus:bg-zinc-100 transition-all text-[11px] font-bold tracking-widest w-48 md:w-64 pl-12 pr-4 py-2.5 rounded-sm"
                />
              </div>
           </div>

           <div className="flex items-center gap-3 md:gap-6">
              <button className="relative text-zinc-400 hover:text-black transition-colors p-2 hover:bg-zinc-50 rounded-full">
                 <Bell size={18} />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>

              <div className="h-8 w-px bg-black/5" />

              <div className="flex items-center gap-3 md:gap-4">
                 <div className="text-right hidden md:block">
                    <p className="text-[10px] font-black uppercase leading-none">{adminUser?.name}</p>
                    <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Administrator</p>
                 </div>
                 
                 <div className="relative group">
                    <div className="w-9 h-9 md:w-10 md:h-10 bg-black text-white flex items-center justify-center font-black italic border border-black/10 cursor-pointer">
                        {adminUser?.name?.charAt(0) || "A"}
                    </div>
                    
                    {/* Logout Dropdown */}
                    <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                       <div className="bg-white border border-black shadow-2xl p-2 w-48">
                          <button 
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 p-3 text-[10px] font-black uppercase text-red-500 hover:bg-red-50 transition-colors"
                          >
                             <LogOut size={14} />
                             Logout
                          </button>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-10 lg:p-12">
          {children}
        </main>
      </div>
    </div>
  );
}
