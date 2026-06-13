"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { LayoutDashboard, Users, CalendarDays, ShoppingBag, Plus, Trash2, Check, X, RefreshCw } from "lucide-react";

export default function AdminDashboard({ onClose }) {
  const {
    user,
    bookings,
    products,
    updateBookingStatus,
    addProduct,
    deleteProduct,
    updateProductStock
  } = useApp();

  const [activeTab, setActiveTab] = useState("bookings"); // bookings, memberships, inventory
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "Goggles",
    stock: "",
    image: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=600&q=80"
  });

  const [stockEditId, setStockEditId] = useState(null);
  const [newStockVal, setNewStockVal] = useState("");

  const isAdmin = user && user.role === "admin";

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock) return;

    addProduct({
      name: newProduct.name,
      description: newProduct.description || "Premium swimming gear",
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      stock: parseInt(newProduct.stock),
      image: newProduct.image
    });

    // Reset form
    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: "Goggles",
      stock: "",
      image: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=600&q=80"
    });
  };

  const handleUpdateStock = (prodId) => {
    const qty = parseInt(newStockVal);
    if (isNaN(qty)) return;
    
    // Set stock directly by calculating difference
    const prod = products.find((p) => p.id === prodId);
    if (prod) {
      const diff = prod.stock - qty;
      updateProductStock(prodId, diff);
    }

    setStockEditId(null);
    setNewStockVal("");
  };

  // Filter bookings if standard user (only show their email bookings)
  const displayedBookings = isAdmin
    ? bookings
    : bookings.filter((b) => b.email.toLowerCase() === user?.email.toLowerCase());

  // Count active members based on "Confirmed" status
  const confirmedBookings = bookings.filter((b) => b.status === "Confirmed");
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />

      {/* Main Panel */}
      <div className="relative z-10 w-full max-w-5xl h-[85vh] flex flex-col rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="bg-slate-950 px-6 py-5 flex items-center justify-between border-b border-slate-900 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <LayoutDashboard className="h-5.5 w-5.5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                {isAdmin ? "VWT Pool Administration Console" : "User Membership Portal"}
              </span>
              <h4 className="text-xl font-bold text-white mt-0.5">
                {isAdmin ? "Console Dashboard" : `Welcome, ${user?.name}`}
              </h4>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-800 p-2 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Console Layout */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Side Menu (Only for Admins) */}
          {isAdmin && (
            <aside className="w-56 border-r border-slate-800 bg-slate-950/40 p-4 space-y-2 shrink-0 hidden md:block">
              <button
                onClick={() => setActiveTab("bookings")}
                className={`w-full flex items-center gap-2.5 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${
                  activeTab === "bookings" ? "bg-cyan-500 text-slate-950 shadow-lg" : "text-slate-400 hover:bg-slate-800/50"
                }`}
              >
                <CalendarDays className="h-4.5 w-4.5" />
                Bookings ({bookings.length})
              </button>
              <button
                onClick={() => setActiveTab("memberships")}
                className={`w-full flex items-center gap-2.5 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${
                  activeTab === "memberships" ? "bg-cyan-500 text-slate-950 shadow-lg" : "text-slate-400 hover:bg-slate-800/50"
                }`}
              >
                <Users className="h-4.5 w-4.5" />
                Members ({confirmedBookings.length})
              </button>
              <button
                onClick={() => setActiveTab("inventory")}
                className={`w-full flex items-center gap-2.5 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${
                  activeTab === "inventory" ? "bg-cyan-500 text-slate-950 shadow-lg" : "text-slate-400 hover:bg-slate-800/50"
                }`}
              >
                <ShoppingBag className="h-4.5 w-4.5" />
                Store Inventory
              </button>
            </aside>
          )}

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900/40">
            {/* Mobile Navigation Tabs (Admin only) */}
            {isAdmin && (
              <div className="md:hidden flex border-b border-slate-800 text-xs font-bold shrink-0 mb-4 bg-slate-950/60 rounded-xl overflow-hidden">
                <button
                  onClick={() => setActiveTab("bookings")}
                  className={`flex-1 py-3 text-center border-b-2 ${activeTab === "bookings" ? "border-cyan-500 text-cyan-400 bg-slate-900" : "border-transparent text-slate-400"}`}
                >
                  Bookings
                </button>
                <button
                  onClick={() => setActiveTab("memberships")}
                  className={`flex-1 py-3 text-center border-b-2 ${activeTab === "memberships" ? "border-cyan-500 text-cyan-400 bg-slate-900" : "border-transparent text-slate-400"}`}
                >
                  Members
                </button>
                <button
                  onClick={() => setActiveTab("inventory")}
                  className={`flex-1 py-3 text-center border-b-2 ${activeTab === "inventory" ? "border-cyan-500 text-cyan-400 bg-slate-900" : "border-transparent text-slate-400"}`}
                >
                  Inventory
                </button>
              </div>
            )}

            {/* --- STATS TILES (Admin Only) --- */}
            {isAdmin && activeTab !== "inventory" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Total Bookings</span>
                  <div className="flex justify-between items-end mt-2">
                    <span className="text-3xl font-extrabold text-white">{bookings.length}</span>
                    <span className="text-xs text-slate-500">Reservations</span>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Active Members</span>
                  <div className="flex justify-between items-end mt-2">
                    <span className="text-3xl font-extrabold text-cyan-400">{confirmedBookings.length}</span>
                    <span className="text-xs text-emerald-400 font-semibold">Verified Active</span>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Total Revenue</span>
                  <div className="flex justify-between items-end mt-2">
                    <span className="text-3xl font-extrabold text-white">
                      ₹{confirmedBookings.reduce((sum, b) => sum + b.price, 0)}
                    </span>
                    <span className="text-xs text-cyan-400 font-semibold">SSL Confirmed</span>
                  </div>
                </div>
              </div>
            )}

            {/* --- BOOKINGS TAB CONTENT --- */}
            {activeTab === "bookings" && (
              <div className="rounded-2xl border border-slate-800 bg-slate-950/30 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-800 bg-slate-950/50 flex items-center justify-between">
                  <h5 className="font-bold text-white text-base">
                    {isAdmin ? "All Reservation Logs" : "Your Personal Bookings"}
                  </h5>
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
                    {displayedBookings.length} records
                  </span>
                </div>

                <div className="overflow-x-auto">
                  {displayedBookings.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">No bookings available.</div>
                  ) : (
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/20">
                          <th className="px-5 py-4">ID</th>
                          <th className="px-5 py-4">Name / Contact</th>
                          <th className="px-5 py-4">Plan / Slot</th>
                          <th className="px-5 py-4">Start Date</th>
                          <th className="px-5 py-4">Status</th>
                          {isAdmin && <th className="px-5 py-4 text-center">Actions</th>}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {displayedBookings.map((b) => (
                          <tr key={b.id} className="hover:bg-slate-800/20 transition-colors">
                            <td className="px-5 py-4 font-mono font-bold text-cyan-400">{b.id}</td>
                            <td className="px-5 py-4">
                              <p className="font-semibold text-white">{b.name}</p>
                              <p className="text-xs text-slate-400">{b.mobile} | {b.email}</p>
                            </td>
                            <td className="px-5 py-4">
                              <p className="font-semibold text-slate-200">{b.membershipType}</p>
                              <p className="text-xs text-slate-400">{b.preferredTimeSlot}</p>
                            </td>
                            <td className="px-5 py-4 text-slate-300 font-medium">{b.startDate}</td>
                            <td className="px-5 py-4">
                              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                b.status === "Confirmed"
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : b.status === "Cancelled"
                                  ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              }`}>
                                {b.status}
                              </span>
                            </td>
                            {isAdmin && (
                              <td className="px-5 py-4">
                                <div className="flex gap-2 justify-center">
                                  {b.status !== "Confirmed" && (
                                    <button
                                      onClick={() => updateBookingStatus(b.id, "Confirmed")}
                                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
                                      title="Confirm & Approve"
                                    >
                                      <Check className="h-4.5 w-4.5" />
                                    </button>
                                  )}
                                  {b.status !== "Cancelled" && (
                                    <button
                                      onClick={() => updateBookingStatus(b.id, "Cancelled")}
                                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500 text-slate-950 hover:bg-rose-400 transition-colors"
                                      title="Cancel Reservation"
                                    >
                                      <X className="h-4.5 w-4.5" />
                                    </button>
                                  )}
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {/* --- MEMBERSHIPS TAB CONTENT --- */}
            {activeTab === "memberships" && isAdmin && (
              <div className="rounded-2xl border border-slate-800 bg-slate-950/30 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center">
                  <h5 className="font-bold text-white text-base">Active Membership Roster</h5>
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
                    {confirmedBookings.length} active members
                  </span>
                </div>

                <div className="overflow-x-auto">
                  {confirmedBookings.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">No active members found. Approve pending bookings to add members.</div>
                  ) : (
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/20">
                          <th className="px-5 py-4">Member ID</th>
                          <th className="px-5 py-4">Name / Contact</th>
                          <th className="px-5 py-4">Active Plan</th>
                          <th className="px-5 py-4">Date Joined</th>
                          <th className="px-5 py-4">Preferred Slot</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {confirmedBookings.map((b) => (
                          <tr key={b.id} className="hover:bg-slate-800/20 transition-colors">
                            <td className="px-5 py-4 font-mono text-cyan-400 font-bold">{b.id.replace("B-", "MEM-")}</td>
                            <td className="px-5 py-4">
                              <p className="font-semibold text-white">{b.name}</p>
                              <p className="text-xs text-slate-400">{b.email} | {b.mobile}</p>
                            </td>
                            <td className="px-5 py-4 font-semibold text-slate-200">{b.membershipType}</td>
                            <td className="px-5 py-4 text-slate-300 font-medium">{b.startDate}</td>
                            <td className="px-5 py-4 text-slate-400">{b.preferredTimeSlot}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {/* --- STORE INVENTORY TAB CONTENT --- */}
            {activeTab === "inventory" && isAdmin && (
              <div className="space-y-6">
                
                {/* Inventory Table */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950/30 overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-800 bg-slate-950/50">
                    <h5 className="font-bold text-white text-base">Store Catalog & Stock Levels</h5>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/20">
                          <th className="px-5 py-4">Image</th>
                          <th className="px-5 py-4">Product Name</th>
                          <th className="px-5 py-4">Category</th>
                          <th className="px-5 py-4">Price</th>
                          <th className="px-5 py-4">Stock Status</th>
                          <th className="px-5 py-4 text-center">Delete</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {products.map((p) => (
                          <tr key={p.id} className="hover:bg-slate-800/20 transition-colors">
                            <td className="px-5 py-3 shrink-0">
                              <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                            </td>
                            <td className="px-5 py-3 font-semibold text-white">{p.name}</td>
                            <td className="px-5 py-3 text-slate-400 font-medium">{p.category}</td>
                            <td className="px-5 py-3 text-cyan-400 font-bold">₹{p.price}</td>
                            <td className="px-5 py-3">
                              {stockEditId === p.id ? (
                                <div className="flex items-center gap-1.5">
                                  <input
                                    type="number"
                                    defaultValue={p.stock}
                                    onChange={(e) => setNewStockVal(e.target.value)}
                                    className="w-16 rounded border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-white"
                                  />
                                  <button
                                    onClick={() => handleUpdateStock(p.id)}
                                    className="p-1 text-emerald-400 hover:text-emerald-300"
                                  >
                                    <Check className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => setStockEditId(null)}
                                    className="p-1 text-rose-400 hover:text-rose-300"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-slate-200">{p.stock} units</span>
                                  <button
                                    onClick={() => {
                                      setStockEditId(p.id);
                                      setNewStockVal(p.stock);
                                    }}
                                    className="text-xs text-cyan-500 hover:underline"
                                  >
                                    Edit
                                  </button>
                                </div>
                              )}
                            </td>
                            <td className="px-5 py-3 text-center">
                              <button
                                onClick={() => deleteProduct(p.id)}
                                className="text-slate-500 hover:text-rose-500 p-1"
                              >
                                <Trash2 className="h-4.5 w-4.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Add New Product Form */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
                  <h5 className="font-bold text-white text-base mb-4 flex items-center gap-2">
                    <Plus className="h-5 w-5 text-cyan-400" />
                    Catalog New Product
                  </h5>

                  <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Product Name</label>
                      <input
                        type="text"
                        placeholder="Swimming Goggles V2"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        required
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Price (₹)</label>
                        <input
                          type="number"
                          placeholder="499"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          required
                          className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none text-center"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Quantity</label>
                        <input
                          type="number"
                          placeholder="20"
                          value={newProduct.stock}
                          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                          required
                          className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none text-center"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Category</label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
                      >
                        <option value="Goggles">Goggles</option>
                        <option value="Caps">Caps</option>
                        <option value="Costumes">Costumes</option>
                        <option value="Plugs">Plugs</option>
                        <option value="Combos">Combos</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Image URL</label>
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/..."
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Description</label>
                      <textarea
                        placeholder="Detailed anti-fog features..."
                        rows={2}
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-2 pt-2">
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-500 text-slate-950 py-3 font-semibold hover:bg-cyan-400 transition-colors"
                      >
                        <Plus className="h-4.5 w-4.5" />
                        <span>Confirm Add Item</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
