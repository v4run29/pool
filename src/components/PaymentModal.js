"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Lock, Smartphone, CreditCard, Landmark, CheckCircle, RefreshCw } from "lucide-react";

export default function PaymentModal({ paymentInfo, onClose, onSuccess }) {
  const [activeTab, setActiveTab] = useState("upi"); // upi, card, netbank
  const [paymentState, setPaymentState] = useState("idle"); // idle, processing, success
  const [upiOption, setUpiOption] = useState("qr"); // qr, vpa
  const [vpaAddress, setVpaAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");

  const handlePay = (e) => {
    e.preventDefault();
    setPaymentState("processing");

    // Simulate Payment delay (2 seconds)
    setTimeout(() => {
      setPaymentState("success");
      
      // Complete confirmation after another 1.5s
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 2500);
  };

  if (!paymentInfo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />

      {/* Razorpay container */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl transition-all duration-300">
        
        {/* Header - Simulated Razorpay brand */}
        <div className="bg-slate-950 px-6 py-5 flex items-center justify-between border-b border-slate-900">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              Secure Checkout
            </div>
            <h4 className="text-lg font-bold text-white mt-1">VWT Swimming Pool</h4>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block font-medium">Amount to pay</span>
            <span className="text-xl font-extrabold text-cyan-400">₹{paymentInfo.total}</span>
          </div>
        </div>

        {/* Dynamic content depending on state */}
        {paymentState === "idle" && (
          <div>
            {/* Tabs */}
            <div className="flex border-b border-slate-800/80 text-sm font-semibold">
              <button
                onClick={() => setActiveTab("upi")}
                className={`flex-1 py-3.5 flex justify-center items-center gap-2 border-b-2 transition-all ${
                  activeTab === "upi"
                    ? "border-cyan-500 text-cyan-400 bg-slate-900"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                <Smartphone className="h-4 w-4" />
                UPI / QR
              </button>
              <button
                onClick={() => setActiveTab("card")}
                className={`flex-1 py-3.5 flex justify-center items-center gap-2 border-b-2 transition-all ${
                  activeTab === "card"
                    ? "border-cyan-500 text-cyan-400 bg-slate-900"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                <CreditCard className="h-4 w-4" />
                Cards
              </button>
              <button
                onClick={() => setActiveTab("netbank")}
                className={`flex-1 py-3.5 flex justify-center items-center gap-2 border-b-2 transition-all ${
                  activeTab === "netbank"
                    ? "border-cyan-500 text-cyan-400 bg-slate-900"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                <Landmark className="h-4 w-4" />
                Netbanking
              </button>
            </div>

            <form onSubmit={handlePay} className="p-6 space-y-5">
              {/* UPI Tab */}
              {activeTab === "upi" && (
                <div className="space-y-4">
                  <div className="flex gap-3 text-xs font-semibold p-1 rounded-xl bg-slate-950/60 border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setUpiOption("qr")}
                      className={`flex-1 py-2 rounded-lg transition-all ${
                        upiOption === "qr" ? "bg-cyan-500 text-slate-950 font-bold" : "text-slate-400"
                      }`}
                    >
                      Instant QR Code
                    </button>
                    <button
                      type="button"
                      onClick={() => setUpiOption("vpa")}
                      className={`flex-1 py-2 rounded-lg transition-all ${
                        upiOption === "vpa" ? "bg-cyan-500 text-slate-950 font-bold" : "text-slate-400"
                      }`}
                    >
                      Enter UPI ID
                    </button>
                  </div>

                  {upiOption === "qr" ? (
                    <div className="flex flex-col items-center py-4 bg-slate-950/40 rounded-2xl border border-slate-800/80">
                      {/* Simulated QR Code SVG */}
                      <div className="relative p-3 bg-white rounded-2xl shadow-inner mb-3">
                        <svg viewBox="0 0 100 100" className="h-36 w-36 text-slate-950">
                          {/* Outer frame */}
                          <path d="M5 5h30v10H15v20H5V5zm60 0h30v30H85V15H65V5zM5 65h10v20h20v10H5V65zm80 20v-20h10v30H65v-10h20z" fill="currentColor" />
                          {/* Inner boxes */}
                          <path d="M15 15h10v10H15V15zm0 60h10v10H15V75zm60-60h10v10H75V15z" fill="currentColor" />
                          {/* Random noise patterns */}
                          <path d="M35 15h5v5h-5zm0 10h10v5H35zm0 15h5v10h-5zm10-5h10v5H45zm5 10h15v5H50zm-15 10h10v5H35zm20 5h5v5h-5zm-5 10h15v5H50zm10-15h5v5h-5zm10 0h5v10h-5zm-5 15h10v5H65zm-15-40h5v10h-5zm15 0h10v5H65zm-5 10h5v10h-5zm10 5h5v5h-5z" fill="currentColor" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-slate-950 p-1.5 rounded-lg border border-white/20">
                            <span className="text-[8px] text-cyan-400 font-extrabold">VWT</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 font-medium">Scan using PhonePe, Google Pay, GPay, or Paytm</p>
                      <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-semibold">SSL Secured transaction</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                        Enter UPI ID / VPA
                      </label>
                      <input
                        type="text"
                        placeholder="example@ybl or mobile@paytm"
                        value={vpaAddress}
                        onChange={(e) => setVpaAddress(e.target.value)}
                        required
                        className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                  )}

                  {/* UPI Provider Apps Icons */}
                  <div className="pt-2">
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest text-center mb-3">
                      UPI Partners
                    </p>
                    <div className="grid grid-cols-4 gap-3 text-center">
                      <div className="rounded-xl bg-slate-950 border border-slate-800/80 p-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer">PhonePe</div>
                      <div className="rounded-xl bg-slate-950 border border-slate-800/80 p-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer">GPay</div>
                      <div className="rounded-xl bg-slate-950 border border-slate-800/80 p-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer">Paytm</div>
                      <div className="rounded-xl bg-slate-950 border border-slate-800/80 p-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer">Bhim UPI</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Cards Tab */}
              {activeTab === "card" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      required
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Card Number</label>
                    <input
                      type="text"
                      placeholder="4111 2222 3333 4444"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        required
                        className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none text-center"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">CVV</label>
                      <input
                        type="password"
                        placeholder="•••"
                        maxLength={3}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        required
                        className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none text-center"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Netbanking Tab */}
              {activeTab === "netbank" && (
                <div className="space-y-4">
                  <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                    Select Popular Banks
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 rounded-xl bg-slate-950 border border-slate-800/80 p-3 text-xs font-bold text-slate-300 hover:border-cyan-500 cursor-pointer">
                      <span className="h-2 w-2 rounded-full bg-cyan-400"></span> HDFC Bank
                    </div>
                    <div className="flex items-center gap-2 rounded-xl bg-slate-950 border border-slate-800/80 p-3 text-xs font-bold text-slate-300 hover:border-cyan-500 cursor-pointer">
                      <span className="h-2 w-2 rounded-full bg-cyan-400"></span> ICICI Bank
                    </div>
                    <div className="flex items-center gap-2 rounded-xl bg-slate-950 border border-slate-800/80 p-3 text-xs font-bold text-slate-300 hover:border-cyan-500 cursor-pointer">
                      <span className="h-2 w-2 rounded-full bg-cyan-400"></span> SBI Bank
                    </div>
                    <div className="flex items-center gap-2 rounded-xl bg-slate-950 border border-slate-800/80 p-3 text-xs font-bold text-slate-300 hover:border-cyan-500 cursor-pointer">
                      <span className="h-2 w-2 rounded-full bg-cyan-400"></span> Axis Bank
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] py-4 text-slate-950 font-bold tracking-wide transition-all"
                >
                  Pay ₹{paymentInfo.total} Securely
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex justify-center items-center gap-6 text-[10px] text-slate-500 font-medium border-t border-slate-800/60 pt-4 mt-2">
                <span className="flex items-center gap-1">
                  <Lock className="h-3 w-3 text-emerald-500" />
                  SSL Encrypted
                </span>
                <span>•</span>
                <span>Powered by Razorpay</span>
                <span>•</span>
                <span>PCI-DSS Compliant</span>
              </div>
            </form>
          </div>
        )}

        {/* Processing State */}
        {paymentState === "processing" && (
          <div className="p-12 flex flex-col items-center justify-center text-center space-y-6">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-slate-950 border-2 border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
              <RefreshCw className="h-10 w-10 text-cyan-400 animate-spin" />
            </div>
            <div>
              <h5 className="text-lg font-bold text-white">Authorizing Payment</h5>
              <p className="text-sm text-slate-400 mt-1">Please do not refresh this page or close the window.</p>
            </div>
          </div>
        )}

        {/* Success State */}
        {paymentState === "success" && (
          <div className="p-12 flex flex-col items-center justify-center text-center space-y-6 bg-slate-900">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 border-2 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              <CheckCircle className="h-12 w-12 text-emerald-400" />
            </div>
            <div>
              <h5 className="text-xl font-bold text-white">Payment Successful!</h5>
              <p className="text-sm text-emerald-400 mt-1">Transaction ID: TXN-{Math.floor(1000000000 + Math.random() * 9000000000)}</p>
              <p className="text-xs text-slate-400 mt-3">Syncing confirmation, please wait...</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
