"use client";

import { ProductInterface } from "@/type/Product";
import { CategoryInterface } from "@/type/Product";

import { useState, useEffect } from "react";
import Spinner from "@/Components/Spinner";
import Header from "@/layout/Header";

export default function Index() {
  const [searchItem, setSearchItem] = useState<string>("");
  const [searchResults, setSearchResult] = useState<ProductInterface[]>([]);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);

  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(event.target.value);
  };

  const handleSearch = async () => {
    const data = await fetchData(
      `https://api.escuelajs.co/api/v1/products/?title=${searchItem}`
    );
    setSearchResult(data);
  };

  const handleCategory = async () => {
    const data = await fetchData("https://api.escuelajs.co/api/v1/categories");
    setCategories(data);
  };

  const handleCategoryClick = async (categoryId: number) => {
    const data = await fetchData(
      `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`
    );
    setSearchResult(data);
  };

  const handleAddToCart = (itemProduct : ProductInterface) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    const updatedCart = [...existingCart, itemProduct]
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    alert(`Product added to cart! ${itemProduct.title}`)
  }

  useEffect(() => {
    if (searchItem) {
      handleSearch();
    } else {
      setSearchResult([]);
    }
  }, [searchItem]);

  useEffect(() => {
    handleCategory();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto mt-[8rem]">
        <div className="flex flex-col items-center p-4">
          <div className="w-full max-w-xl mb-8">
            <input
              type="text"
              placeholder="Search products..."
              value={searchItem}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center w-full max-w-6xl mx-auto mb-8">
            {!categories ? (
              <Spinner />
            ) : (
              categories.map((category: CategoryInterface) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {category.name}
                </button>
              ))
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {searchResults.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
              >
                <div className="relative pt-[75%]">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                    {product.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-between items-center mt-auto">
                    <span className="text-lg font-bold text-green-700">
                      ${product.price}
                    </span>
                    <button
                        onClick={()=> handleAddToCart(product)}
                        className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
