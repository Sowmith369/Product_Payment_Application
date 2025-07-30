"use client";

import Link from "next/link";
import { Home, CreditCard, List, LogOut, Package, Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLElement>(null);

  const handleLogout = () => {
    router.push("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        window.innerWidth < 768 // md breakpoint
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <aside
      ref={sidebarRef}
      className={`
        fixed inset-y-0 left-0 z-50 bg-white border-r p-4 flex-col transition-transform duration-300 ease-in-out
        ${isOpen ? "w-64" : "w-16"} flex
        md:flex ${isOpen ? "md:w-64" : "md:w-16"}
      `}
    >
      <div className="flex items-center justify-between h-16 mb-6">
        {isOpen && <span className="text-2xl font-bold text-gray-800">Brick Company</span>}
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-gray-100 hidden md:block">
          {isOpen ? <ChevronLeft className="w-6 h-6 text-gray-600" /> : <ChevronRight className="w-6 h-6 text-gray-600" />}
        </button>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-gray-100 md:hidden">
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      <nav className="flex-1 space-y-2">
        <Link href="/dashboard" className={`flex items-center space-x-3 p-2 rounded-lg ${pathname === "/dashboard" ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"} transition-colors duration-200`}>
          <Home className="w-6 h-6 sm:w-6 sm:h-6" />
          {isOpen && <span>Dashboard</span>}
        </Link>
        <Link href="/create-payment" className={`flex items-center space-x-3 p-2 rounded-lg ${pathname === "/create-payment" ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"} transition-colors duration-200`}>
          <CreditCard className="w-6 h-6 sm:w-6 sm:h-6" />
          {isOpen && <span>Create Payment</span>}
        </Link>
        <Link href="/payments" className={`flex items-center space-x-3 p-2 rounded-lg ${pathname === "/payments" ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"} transition-colors duration-200`}>
          <List className="w-6 h-6 sm:w-6 sm:h-6" />
          {isOpen && <span>Payments</span>}
        </Link>
        <Link href="/products" className={`flex items-center space-x-3 p-2 rounded-lg ${pathname === "/products" ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"} transition-colors duration-200`}>
          <Package className="w-6 h-6 sm:w-6 sm:h-6" />
          {isOpen && <span>Products</span>}
        </Link>
      </nav>
      <div className="mt-auto space-y-2">
        <button onClick={handleLogout} className="flex items-center space-x-3 p-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 w-full">
          <LogOut className="w-6 h-6 sm:w-6 sm:h-6" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}