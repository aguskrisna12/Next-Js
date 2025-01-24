'use client'

import { FC } from "react";

const Price : FC<{ itemPriceProps: number }> = ({ itemPriceProps }) => {
  return (
    <p className="mb-4 text-lg font-semibold text-green-600 dark:text-green-400">
      ${itemPriceProps}
    </p>
  );
};

export default Price;