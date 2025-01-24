'use client'

import { FC } from "react";

const Description : FC<{ itemDescriptionProps: string }> = ({ itemDescriptionProps }) => {
  const maxString = (str: string, maxLength: number) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + "...";
    }
    return str;
  };
  return (
    <p className="mb-3 font-normal text-gray-700 flex-grow">
      {maxString(itemDescriptionProps, 100)}
    </p>
  );
};

export default Description;