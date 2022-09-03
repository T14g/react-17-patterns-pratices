import React from "react";

import { ProductStyles } from "./styles";

const Product = ({ name, imgSrc, url }) => {
  return (
    <ProductStyles>
      <a href={url} target="_blank">
        <img src={imgSrc} />
        <div>{name}</div>
      </a>
    </ProductStyles>
  );
};

export default Product;
