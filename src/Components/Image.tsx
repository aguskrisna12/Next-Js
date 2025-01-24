'use client'
    
import { FC } from "react";

const Image: FC<{ itemImageProps: string }> = ({ itemImageProps }) => {
  return (
    <div className="relative pt-[75%]">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
        src={itemImageProps || ""}
        alt={itemImageProps || ""}
      />
    </div>
  );
};

export default Image;