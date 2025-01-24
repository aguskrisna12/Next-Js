"use client";
import EmptyCart from "@/Components/EmptyCart";
import Header from "@/layout/Header";
import { ProductInterface } from "@/type/Product";
import Link from "next/link";
import { useEffect, useState } from "react";
import BackToHomeButton from "@/Components/BackToHomeButton";

export default function index() {
  const [cartItems, setCartItems] = useState<ProductInterface[]>([]);

  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const updateQuantityAndPrice = (productId: number, increment: boolean) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 1) + (increment ? 1 : -1), 1),
    }));
  };

  const incrementQuantity = (productId: number) => {
    updateQuantityAndPrice(productId, true);
  };

  const decrementQuantity = (productId: number) => {
    updateQuantityAndPrice(productId, false);
  };

  const getItemTotal = (item: ProductInterface) => {
    return item.price * (quantities[item.id] || 1);
  };

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCartItems(JSON.parse(cart));
    }
  }, []);

  const removeFromCart = (productId: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <>  
      <BackToHomeButton />
        <div className="container mx-auto mt-[8rem] sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center sm:text-left">
            Shopping Cart
        </h1>
        {cartItems.length === 0 ? (
            <EmptyCart />
        ) : (
            <div className="space-y-6">
            {cartItems.map((item) => (
                <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between border border-gray-200 p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-4 sm:mb-0">
                    <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-32 h-32 sm:w-24 sm:h-24 object-cover rounded-lg"
                    />
                    <div className="text-center sm:text-left">
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-lg font-medium">
                        ${getItemTotal(item)}
                    </p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0">
                    <button
                    onClick={() => decrementQuantity(item.id)}
                    className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm xs:text-base sm:text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                    -
                    </button>
                    <span className="text-base xs:text-lg sm:text-xl font-medium min-w-[1.5rem] xs:min-w-[2rem] sm:min-w-[2.5rem] text-center">
                    {quantities[item.id] || 1}
                    </span>
                    <button
                    onClick={() => incrementQuantity(item.id)}
                    className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm xs:text-base sm:text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                    +
                    </button>
                </div>
                <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-6 py-2 text-red-600 hover:text-red-800 border border-red-600 rounded-full hover:bg-red-50 transition-colors"
                >
                    Remove
                </button>
                </div>
            ))}
            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center bg-gray-50 p-6 rounded-lg">
                <p className="text-xl sm:text-2xl font-bold mb-4 sm:mb-0">
                Total: $
                {cartItems
                    .reduce((sum, item) => sum + getItemTotal(item), 0)
                    .toFixed(2)}
                </p>
                <Link
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                href="/checkout"
                >
                Proceed to Checkout
                </Link>
            </div>
            </div>
        )}
        </div>
    </>
  );
}
