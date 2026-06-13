"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Menu, X, ShoppingBag, User, LogOut, Settings, LayoutDashboard } from "lucide-react";

export default function Navbar({ onOpenCart, onOpenLogin, onOpenBooking, onOpenDashboard }) {
  const { user, logout, cart } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleScroll = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/60 bg-slate-950/70 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-3 mob:px-6 lg:px-8">
        
        {/* Logo */}
        <a href="#" className="flex items-center gap-1.5 mob:gap-2.5 group">
          <div className="relative flex h-9 w-9 mob:h-10 mob:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5 shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-transform duration-300 group-hover:scale-105">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
              {/* Waves/Pool icon SVG */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="h-4.5 w-4.5 mob:h-5.5 mob:w-5.5 text-cyan-400"
              >
                <path d="M2 6c.6.5 1.2 1 2.5 1s1.9-.5 2.5-1c.6-.5 1.2-1 2.5-1s1.9.5 2.5 1c.6.5 1.2 1 2.5 1s1.9-.5 2.5-1c.6-.5 1.2-1 2.5-1s1.9.5 2.5 1" />
                <path d="M2 12c.6.5 1.2 1 2.5 1s1.9-.5 2.5-1c.6-.5 1.2-1 2.5-1s1.9.5 2.5 1c.6.5 1.2 1 2.5 1s1.9-.5 2.5-1c.6-.5 1.2-1 2.5-1s1.9.5 2.5 1" />
                <path d="M2 18c.6.5 1.2 1 2.5 1s1.9-.5 2.5-1c.6-.5 1.2-1 2.5-1s1.9.5 2.5 1c.6.5 1.2 1 2.5 1s1.9-.5 2.5-1c.6-.5 1.2-1 2.5-1s1.9.5 2.5 1" />
              </svg>
            </div>
          </div>
          <span className="text-lg mob:text-xl font-bold tracking-tight text-white space-x-1">
            <span>VWT</span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">POOL</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <button onClick={() => handleScroll("why-choose-us")} className="hover:text-cyan-400 transition-colors cursor-pointer">Why Choose Us</button>
          <button onClick={() => handleScroll("memberships")} className="hover:text-cyan-400 transition-colors cursor-pointer">Memberships</button>
          <button onClick={() => handleScroll("store")} className="hover:text-cyan-400 transition-colors cursor-pointer">Store</button>
          <button onClick={() => handleScroll("gallery")} className="hover:text-cyan-400 transition-colors cursor-pointer">Gallery</button>
          <button onClick={() => handleScroll("about")} className="hover:text-cyan-400 transition-colors cursor-pointer">About</button>
          <button onClick={() => handleScroll("contact")} className="hover:text-cyan-400 transition-colors cursor-pointer">Contact</button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 mob:gap-4">
          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex h-9 w-9 mob:h-10 mob:w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/80 hover:text-cyan-400 text-slate-300 transition-colors duration-200"
          >
            <ShoppingBag className="h-4.5 w-4.5 mob:h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-cyan-500 text-[9px] font-bold text-slate-950 animate-pulse">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* User Auth Control */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/50 px-2.5 py-1.5 mob:px-3.5 mob:py-2 hover:bg-slate-800/80 transition-all text-xs mob:text-sm font-medium text-white"
              >
                <User className="h-4 w-4 text-cyan-400" />
                <span className="hidden sm:inline max-w-[80px] truncate">{user.name}</span>
              </button>
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2.5 w-52 origin-top-right rounded-xl border border-slate-800 bg-slate-900 p-2 shadow-2xl backdrop-blur-xl">
                  {user.role === "admin" ? (
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenDashboard();
                      }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-cyan-400 hover:bg-slate-800"
                    >
                      <LayoutDashboard className="h-4.5 w-4.5" />
                      Admin Dashboard
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenDashboard(); // standard dashboard
                      }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-cyan-400 hover:bg-slate-800"
                    >
                      <LayoutDashboard className="h-4.5 w-4.5" />
                      My Bookings
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-rose-400 hover:bg-slate-800"
                  >
                    <LogOut className="h-4.5 w-4.5" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-1.5 mob:px-4.5 mob:py-2 text-xs mob:text-sm font-semibold text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
            >
              <User className="h-4 w-4" />
              <span>Login</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-9 w-9 mob:h-10 mob:w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 text-slate-300"
          >
            {mobileMenuOpen ? <X className="h-4.5 w-4.5 mob:h-5.5 mob:w-5.5" /> : <Menu className="h-4.5 w-4.5 mob:h-5.5 mob:w-5.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-3 shadow-xl">
          <button
            onClick={() => handleScroll("why-choose-us")}
            className="block w-full text-left py-2.5 text-slate-300 hover:text-cyan-400 font-medium"
          >
            Why Choose Us
          </button>
          <button
            onClick={() => handleScroll("memberships")}
            className="block w-full text-left py-2.5 text-slate-300 hover:text-cyan-400 font-medium"
          >
            Memberships
          </button>
          <button
            onClick={() => handleScroll("store")}
            className="block w-full text-left py-2.5 text-slate-300 hover:text-cyan-400 font-medium"
          >
            Store
          </button>
          <button
            onClick={() => handleScroll("gallery")}
            className="block w-full text-left py-2.5 text-slate-300 hover:text-cyan-400 font-medium"
          >
            Gallery
          </button>
          <button
            onClick={() => handleScroll("about")}
            className="block w-full text-left py-2.5 text-slate-300 hover:text-cyan-400 font-medium"
          >
            About
          </button>
          <button
            onClick={() => handleScroll("contact")}
            className="block w-full text-left py-2.5 text-slate-300 hover:text-cyan-400 font-medium"
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
}
