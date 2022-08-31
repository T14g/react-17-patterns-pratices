import React, { useState } from "react";
import { TRAY_URL } from "../../config";
import Product from "../components/Product";

import { ProductsStyles } from "./styles";

const Products = () => {
  const [productsList, setProductsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = () => {
    let params = {};
    params["limit"] = "10";             

    fetch(TRAY_URL, {
      data: params,
    })
      .then((result) => result.json())
      .then((data) => {
        setProductsList(data?.Products);
      });
  };
  console.log(productsList);
  const loadMore = () => {
    let params = {};
    params["page"] = currentPage + 1;
    params["limit"] = "100";

    fetch(TRAY_URL, {
      data: params,
    })
      .then((result) => result.json())
      .then((data) => {
        setProductsList([...productsList, ...data?.Products]);
        setCurrentPage(currentPage + 1);
      });
  };

  return (
    <div>
      <h1>Lista de produtos</h1>
      123a
      <button onClick={fetchProducts}>Fetch</button>
      {productsList.length}
      <ProductsStyles>
        {productsList.length > 0 &&
          productsList.map((item) => (
            <Product
              imgSrc={item.Product.ProductImage[0]?.https}
              name={item.Product.name}
            />
          ))}
      </ProductsStyles>
      {productsList.length > 0 && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

export default Products;
