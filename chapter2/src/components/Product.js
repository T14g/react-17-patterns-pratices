import React from "react";

import { ProductStyles } from "./styles";

const Product = ({ name, imgSrc }) => {
  return (
    <ProductStyles>
      <img src={imgSrc} />
      <div>{name}</div>
    </ProductStyles>
  );
};

export default Product;
