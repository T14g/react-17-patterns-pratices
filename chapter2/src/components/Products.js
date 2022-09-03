import React, { useState } from "react";
import { TRAY_URL, VARIANTS_URL } from "../../config";
import Filter from "./Filter";
import Product from "../components/Product";

import { ProductsStyles } from "./styles";

const Products = () => {
  const [productsList, setProductsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOne, setFilterOne] = useState("");
  const [filterTwo, setFilterTwo] = useState("");

  const getProductName = (id) => {
    fetch(TRAY_URL + "/" + id)
      .then((result) => result.json())
      .then((data) => {
        return data.Product.name;
      });
  };

  const fetchProducts = () => {
    let url = VARIANTS_URL;
    let params = {};
    params["limit"] = "10";

    if (filterOne !== "") {
      url += `?type_1=Largura&value_1=${filterOne}`;

      if (filterTwo !== "") {
        url += `&type_2=Comprimento&value_2=${filterTwo}`;
      }
    } else {
      if (filterTwo !== "") {
        url += `?type_2=Comprimento&value_2=${filterTwo}`;
      }
    }

    if (filterOne !== "" || filterTwo !== "") {
      fetch(url)
        .then((result) => result.json())
        .then((data) => {
          const { Variants } = data;
          const urls = [];

          Variants.forEach((variant) => {
            urls.push(TRAY_URL + "/" + variant.id);
          });

          Promise.all(
            urls.map((url) => fetch(url).then((result) => result.json()))
          ).then((data) => {
            console.log(data);
          });

          // setProductsList(data.Variants);
        });
    } else {
      console.log("error");
    }
  };

  const fetchVariants = ({}) => {
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
    let url = VARIANTS_URL;

    if (filterOne !== "") {
      url += `?type_1=Largura&value_1=${filterOne}`;

      if (filterTwo !== "") {
        url += `&type_2=Comprimento&value_2=${filterTwo}`;
      }
    } else {
      if (filterTwo !== "") {
        url += `?type_2=Comprimento&value_2=${filterTwo}`;
      }
    }

    url += `&page=${currentPage + 1}`;

    if (filterOne !== "" || filterTwo !== "") {
      fetch(url)
        .then((result) => result.json())
        .then((data) => {
          if (data.Variants.length > 0) {
            setProductsList([...productsList, ...data?.Variants]);
            setCurrentPage(currentPage + 1);
          }
        });
    } else {
      console.log("error");
    }
  };

  return (
    <div>
      <h1>Lista de produtos</h1>
      <Filter
        onChangeFirst={(e) => setFilterOne(e.target.value)}
        onChangeSeccond={(e) => setFilterTwo(e.target.value)}
      />
      <button onClick={fetchProducts}>Fetch</button>
      {productsList.length}
      <ProductsStyles>
        {productsList.length > 0 &&
          productsList.map((item) => (
            <Product
              imgSrc={item.Variant.VariantImage[0]?.https}
              name={""}
              url={item.Variant.url.https}
            />
          ))}
      </ProductsStyles>
      {productsList.length > 0 && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

export default Products;
