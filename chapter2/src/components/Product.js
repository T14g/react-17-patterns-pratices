import React from "react";

import { ProductStyles } from "./styles";

const Product = ({ name, imgSrc, url, price, available }) => {
  return (
    <ProductStyles className="filter-product-single">
      <a href={url} target="_blank">
        <img src={imgSrc} />
        <div className="name">{name}</div>
        {available !== "0" ? (
          <div className="price">A Partir de R$ {price}</div>
        ) : (
          <div className="available">Indispon&iacute;vel</div>
        )}
      </a>
    </ProductStyles>
  );
};
  
export default Product;
