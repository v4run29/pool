"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { Calendar, Clock, CreditCard, X, ShieldAlert } from "lucide-react";

export default function BookingForm({ selectedPlan, onClose, onOpenPayment }) {
  const { addBooking } = useApp();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    membershipType: "Monthly Premium Membership",
    preferredTimeSlot: "Morning 5 AM - 8 AM",
    startDate: ""
  });

  const [formErrors, setFormErrors] = useState({});

  // Align membershipType with selectedPlan if passed
  useEffect(() => {
    if (selectedPlan) {
      setFormData((prev) => ({
        ...prev,
        membershipType: selectedPlan.name
      }));
    }
  }, [selectedPlan]);

  const validate = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = "Full name is required";
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile.trim())) {
      errors.mobile = "Please enter a valid 10-digit mobile number";
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.startDate) errors.startDate = "Preferred start date is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getPlanPrice = (planName) => {
    switch (planName) {
      case "Daily Pass":
        return 100;
      case "Weekly Pass":
        return 650;
      case "Monthly Premium Membership":
      case "Monthly Membership":
      default:
        return 2000;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const price = getPlanPrice(formData.membershipType);
    
    // Add pending booking
    const booking = addBooking({
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      membershipType: formData.membershipType,
      preferredTimeSlot: formData.preferredTimeSlot,
      startDate: formData.startDate,
      price: price,
      status: "Pending Payment"
    });

    onClose();

    // Open Payment Popup
    setTimeout(() => {
      onOpenPayment({
        type: "booking_checkout",
        bookingId: booking.id,
        total: price
      });
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />

      {/* Main container */}
      <div className="relative z-10 w-full max-w-lg overflow-y-auto max-h-[90vh] rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl transition-all duration-300">
        
        {/* Header */}
        <div className="bg-slate-950 px-6 py-5 flex items-center justify-between border-b border-slate-900">
          <div>
            <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider block">Reservation Gateway</span>
            <h4 className="text-xl font-bold text-white mt-1">Book Swimming Session</h4>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-800 p-2 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Aman Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full rounded-2xl border bg-slate-950 px-4 py-3.5 text-sm text-white focus:border-cyan-500 focus:outline-none ${
                formErrors.name ? "border-rose-500/50" : "border-slate-800"
              }`}
            />
            {formErrors.name && <p className="text-xs text-rose-500">{formErrors.name}</p>}
          </div>

          {/* Contact details row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mobile Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                Mobile Number
              </label>
              <input
                type="tel"
                placeholder="9876543210"
                maxLength={10}
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className={`w-full rounded-2xl border bg-slate-950 px-4 py-3.5 text-sm text-white focus:border-cyan-500 focus:outline-none ${
                  formErrors.mobile ? "border-rose-500/50" : "border-slate-800"
                }`}
              />
              {formErrors.mobile && <p className="text-xs text-rose-500">{formErrors.mobile}</p>}
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                Email Address
              </label>
              <input
                type="email"
                placeholder="aman@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full rounded-2xl border bg-slate-950 px-4 py-3.5 text-sm text-white focus:border-cyan-500 focus:outline-none ${
                  formErrors.email ? "border-rose-500/50" : "border-slate-800"
                }`}
              />
              {formErrors.email && <p className="text-xs text-rose-500">{formErrors.email}</p>}
            </div>
          </div>

          {/* Membership Type selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
              Membership Type
            </label>
            <select
              value={formData.membershipType}
              onChange={(e) => setFormData({ ...formData, membershipType: e.target.value })}
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="Daily Pass">Daily Pass — ₹100</option>
              <option value="Weekly Pass">Weekly Pass — ₹650</option>
              <option value="Monthly Premium Membership">Monthly Premium Membership — ₹2000</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Preferred Time Slot */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-cyan-400" />
                Time Slot
              </label>
              <select
                value={formData.preferredTimeSlot}
                onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="Morning 5 AM - 8 AM">Morning 5 AM - 8 AM</option>
                <option value="Morning 8 AM - 11 AM">Morning 8 AM - 11 AM</option>
                <option value="Evening 4 PM - 7 PM">Evening 4 PM - 7 PM</option>
                <option value="Evening 7 PM - 10 PM">Evening 7 PM - 10 PM</option>
              </select>
            </div>

            {/* Start Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-cyan-400" />
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className={`w-full rounded-2xl border bg-slate-950 px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none ${
                  formErrors.startDate ? "border-rose-500/50" : "border-slate-800"
                }`}
              />
              {formErrors.startDate && <p className="text-xs text-rose-500">{formErrors.startDate}</p>}
            </div>
          </div>

          {/* Secure disclaimer */}
          <div className="flex gap-2.5 items-start rounded-2xl bg-cyan-950/20 border border-cyan-800/30 p-3.5 text-xs text-cyan-200">
            <CreditCard className="h-4.5 w-4.5 text-cyan-400 shrink-0 mt-0.5" />
            <p>
              Submitting this form redirects to our secure payment gateway mockup. Instantly confirm your slot using PhonePe, Google Pay, cards, or QR codes.
            </p>
          </div>

          {/* Action button */}
          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] py-4 text-slate-950 font-bold tracking-wide transition-all"
          >
            Reserve My Slot
          </button>
        </form>
      </div>
    </div>
  );
}
