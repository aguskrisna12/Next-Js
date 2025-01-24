"use client";

import { ProductInterface } from "@/type/Product";
import Spinner from "@/Components/Spinner";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import Header from "@/layout/Header";
import BackToHomeButton from "@/Components/BackToHomeButton";
const DisplayProduct = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleAddToCart = (product: ProductInterface) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = [...existingCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Product added to cart!");
  };  

  console.log(id);

  const fetcher = (url : any ) =>
    fetch(url).then((res) =>
      res.json()
    );

  const { data, error, isLoading } = useSWR(
    `https://api.escuelajs.co/api/v1/products/${id}`,
    fetcher
  );
  console.log(data);
  console.log(error);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto mt-[7rem] px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <BackToHomeButton />
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border-1 border-gray-200 hover:border-green-500 transition-colors duration-300">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2">
                <img
                  className="w-full h-[400px] object-cover lg:h-[600px]"
                  src={data.images[0]}
                  alt={data.title}
                />
              </div>
              <div className="lg:w-1/2 p-6 lg:p-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  {data.title}
                </h1>
                <p className="text-xl font-semibold text-green-700 mb-6">
                  ${data.price}
                </p>
                <div className="prose prose-lg mb-8">
                    <p className="text-gray-700">
                    {data.description}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <button
                  onClick={() => handleAddToCart(data)}
                  className="w-full sm:w-auto px-6 py-3 text-base font-medium text-white bg-green-700 rounded-lg hover:bg-green-600 focus:ring-4 focus:ring-green-300 focus:outline-none transition-colors duration-200 flex items-center justify-center">
                    Add to Cart
                    <svg
                      className="w-5 h-5 ml-2"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayProduct;
