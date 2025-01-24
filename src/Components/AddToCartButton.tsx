'use client'

import { ProductInterface } from "@/type/Product";
import { FC } from "react";

const AddToCartButton: FC<{ itemProps: ProductInterface }> = ({ itemProps }) => {
  
    const handleAddToCart = (itemProps: ProductInterface) => {
        const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const updatedCart = [...existingCart, itemProps];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        alert(`Product added to cart! ${itemProps.title}`);
      };
  return (
    <button
      className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 transition-colors"
      onClick={() => handleAddToCart(itemProps)}
    >
      Add to Cart
      <svg
        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </button>
  );
};

export default AddToCartButton;