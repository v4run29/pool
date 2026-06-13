"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const defaultProducts = [
  {
    id: 1,
    name: "Premium Swimming Goggles",
    category: "Goggles",
    description: "Professional anti-fog goggles with UV protection and soft silicone gaskets.",
    price: 150,
    rating: 4.8,
    reviews: [
      { user: "Rahul S.", rating: 5, comment: "Zero leaks! Crystal clear view under water." },
      { user: "Priya M.", rating: 4, comment: "Very comfortable, fits perfectly." }
    ],
    image: "/premium_goggles.jpg",
    stock: 25
  },
  {
    id: 2,
    name: "Speedo Swimming Cap",
    category: "Caps",
    description: "Premium 100% silicone waterproof caps designed to reduce drag and protect hair.",
    price: 100,
    rating: 4.5,
    reviews: [
      { user: "Vikram K.", rating: 4, comment: "Durable material, doesn't pull hair." }
    ],
    image: "/premium_cap.jpg",
    stock: 40
  },
  {
    id: 3,
    name: "Premium Swimming Costume",
    category: "Costumes",
    description: "Professional chlorine-resistant quick-dry swimming costume with ergonomic fit.",
    price: 500,
    rating: 4.7,
    reviews: [
      { user: "Ananya D.", rating: 5, comment: "Fabulous fit, very premium fabric!" },
      { user: "Sneha P.", rating: 4.5, comment: "Excellent stretch and fast drying." }
    ],
    image: "/premium_costume.jpg",
    stock: 15
  },
  {
    id: 4,
    name: "Ear Water Protection Plugs",
    category: "Plugs",
    description: "Comfortable waterproof soft silicone ear plugs to prevent swimmer's ear.",
    price: 199,
    rating: 4.3,
    reviews: [
      { user: "Amit T.", rating: 4, comment: "Keeps water out effectively." }
    ],
    image: "/premium_plugs.jpg",
    stock: 50
  },
  {
    id: 5,
    name: "Swimming Kit Combo",
    category: "Combos",
    description: "Complete professional swimming pack including premium anti-fog goggles, silicone cap, and ear plugs.",
    price: 799,
    rating: 4.9,
    reviews: [
      { user: "Rohan J.", rating: 5, comment: "Best value! All items are of excellent quality." }
    ],
    image: "/premium_kit.png",
    stock: 12
  },
  {
    id: 6,
    name: "Premium Inflatable Swimming Tube",
    category: "Tubes",
    description: "High-quality PVC swimming tube. Durable, waterproof, safe for kids/beginners, and lightweight.",
    price: 250,
    rating: 4.6,
    reviews: [],
    image: "/premium_tube.jpg",
    stock: 18
  }
];

const initialBookings = [
  {
    id: "B-8472",
    name: "Aman Sharma",
    mobile: "9876543210",
    email: "aman@example.com",
    membershipType: "Monthly Membership",
    preferredTimeSlot: "Morning 5 AM - 8 AM",
    startDate: "2026-06-15",
    price: 1500,
    status: "Confirmed",
    createdAt: "2026-06-11T12:30:00Z"
  },
  {
    id: "B-9104",
    name: "Pooja Hegde",
    mobile: "9988776655",
    email: "pooja@example.com",
    membershipType: "Weekly Pass",
    preferredTimeSlot: "Evening 4 PM - 7 PM",
    startDate: "2026-06-12",
    price: 500,
    status: "Pending Payment",
    createdAt: "2026-06-11T14:45:00Z"
  }
];

export function AppProvider({ children }) {
  const [user, setUser] = useState(null); // Current logged-in user
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState(defaultProducts);
  const [bookings, setBookings] = useState(initialBookings);

  // Hydrate from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("vwt_user");
    const savedCart = localStorage.getItem("vwt_cart");
    const savedWishlist = localStorage.getItem("vwt_wishlist");
    const savedProducts = localStorage.getItem("vwt_products");
    const savedBookings = localStorage.getItem("vwt_bookings");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedProducts) {
      try {
        const parsedProds = JSON.parse(savedProducts);
        // Force update default products parameters (name, price, image)
        const updatedProds = parsedProds.map((p) => {
          const defaultP = defaultProducts.find((dp) => dp.id === p.id);
          if (defaultP) {
            return {
              ...p,
              name: defaultP.name,
              price: defaultP.price,
              image: defaultP.image
            };
          }
          return p;
        });
        setProducts(updatedProds);
        localStorage.setItem("vwt_products", JSON.stringify(updatedProds));
      } catch (err) {
        setProducts(defaultProducts);
      }
    } else {
      setProducts(defaultProducts);
    }
    if (savedBookings) setBookings(JSON.parse(savedBookings));
  }, []);

  // Save changes to localStorage
  const saveToStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const login = (email, password) => {
    // Check if admin
    if (email === "admin@vwt.com" && password === "admin123") {
      const adminUser = { email, name: "VWT Admin", role: "admin" };
      setUser(adminUser);
      saveToStorage("vwt_user", adminUser);
      return { success: true, user: adminUser };
    }
    // Simulate generic user
    const standardUser = { email, name: email.split("@")[0], role: "user" };
    setUser(standardUser);
    saveToStorage("vwt_user", standardUser);
    return { success: true, user: standardUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("vwt_user");
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      let newCart;
      if (existingItem) {
        newCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity }];
      }
      saveToStorage("vwt_cart", newCart);
      return newCart;
    });
  };

  const updateCartQty = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) => {
      const newCart = prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      saveToStorage("vwt_cart", newCart);
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== productId);
      saveToStorage("vwt_cart", newCart);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    saveToStorage("vwt_cart", []);
  };

  const toggleWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      let newWishlist;
      if (prevWishlist.includes(productId)) {
        newWishlist = prevWishlist.filter((id) => id !== productId);
      } else {
        newWishlist = [...prevWishlist, productId];
      }
      saveToStorage("vwt_wishlist", newWishlist);
      return newWishlist;
    });
  };

  const addBooking = (bookingData) => {
    const newBooking = {
      ...bookingData,
      id: `B-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: bookingData.status || "Pending Payment"
    };
    setBookings((prevBookings) => {
      const newBookings = [newBooking, ...prevBookings];
      saveToStorage("vwt_bookings", newBookings);
      return newBookings;
    });
    return newBooking;
  };

  const updateBookingStatus = (bookingId, status) => {
    setBookings((prevBookings) => {
      const newBookings = prevBookings.map((b) =>
        b.id === bookingId ? { ...b, status } : b
      );
      saveToStorage("vwt_bookings", newBookings);
      return newBookings;
    });
  };

  const addProduct = (newProd) => {
    setProducts((prevProds) => {
      const product = {
        ...newProd,
        id: prevProds.length > 0 ? Math.max(...prevProds.map((p) => p.id)) + 1 : 1,
        rating: 5.0,
        reviews: []
      };
      const newProducts = [...prevProds, product];
      saveToStorage("vwt_products", newProducts);
      return newProducts;
    });
  };

  const updateProductStock = (productId, quantityChange) => {
    setProducts((prevProds) => {
      const newProducts = prevProds.map((p) =>
        p.id === productId ? { ...p, stock: Math.max(0, p.stock - quantityChange) } : p
      );
      saveToStorage("vwt_products", newProducts);
      return newProducts;
    });
  };

  const deleteProduct = (productId) => {
    setProducts((prevProds) => {
      const newProducts = prevProds.filter((p) => p.id !== productId);
      saveToStorage("vwt_products", newProducts);
      return newProducts;
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        getCartTotal,
        wishlist,
        toggleWishlist,
        products,
        bookings,
        addBooking,
        updateBookingStatus,
        addProduct,
        updateProductStock,
        deleteProduct
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
