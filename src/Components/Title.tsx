import { FC } from "react";

const Title : FC<{ itemTitleProps: string }> = ({ itemTitleProps }) => {
  return (
    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
      {itemTitleProps}
    </h5>
  );
};

export default Title;