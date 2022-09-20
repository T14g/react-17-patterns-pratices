import React from "react";

import { ProductStyles } from "./styles";

const Product = ({ name, imgSrc, url, price }) => {
  return (
    <ProductStyles>
      <a href={url} target="_blank">
        <img src={imgSrc} />
        <div className="name">{name}</div>
        <div className="price">A Partir de R$ {price}</div>
      </a>
    </ProductStyles>
  );
};

export default Product;
