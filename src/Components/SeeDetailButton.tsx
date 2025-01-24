'use client'

import { FC } from "react";
import { useRouter } from "next/router";

const SeeDetailButton : FC<{ itemIdProps: number }> = ({ itemIdProps }) => {
    const router = useRouter()
  return (
    <button 
      onClick={() => router.push(`/product/${itemIdProps}`)}
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full sm:w-auto"
    >
      See Detail
    </button>
  );
};

export default SeeDetailButton;