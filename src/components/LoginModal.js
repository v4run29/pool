"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { X, Lock, Mail, ShieldAlert } from "lucide-react";

export default function LoginModal({ onClose, onOpenDashboard }) {
  const { login } = useApp();
  const [activeTab, setActiveTab] = useState("login"); // login, register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (activeTab === "login") {
      const res = login(email, password);
      if (res.success) {
        onClose();
        // Redirect to dashboard automatically
        setTimeout(() => {
          onOpenDashboard();
        }, 150);
      } else {
        setError("Invalid credentials.");
      }
    } else {
      // Register logic (simulated, just logs them in as user)
      const res = login(email, password);
      if (res.success) {
        onClose();
        setTimeout(() => {
          onOpenDashboard();
        }, 150);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />

      {/* Auth Panel */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl transition-all duration-300">
        
        {/* Header */}
        <div className="bg-slate-950 px-6 py-5 flex items-center justify-between border-b border-slate-900">
          <div>
            <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider block">Security Gate</span>
            <h4 className="text-xl font-bold text-white mt-1">
              {activeTab === "login" ? "Welcome Back" : "Create Account"}
            </h4>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-800 p-2 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-800/80 text-sm font-semibold">
          <button
            onClick={() => {
              setActiveTab("login");
              setError("");
            }}
            className={`flex-1 py-3 text-center border-b-2 transition-all ${
              activeTab === "login" ? "border-cyan-500 text-cyan-400 bg-slate-900" : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setActiveTab("register");
              setError("");
            }}
            className={`flex-1 py-3 text-center border-b-2 transition-all ${
              activeTab === "register" ? "border-cyan-500 text-cyan-400 bg-slate-900" : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {error && (
            <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-3.5 text-xs text-rose-400 font-semibold flex items-center gap-2">
              <ShieldAlert className="h-4.5 w-4.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {activeTab === "register" && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Full Name</label>
              <input
                type="text"
                placeholder="Aman Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 h-4.5 w-4.5 text-slate-500" />
              <input
                type="email"
                placeholder="example@vwt.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 pl-11 pr-4 py-3.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 h-4.5 w-4.5 text-slate-500" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 pl-11 pr-4 py-3.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] py-4 text-slate-950 font-bold tracking-wide transition-all mt-6"
          >
            {activeTab === "login" ? "Secure Login" : "Initialize Account"}
          </button>

          {/* Credentials Hint */}
          <div className="rounded-2xl bg-cyan-950/20 border border-cyan-800/30 p-3.5 text-xs text-cyan-200 mt-4">
            <p className="font-bold uppercase tracking-wider text-[10px] text-cyan-400 mb-1">Testing Credentials Hint</p>
            <p>Admin console login: <code className="bg-slate-950/80 px-1 py-0.5 rounded text-white select-all">admin@vwt.com</code> / Password: <code className="bg-slate-950/80 px-1 py-0.5 rounded text-white select-all">admin123</code></p>
          </div>

        </form>
      </div>
    </div>
  );
}
