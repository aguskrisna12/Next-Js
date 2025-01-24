'use client'

import { useEffect } from "react";


export default function index() {

    
    useEffect(() => {
        window.scrollTo(0,0);
        const timer = setTimeout(() => {
            window.location.href = '/';
            localStorage.removeItem('cart');
        }, 2000);
        
        return () => clearTimeout(timer);
        
    }, []);
  return (
    <div className="min-h-screen pt-[200px] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="flex flex-col items-center space-y-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center">
              Thank you for your purchase!
            </h1>
            <div className="w-full max-w-lg">
              <img
                src="https://media.istockphoto.com/id/1451590744/vector/congratulations-beautiful-greeting-card-poster-banner.jpg?s=612x612&w=0&k=20&c=CD60HIUbZNFGDcVWOfBB90Zjp0weQaFBi5CjetIgRSw="
                alt="Thank you for your purchase!"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <p className="text-gray-600 text-lg md:text-xl text-center">
              Your order has been confirmed and will be shipped soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
