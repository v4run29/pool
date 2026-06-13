"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import BubblesBackground from "@/components/BubblesBackground";
import Store from "@/components/Store";
import BookingForm from "@/components/BookingForm";
import PaymentModal from "@/components/PaymentModal";
import AdminDashboard from "@/components/AdminDashboard";
import LoginModal from "@/components/LoginModal";
import {
  Calendar,
  ShieldCheck,
  Check,
  Clock,
  MapPin,
  Phone,
  Mail,
  Award,
  Sparkles,
  Droplet,
  Shield,
  CreditCard,
  Building,
  Star,
  ChevronLeft,
  ChevronRight,
  Send,
  MessageCircle,
  Eye,
  X,
  Volume2
} from "lucide-react";

// Gallery Images
const galleryItems = [
  {
    id: 1,
    title: "Main Training Pool",
    category: "Swimming Pool",
    image: "/pool_gallery_1.png"
  },
  {
    id: 2,
    title: "Crystal Clean Waters",
    category: "Club Standards",
    image: "/pool_gallery_2.png"
  },
  {
    id: 3,
    title: "Lap Swimmers Zone",
    category: "Olympic Lanes",
    image: "/pool_gallery_3.png"
  },
  {
    id: 4,
    title: "Kids Splash Academy",
    category: "Kids Swimming",
    image: "/pool_gallery_4.png"
  },
  {
    id: 5,
    title: "Toddlers Fun Zone",
    category: "Coaching",
    image: "/pool_gallery_5.png"
  },
  {
    id: 6,
    title: "Gala Swim Session",
    category: "Recreation",
    image: "/pool_gallery_6.png"
  }
];

// Testimonials data
const testimonials = [
  {
    name: "Rohan Kapoor",
    role: "National Swimmer",
    quote: "VWT Swimming Pool has the best training infrastructure in the country. The temperature control and advanced UV filtration make training sessions extremely comfortable.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Dr. Shalini Roy",
    role: "Club Member",
    quote: "The locker facilities are clean and secure, and the booking system is seamless. Perfect for early morning slots before heading to the clinic.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Kartik Aryan",
    role: "Fitness Enthusiast",
    quote: "Excellent trainers. I started as a beginner a month ago, and now I can comfortably swim laps. The weekly memberships fit my busy schedules perfectly.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  }
];

export default function Home() {
  const { user, cart, updateBookingStatus, clearCart, updateProductStock } = useApp();

  // Modals / Overlays Visibility State
  const [cartOpen, setCartOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  
  // Active selection context
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);
  
  // Testimonial & Gallery active indices
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeImageId, setActiveImageId] = useState(null);

  // Form submission success states
  const [contactSuccess, setContactSuccess] = useState(false);

  // Auto-scroll testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenBooking = (plan) => {
    setSelectedPlan(plan);
    setBookingOpen(true);
  };

  const handlePaymentSuccess = () => {
    const info = paymentInfo;
    setPaymentInfo(null);

    if (info) {
      if (info.type === "booking_checkout") {
        updateBookingStatus(info.bookingId, "Confirmed");
        alert("Booking Confirmed Successfully! Welcome to VWT Club.");
      } else if (info.type === "cart_checkout" || info.type === "product_checkout") {
        // Deduct quantities
        cart.forEach((item) => {
          updateProductStock(item.id, item.quantity);
        });
        clearCart();
        alert("Store Order Placed & Confirmed Successfully!");
      }
    }
  };

  return (
    <div className="relative min-h-screen select-none">
      
      {/* 3D Interactive Canvas & Water Bubbles overlay */}
      <BubblesBackground />

      {/* Floating Action Button (Booking trigger) */}
      <button
        onClick={() => handleOpenBooking(null)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] px-5 py-4 text-slate-950 font-bold tracking-wide transition-all scale-100 hover:scale-105"
      >
        <Calendar className="h-5 w-5" />
        <span className="hidden sm:inline">Book Session</span>
      </button>

      {/* Glassmorphism Sticky Navbar */}
      <Navbar
        onOpenCart={() => setCartOpen(true)}
        onOpenLogin={() => setLoginOpen(true)}
        onOpenBooking={() => handleOpenBooking(null)}
        onOpenDashboard={() => setDashboardOpen(true)}
      />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        
        {/* Background gradient layout */}
        <div className="absolute inset-0 z-0 bg-radial-at-t from-cyan-950/20 via-slate-950/90 to-slate-950" />
        
        {/* Top/Bottom ambient light drops */}
        <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-cyan-600/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          
          {/* Header Badges */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-cyan-500/20 bg-cyan-950/20 px-4.5 py-2 text-xs font-bold text-cyan-400 backdrop-blur-md">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span>Premium Sports Club Experience</span>
          </div>

          {/* Main Titles */}
          <div className="space-y-4">
            <h1 className="text-xs mob:text-sm font-semibold tracking-widest text-slate-400 uppercase">
              Dive Into Excellence
            </h1>
            <p className="text-4xl mob:text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-display">
              VWT <span className="bg-gradient-to-r from-cyan-400 via-cyan-200 to-blue-500 bg-clip-text text-transparent">SWIMMING POOL</span>
            </p>
            <p className="max-w-2xl mx-auto text-sm mob:text-base sm:text-lg lg:text-xl text-slate-300 font-light">
              Experience the pinnacle of aquatic luxury and training. Immerse yourself in advanced climate-controlled waters guided by elite coaches.
            </p>
          </div>

          {/* Interactive CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mob:gap-4 pt-4 w-full max-w-md mx-auto sm:max-w-none">
            <button
              onClick={() => handleOpenBooking({ name: "Monthly Membership" })}
              className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] px-6 py-3.5 mob:px-8 mob:py-4.5 text-slate-950 font-extrabold tracking-wide transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Join Now
            </button>
            <button
              onClick={() => handleOpenBooking(null)}
              className="w-full sm:w-auto rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-800 backdrop-blur-md px-6 py-3.5 mob:px-8 mob:py-4.5 text-white font-semibold transition-colors cursor-pointer"
            >
              Book Swimming Session
            </button>
          </div>

          {/* Features Badges row */}
          <div className="grid grid-cols-1 mob:grid-cols-2 md:grid-cols-4 gap-3 mob:gap-4 max-w-4xl mx-auto pt-16 border-t border-slate-900/60">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-900 bg-slate-950/40 p-4 backdrop-blur-md">
              <Award className="h-5 w-5 text-cyan-400" />
              <span className="text-xs font-semibold text-slate-300">Certified Trainers</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-900 bg-slate-950/40 p-4 backdrop-blur-md">
              <ShieldCheck className="h-5 w-5 text-cyan-400" />
              <span className="text-xs font-semibold text-slate-300">Safe Environment</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-900 bg-slate-950/40 p-4 backdrop-blur-md">
              <Calendar className="h-5 w-5 text-cyan-400" />
              <span className="text-xs font-semibold text-slate-300">Online Booking</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-900 bg-slate-950/40 p-4 backdrop-blur-md">
              <CreditCard className="h-5 w-5 text-cyan-400" />
              <span className="text-xs font-semibold text-slate-300">Secure Payments</span>
            </div>
          </div>

        </div>

        {/* Liquid Wave Bottom Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg className="relative block w-full h-[60px] text-slate-950" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,84.11,25.82c33.36,9.26,67.66,16.51,101.9,23A1058.21,1058.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      {/* 2. WHY CHOOSE US SECTION */}
      <section id="why-choose-us" className="relative py-24 z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold uppercase tracking-widest text-cyan-400">
            CLUB STANDARDS
          </h2>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl font-display">
            A New Standard of Swimming
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            We offer premium facilities tailored to elevate your lifestyle, ensuring safety, clean waters, and high-performance guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Card 1: Coaches */}
          <div className="rounded-3xl border border-slate-900 bg-slate-950/40 p-8 backdrop-blur-md hover:border-slate-800 transition-colors">
            <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400 mb-6">
              <Award className="h-6 w-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Professional Coaches</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Train under national swimmers and FINA-certified coaches designed to guide your technique from toddler levels to master laps.
            </p>
          </div>

          {/* Card 2: Filtration */}
          <div className="rounded-3xl border border-slate-900 bg-slate-950/40 p-8 backdrop-blur-md hover:border-slate-800 transition-colors">
            <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400 mb-6">
              <Droplet className="h-6 w-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Crystal Clean Water</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our advanced multi-phase ozone and UV filtration systems recycle the pool volumes continuously, ensuring zero chlorine irritation.
            </p>
          </div>

          {/* Card 3: Lifeguards */}
          <div className="rounded-3xl border border-slate-900 bg-slate-950/40 p-8 backdrop-blur-md hover:border-slate-800 transition-colors">
            <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400 mb-6">
              <Shield className="h-6 w-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Safety First</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Certified on-duty lifeguards, emergency evacuation protocols, and continuous medical aid kit readiness are always present at deck.
            </p>
          </div>

          {/* Card 4: Flexible */}
          <div className="rounded-3xl border border-slate-900 bg-slate-950/40 p-8 backdrop-blur-md hover:border-slate-800 transition-colors">
            <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400 mb-6">
              <Calendar className="h-6 w-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Flexible Memberships</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Choose daily, weekly, or monthly subscription setups that match your lifestyle. Easily upgrade or pause plans instantly.
            </p>
          </div>

          {/* Card 5: Secure Payments */}
          <div className="rounded-3xl border border-slate-900 bg-slate-950/40 p-8 backdrop-blur-md hover:border-slate-800 transition-colors">
            <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400 mb-6">
              <CreditCard className="h-6 w-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Secure Payments</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              All transactions are secured using standard SSL protocols. Instant reservations via PhonePe, card gateways, or secure UPI.
            </p>
          </div>

          {/* Card 6: Lockers */}
          <div className="rounded-3xl border border-slate-900 bg-slate-950/40 p-8 backdrop-blur-md hover:border-slate-800 transition-colors">
            <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400 mb-6">
              <Building className="h-6 w-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Modern Facilities</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Enjoy access to premium individual changing chambers, secure personal lockers, hot shower decks, and dry zones.
            </p>
          </div>
        </div>
      </section>

      {/* 3. MEMBERSHIP PLANS SECTION */}
      <section id="memberships" className="relative py-24 z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold uppercase tracking-widest text-cyan-400">
            MEMBERSHIP PLANS
          </h2>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl font-display">
            Flexible Subscription Models
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            Sign up for memberships that match your schedule and training priorities. Unlock full club access instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: 1 Hour Swimming Pass */}
          <div className="rounded-3xl border border-slate-900 bg-slate-950/40 p-8 backdrop-blur-md flex flex-col justify-between hover:border-slate-800/80 transition-all duration-300 group">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Single Access</span>
              <h4 className="text-2xl font-bold text-white mt-2">1 Hour Swimming Pass</h4>
              <p className="text-slate-400 text-xs mt-1">Perfect for casual visitors and quick swim sessions.</p>
              
              <div className="my-8">
                <span className="text-4xl font-extrabold text-white">₹100</span>
                <span className="text-slate-400 text-sm"> / Hour</span>
              </div>

              <ul className="space-y-3.5 text-sm text-slate-300">
                <li className="flex items-center gap-2.5">
                  <Check className="h-4.5 w-4.5 text-cyan-400 shrink-0" />
                  <span>Pool Access for 1 Hour</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4.5 w-4.5 text-cyan-400 shrink-0" />
                  <span>Clean & Safe Environment</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4.5 w-4.5 text-cyan-400 shrink-0" />
                  <span>Lifeguard Supervision</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleOpenBooking({ name: "1 Hour Swimming Pass" })}
              className="mt-8 w-full rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-white font-semibold py-3.5 transition-colors cursor-pointer"
            >
              Book Now
            </button>
          </div>

          {/* Card 2: Weekly Pass */}
          <div className="rounded-3xl border border-slate-900 bg-slate-950/40 p-8 backdrop-blur-md flex flex-col justify-between hover:border-slate-800/80 transition-all duration-300 group">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Short-Term Access</span>
              <h4 className="text-2xl font-bold text-white mt-2">Weekly Pass</h4>
              <p className="text-slate-400 text-xs mt-1">Great for travelers or regular swimmers.</p>
              
              <div className="my-8">
                <span className="text-4xl font-extrabold text-white">₹650</span>
                <span className="text-slate-400 text-sm"> / Week</span>
              </div>

              <ul className="space-y-3.5 text-sm text-slate-300">
                <li className="flex items-center gap-2.5">
                  <Check className="h-4.5 w-4.5 text-cyan-400 shrink-0" />
                  <span>Unlimited Access for 7 Days</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4.5 w-4.5 text-cyan-400 shrink-0" />
                  <span>Flexible Timings (6 AM – 7 PM)</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleOpenBooking({ name: "Weekly Pass" })}
              className="mt-8 w-full rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-white font-semibold py-3.5 transition-colors cursor-pointer"
            >
              Join Weekly
            </button>
          </div>

          {/* Card 3: Monthly Membership */}
          <div className="relative rounded-3xl border-2 border-cyan-500 bg-slate-950 p-8 shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col justify-between hover:shadow-[0_0_40px_rgba(6,182,212,0.25)] transition-all duration-300 group">
            {/* Most popular badge */}
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-cyan-500 px-4 py-1 text-xs font-bold text-slate-950 tracking-wider uppercase animate-pulse">
              Most Popular
            </span>
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Full Elite Access</span>
              <h4 className="text-2xl font-bold text-white mt-2">Monthly Membership</h4>
              <p className="text-slate-400 text-xs mt-1">Our comprehensive package for full development.</p>
              
              <div className="my-8">
                <span className="text-4xl font-extrabold text-white">₹2,000</span>
                <span className="text-slate-400 text-sm"> / Month</span>
              </div>

              <ul className="space-y-3.5 text-sm text-slate-300">
                <li className="flex items-center gap-2.5">
                  <Check className="h-4.5 w-4.5 text-cyan-400 shrink-0" />
                  <span>Unlimited Access for 30 Days</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4.5 w-4.5 text-cyan-400 shrink-0" />
                  <span>Priority Entry</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4.5 w-4.5 text-cyan-400 shrink-0" />
                  <span>Premium Facilities</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleOpenBooking({ name: "Monthly Membership" })}
              className="mt-8 w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] text-slate-950 font-bold py-3.5 transition-all cursor-pointer"
            >
              Become Premium Member
            </button>
          </div>

        </div>
      </section>

      {/* 4. SWIMMING STORE (E-COMMERCE) */}
      <Store
        cartOpen={cartOpen}
        onCloseCart={() => setCartOpen(false)}
        onOpenPayment={(info) => setPaymentInfo(info)}
      />

      {/* 5. GALLERY SECTION */}
      <section id="gallery" className="relative py-24 z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold uppercase tracking-widest text-cyan-400">
            CLUB SNAPSHOTS
          </h2>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl font-display">
            VWT Masonry Gallery
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            Take a visual tour through our state-of-the-art facilities, kids academies, and competitive gala meets.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 mob:grid-cols-2 md:grid-cols-3 gap-4 mob:gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImageId(item.id)}
              className="group relative cursor-pointer overflow-hidden rounded-3xl border border-slate-900 bg-slate-950/60 aspect-[4/3] transition-all duration-300 hover:border-slate-800"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{item.category}</span>
                <h4 className="text-lg font-bold text-white mt-1 flex items-center gap-1.5">
                  {item.title}
                  <Eye className="h-4.5 w-4.5 text-cyan-400" />
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeImageId !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setActiveImageId(null)} />
            
            <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-2 shadow-2xl flex flex-col">
              <button
                onClick={() => setActiveImageId(null)}
                className="absolute top-4 right-4 z-20 rounded-xl bg-slate-950/80 border border-slate-800 p-2 text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative aspect-[16/10] w-full bg-slate-950 overflow-hidden rounded-2xl">
                <img
                  src={galleryItems.find((img) => img.id === activeImageId)?.image}
                  alt="Gallery Image"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="px-6 py-4 flex justify-between items-center bg-slate-950/40 rounded-b-2xl border-t border-slate-800/60 mt-1">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                    {galleryItems.find((img) => img.id === activeImageId)?.category}
                  </span>
                  <h5 className="text-lg font-bold text-white mt-0.5">
                    {galleryItems.find((img) => img.id === activeImageId)?.title}
                  </h5>
                </div>
                
                {/* Navigation controls */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const nextId = activeImageId > 1 ? activeImageId - 1 : galleryItems.length;
                      setActiveImageId(nextId);
                    }}
                    className="rounded-lg border border-slate-800 p-2 hover:bg-slate-800 text-white"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      const nextId = activeImageId < galleryItems.length ? activeImageId + 1 : 1;
                      setActiveImageId(nextId);
                    }}
                    className="rounded-lg border border-slate-800 p-2 hover:bg-slate-800 text-white"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="relative py-24 z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold uppercase tracking-widest text-cyan-400">
            TESTIMONIALS
          </h2>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl font-display">
            Trusted by Club Members
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="max-w-3xl mx-auto relative">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/60 backdrop-blur-md p-8 sm:p-12 shadow-2xl relative overflow-hidden transition-all duration-500">
            {/* Background elements */}
            <div className="absolute top-0 right-0 h-32 w-32 bg-cyan-500/5 blur-3xl rounded-full" />
            
            <div className="flex items-center gap-1.5 mb-6 text-amber-400 justify-center">
              {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>

            <p className="text-lg sm:text-xl text-slate-200 italic text-center leading-relaxed">
              "{testimonials[activeTestimonial].quote}"
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
              <img
                src={testimonials[activeTestimonial].avatar}
                alt={testimonials[activeTestimonial].name}
                className="h-14 w-14 rounded-full border-2 border-cyan-400/40 object-cover"
              />
              <div>
                <h5 className="font-bold text-white text-base">{testimonials[activeTestimonial].name}</h5>
                <p className="text-xs text-cyan-400 font-semibold">{testimonials[activeTestimonial].role}</p>
              </div>
            </div>
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  activeTestimonial === idx ? "w-6 bg-cyan-400" : "w-2.5 bg-slate-800 hover:bg-slate-700"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. ABOUT VWT SWIMMING POOL */}
      <section id="about" className="relative py-24 z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Text panel */}
          <div className="space-y-6">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block">About Our Club</span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              VWT Swimming Pool
            </h3>
            <p className="text-slate-300 leading-relaxed text-base">
              VWT Swimming Pool provides premium swimming facilities, professional coaching, and flexible membership plans for beginners and advanced swimmers. Our mission is to deliver a safe, clean, and enjoyable swimming experience through world-class infrastructure and expert guidance.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Founded with the goal of fostering athletic growth and relaxation, our facilities maintain strict chemical balances, consistent 28°C heating standards, and separate toddler training rings.
            </p>
            
            {/* Quick stats list */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-900">
              <div>
                <h5 className="text-2xl font-bold text-cyan-400 font-display">25 Meters</h5>
                <p className="text-xs text-slate-500 font-semibold uppercase mt-0.5">Olympic Lanes length</p>
              </div>
              <div>
                <h5 className="text-2xl font-bold text-cyan-400 font-display">100% UV</h5>
                <p className="text-xs text-slate-500 font-semibold uppercase mt-0.5">Ozone filtered water</p>
              </div>
            </div>
          </div>

          {/* Graphical element / mockup pool photo */}
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-slate-800 bg-slate-900 p-2 shadow-2xl">
            <div className="relative h-full w-full rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80"
                alt="VWT Club Lounge"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-6">
                <span className="text-xs font-semibold text-white bg-slate-950/80 px-3.5 py-1.5 rounded-lg border border-slate-800 backdrop-blur-sm">
                  Lounge View
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. CONTACT SECTION */}
      <section id="contact" className="relative py-24 z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Information Block - Left 5 columns */}
          <div className="md:col-span-5 space-y-6 mob:space-y-8">
            <div>
              <h2 className="text-base font-semibold uppercase tracking-widest text-cyan-400">
                GET IN TOUCH
              </h2>
              <p className="mt-2 text-3xl font-extrabold text-white tracking-tight font-display">
                Contact VWT Pool
              </p>
              <p className="mt-3 text-slate-400 text-sm">
                Have questions regarding custom packages or corporate coaching leagues? Connect with our desk.
              </p>
            </div>

            <div className="space-y-6">
              {/* Phone item */}
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 shrink-0">
                  <Phone className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">Phone Number</h5>
                  <p className="text-sm text-slate-400 mt-0.5">+91 7075419</p>
                  
                  {/* WhatsApp button */}
                  <a
                    href="https://wa.me/917075419"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 mt-1 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Email item */}
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 shrink-0">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">Email Address</h5>
                  <p className="text-sm text-slate-400 mt-0.5">info@vwtpool.com</p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 shrink-0">
                  <Clock className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">Business Hours</h5>
                  <p className="text-sm text-slate-300 mt-0.5">Morning Session: 6:00 AM — 12:00 PM</p>
                  <p className="text-sm text-slate-300">Evening Session: 12:00 PM — 7:00 PM</p>
                  <p className="text-xs text-slate-500 mt-0.5 font-semibold">Open Daily: 6:00 AM — 7:00 PM</p>
                </div>
              </div>
            </div>

            {/* Simulated Location Map (Custom Styled Embed Mockup) */}
            <a
              href="https://www.bing.com/maps?q=VWT+SWIMMING+POOL&ss=ypid.YN7D2CD3D87BF73D80&name=VWT+SWIMMING+POOL&cp=18.038511276245117~79.53133392333984&lvl=15&ppois=18.038511276245117_79.53133392333984_VWT+SWIMMING+POOL&style=r&trfc=&FORM=MPSRPL&mepi=0~~Embedded~LargeMapLink"
              target="_blank"
              rel="noreferrer"
              className="block rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/40 p-4 space-y-3 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all group"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                <MapPin className="h-4 w-4" />
                VWT Location Coordinates
              </div>
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800/80">
                {/* Simulated Map Graphic SVG matching real Bheemaram Reservoir layout */}
                <svg viewBox="0 0 400 225" className="h-full w-full text-slate-750 bg-[#020617] select-none">
                  {/* Grid lines */}
                  <line x1="0" y1="50" x2="400" y2="50" stroke="#0f172a" strokeWidth="0.5" />
                  <line x1="0" y1="110" x2="400" y2="110" stroke="#0f172a" strokeWidth="0.5" />
                  <line x1="0" y1="170" x2="400" y2="170" stroke="#0f172a" strokeWidth="0.5" />
                  <line x1="100" y1="0" x2="100" y2="225" stroke="#0f172a" strokeWidth="0.5" />
                  <line x1="250" y1="0" x2="250" y2="225" stroke="#0f172a" strokeWidth="0.5" />

                  {/* Bheemaram Reservoir */}
                  <path d="M150,0 C190,30 200,20 260,25 C310,30 330,70 320,115 C310,125 285,135 250,130 C200,125 160,115 140,75 C120,45 90,20 150,0 Z" fill="rgba(6, 182, 212, 0.12)" stroke="#06b6d4" strokeWidth="1.5" />
                  <text x="230" y="65" fill="#06b6d4" fontSize="9" fontWeight="bold" textAnchor="middle">Bheemaram Reservoir</text>

                  {/* Local Streets */}
                  <path d="M0,140 L180,120 L240,225 M150,75 L80,150 M320,115 L400,165 M300,195 L400,195" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                  {/* Highway NH563 */}
                  <path d="M355,0 L385,225" stroke="#f59e0b" strokeWidth="7" strokeLinecap="round" opacity="0.15" />
                  <path d="M355,0 L385,225" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
                  <text x="362" y="45" fill="#f59e0b" fontSize="8" fontWeight="bold">NH563</text>

                  {/* Colleges / Landmarks */}
                  <text x="375" y="180" fill="#475569" fontSize="7" fontWeight="bold" textAnchor="end">SVS IT College</text>
                  <text x="385" y="110" fill="#475569" fontSize="7" fontWeight="bold" textAnchor="end">Sree Jagannadha Gardens</text>

                  {/* VWT SWIMMING POOL Label */}
                  <text x="210" y="165" fill="#ffffff" fontSize="9" fontWeight="extrabold" textAnchor="middle">VWT SWIMMING POOL</text>
                  {/* Pin mark */}
                  <circle cx="210" cy="145" r="4.5" fill="#f43f5e" />
                  <circle cx="210" cy="145" r="10" fill="none" stroke="#f43f5e" strokeWidth="1" className="animate-ping" />
                </svg>
              </div>
              <p className="text-[10px] text-slate-500 font-medium group-hover:text-cyan-400 transition-colors">
                Bheemaram Reservoir Road, Bheemaram, Hanamkonda, Warangal, Telangana, 506015
              </p>
            </a>
          </div>

          {/* Contact Form - Right 7 columns */}
          <div className="md:col-span-7 rounded-3xl border border-slate-800 bg-slate-950/40 p-6 mob:p-8 backdrop-blur-md">
            {contactSuccess ? (
              <div className="p-8 text-center space-y-4">
                <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <Check className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Message Dispatched</h4>
                <p className="text-slate-400 text-sm max-w-sm mx-auto">
                  Thank you for connecting. Our club managers will reach out to you via email or phone shortly.
                </p>
                <button
                  onClick={() => setContactSuccess(false)}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 px-6 py-2.5 text-xs text-white hover:bg-slate-800"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactSuccess(true);
                }}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Name</label>
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Phone</label>
                    <input
                      type="tel"
                      placeholder="Phone"
                      required
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Message</label>
                  <textarea
                    placeholder="Your Message"
                    rows={5}
                    required
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] py-4 text-slate-950 font-bold tracking-wide transition-all"
                >
                  <Send className="h-4.5 w-4.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 9. FOOTER SECTION */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-8">
          
          {/* Logo Column */}
          <div className="col-span-1 sm:col-span-3 md:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5">
                <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-slate-950 text-cyan-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4.5 w-4.5">
                    <path d="M2 6c.6.5 1.2 1 2.5 1s1.9-.5 2.5-1c.6-.5 1.2-1 2.5-1s1.9.5 2.5 1c.6.5 1.2 1 2.5 1s1.9-.5 2.5-1c.6-.5 1.2-1 2.5-1s1.9.5 2.5 1" />
                    <path d="M2 12c.6.5 1.2 1 2.5 1s1.9-.5 2.5-1c.6-.5 1.2-1 2.5-1s1.9.5 2.5 1c.6.5 1.2 1 2.5 1s1.9-.5 2.5-1c.6-.5 1.2-1 2.5-1s1.9.5 2.5 1" />
                  </svg>
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-wide">VWT POOL</span>
            </a>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              World-class club infrastructure, ozone filtration, and elite swim coaching parameters. Experience swimming at its absolute best.
            </p>
            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
              © 2026 VWT Swimming Pool. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Quick Links</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#why-choose-us" className="hover:text-cyan-400 transition-colors">Club Standards</a></li>
              <li><a href="#gallery" className="hover:text-cyan-400 transition-colors">Gallery Snapshots</a></li>
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Contact Gate</a></li>
            </ul>
          </div>

          {/* Memberships */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Memberships</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => handleOpenBooking({ name: "1 Hour Swimming Pass" })} className="hover:text-cyan-400 text-left transition-colors">1 Hour Swimming Pass</button></li>
              <li><button onClick={() => handleOpenBooking({ name: "Weekly Pass" })} className="hover:text-cyan-400 text-left transition-colors">Weekly Pass</button></li>
              <li><button onClick={() => handleOpenBooking({ name: "Monthly Membership" })} className="hover:text-cyan-400 text-left transition-colors">Monthly Membership</button></li>
            </ul>
          </div>

          {/* Social icons */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Social Channels</h5>
            <div className="flex gap-3 text-slate-400">
              <a href="#" className="h-8 w-8 rounded-lg border border-slate-900 bg-slate-950/80 flex items-center justify-center hover:text-cyan-400 hover:border-slate-800 transition-all">FB</a>
              <a href="#" className="h-8 w-8 rounded-lg border border-slate-900 bg-slate-950/80 flex items-center justify-center hover:text-cyan-400 hover:border-slate-800 transition-all">IG</a>
              <a href="#" className="h-8 w-8 rounded-lg border border-slate-900 bg-slate-950/80 flex items-center justify-center hover:text-cyan-400 hover:border-slate-800 transition-all">YT</a>
              <a href="#" className="h-8 w-8 rounded-lg border border-slate-900 bg-slate-950/80 flex items-center justify-center hover:text-cyan-400 hover:border-slate-800 transition-all">WA</a>
            </div>
          </div>

        </div>
      </footer>

      {/* --- ALL OVERLAYS & MODALS LOGIC --- */}

      {/* Booking Form Modal */}
      {bookingOpen && (
        <BookingForm
          selectedPlan={selectedPlan}
          onClose={() => setBookingOpen(false)}
          onOpenPayment={(info) => setPaymentInfo(info)}
        />
      )}

      {/* Payment Gateway Modal */}
      {paymentInfo !== null && (
        <PaymentModal
          paymentInfo={paymentInfo}
          onClose={() => setPaymentInfo(null)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Login Portal Modal */}
      {loginOpen && (
        <LoginModal
          onClose={() => setLoginOpen(false)}
          onOpenDashboard={() => setDashboardOpen(true)}
        />
      )}

      {/* User Dashboard / Admin Console Modal */}
      {dashboardOpen && (
        <AdminDashboard
          onClose={() => setDashboardOpen(false)}
        />
      )}

    </div>
  );
}
