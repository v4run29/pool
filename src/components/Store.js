"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { ShoppingCart, Heart, Trash2, X, Star, MessageSquare } from "lucide-react";

export default function Store({ cartOpen, onCloseCart, onOpenPayment }) {
  const {
    products,
    cart,
    addToCart,
    updateCartQty,
    removeFromCart,
    wishlist,
    toggleWishlist,
    getCartTotal
  } = useApp();

  const [activeReviewsId, setActiveReviewsId] = useState(null);

  const cartTotal = getCartTotal();

  const handleBuyNow = (product) => {
    addToCart(product, 1);
    onCloseCart();
    // Delay slightly to ensure item is added
    setTimeout(() => {
      onOpenPayment({ type: "product_checkout", total: product.price });
    }, 150);
  };

  const handleCheckout = () => {
    onCloseCart();
    onOpenPayment({ type: "cart_checkout", total: cartTotal });
  };

  return (
    <section id="store" className="relative py-24 z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-base font-semibold uppercase tracking-widest text-cyan-400">
          VWT E-STORE
        </h2>
        <p className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl font-display bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
          Premium Swim Gear & Equipment
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
          Gear up like a pro. High-performance, durable, and comfortable swim equipment designed for beginners and elite athletes alike.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 md:grid-cols-3 md:gap-y-12 md:gap-x-8">
        {products.map((product) => {
          const isWishlisted = wishlist.includes(product.id);
          const showReviews = activeReviewsId === product.id;

          return (
            <div
              key={product.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-700/80 hover:shadow-[0_15px_30px_rgba(6,182,212,0.15)]"
            >
              {/* Product Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950/80 text-slate-300 hover:text-rose-500 backdrop-blur-md transition-colors"
                >
                  <Heart
                    className={`h-5 w-5 ${isWishlisted ? "fill-rose-500 text-rose-500" : ""}`}
                  />
                </button>

                {/* Stock Indicator */}
                <span className="absolute bottom-4 left-4 rounded-lg bg-slate-950/80 px-2.5 py-1 text-xs font-medium text-cyan-400 backdrop-blur-md border border-cyan-500/20">
                  {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                </span>
              </div>

              {/* Product Info */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white tracking-tight">{product.name}</h3>
                  <p className="text-xl font-extrabold text-cyan-400">₹{product.price}</p>
                </div>

                <p className="text-sm text-slate-400 line-clamp-2 mb-4 flex-1">
                  {product.description}
                </p>

                {/* Rating & Review trigger */}
                <div className="flex items-center gap-4 mb-6 text-sm">
                  <div className="flex items-center text-amber-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 font-semibold text-white">{product.rating}</span>
                  </div>
                  <button
                    onClick={() => setActiveReviewsId(showReviews ? null : product.id)}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>{product.reviews.length} Reviews</span>
                  </button>
                </div>

                {/* Reviews Accordion */}
                {showReviews && (
                  <div className="mb-6 rounded-2xl bg-slate-900/50 p-4 border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                      Member Reviews
                    </h4>
                    {product.reviews.length > 0 ? (
                      <div className="space-y-3 max-h-40 overflow-y-auto pr-1">
                        {product.reviews.map((rev, rIdx) => (
                          <div key={rIdx} className="text-xs border-b border-slate-800/50 pb-2 last:border-b-0 last:pb-0">
                            <div className="flex justify-between text-white font-medium mb-1">
                              <span>{rev.user}</span>
                              <span className="text-amber-400">{"★".repeat(rev.rating)}</span>
                            </div>
                            <p className="text-slate-400 italic">"{rev.comment}"</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 italic">No reviews yet. Be the first!</p>
                    )}
                  </div>
                )}

                {/* Add to Cart Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => addToCart(product, 1)}
                    disabled={product.stock === 0}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-sm font-semibold text-white py-3 transition-colors disabled:opacity-50"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={() => handleBuyNow(product)}
                    disabled={product.stock === 0}
                    className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] text-sm font-semibold text-slate-950 py-3 transition-all disabled:opacity-50"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide-over Shopping Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onCloseCart} />
          
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10">
            <div className="pointer-events-auto w-screen max-w-md transform bg-slate-950 border-l border-slate-850 p-6 shadow-2xl flex flex-col h-full relative z-50">
              <div className="flex items-center justify-between border-b border-slate-900 pb-5">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <ShoppingCart className="h-6 w-6 text-cyan-400" />
                  Your Cart
                </h3>
                <button
                  onClick={onCloseCart}
                  className="rounded-xl border border-slate-800 p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto py-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-slate-500">
                    <ShoppingCart className="h-16 w-16 mb-4 stroke-1 text-slate-600" />
                    <p className="text-lg font-medium">Your cart is empty</p>
                    <p className="text-sm mt-1 text-center max-w-xs">
                      Explore our swimming store and add products to start your swimming journey.
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 rounded-2xl bg-slate-900/40 p-4 border border-slate-900"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-xl object-cover"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-white text-base leading-tight">{item.name}</h4>
                          <p className="text-cyan-400 text-sm font-semibold mt-1">₹{item.price}</p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 px-1 py-0.5">
                            <button
                              onClick={() => updateCartQty(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-slate-400 hover:text-white"
                            >
                              -
                            </button>
                            <span className="px-3 text-sm font-semibold text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQty(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-slate-400 hover:text-white"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-500 hover:text-rose-500 transition-colors p-1"
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {cart.length > 0 && (
                <div className="border-t border-slate-900 pt-5 space-y-4">
                  <div className="flex justify-between text-base font-semibold text-white">
                    <span>Subtotal</span>
                    <span className="text-xl font-bold text-cyan-400">₹{cartTotal}</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Shipping and taxes calculated at checkout. Simulated Secure SSL Payments supported.
                  </p>
                  <button
                    onClick={handleCheckout}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] py-4 text-slate-950 font-bold tracking-wide transition-all"
                  >
                    <span>Proceed to Checkout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
