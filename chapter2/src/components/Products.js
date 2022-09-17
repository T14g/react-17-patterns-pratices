import React, { useState, useEffect } from "react";
import { TRAY_URL, VARIANTS_URL } from "../../config";
import Filter from "./Filter";
import Product from "../components/Product";

import { ProductsStyles } from "./styles";

const Products = () => {
  const [productsList, setProductsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOne, setFilterOne] = useState("");
  const [filterTwo, setFilterTwo] = useState("");
  const [filterThree, setFilterThree] = useState("");

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
          const productsFiltered = [];
          const prods = [];
          setProductsList(Variants);
          console.log(Variants);

          Variants.forEach((variant) => {
            let item = {};
            item.prod_id = variant.Variant.product_id;
            item.img = variant.Variant.VariantImage[0]?.https;
            item.name = "";
            item.url = variant.Variant.url.https;
            prods.push(item);
          });

          prods.forEach((prod) => {
            urls.push(TRAY_URL + "/" + prod.prod_id);
          });

          //       Variants.forEach((variant) => {
          //         urls.push(TRAY_URL + "/" + variant.Variant.id);
          //       });

          //       console.log(urls);
          Promise.all(
            urls.map((url) =>
              fetch(url).then((result) => {
                return result.json();
              })
            )
          ).then((data) => {
            data.forEach((prod) => {
              prods.forEach((p) => {
                // console.log(prod);
                if (p.prod_id === prod.Product.id) {
                  // console.log("achou");
                  p.name = prod.Product.name;
                }
              });
            });

            console.log(prods);
            setProductsList(prods);
          });
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

  // console.log(productsList);
  const loadMore = () => {
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

    if (filterThree !== "") {
      url += `?type_1=Diametro&value_1=${filterThree}`;
    }

    url += `&page=${currentPage + 1}`;

    fetch(url)
      .then((result) => result.json())
      .then((data) => {
        if (data.Variants.length > 0) {
          const { Variants } = data;
          const urls = [];
          const productsFiltered = [];
          const prods = [];
          setProductsList(Variants);
          console.log(Variants);

          Variants.forEach((variant) => {
            let item = {};
            item.prod_id = variant.Variant.product_id;
            item.img = variant.Variant.VariantImage[0]?.https;
            item.name = "";
            item.url = variant.Variant.url.https;
            prods.push(item);
          });

          prods.forEach((prod) => {
            urls.push(TRAY_URL + "/" + prod.prod_id);
          });

          Promise.all(
            urls.map((url) =>
              fetch(url).then((result) => {
                return result.json();
              })
            )
          ).then((data) => {
            data.forEach((prod) => {
              prods.forEach((p) => {
                // console.log(prod);
                if (p.prod_id === prod.Product.id) {
                  // console.log("achou");
                  p.name = prod.Product.name;
                }
              });
            });

            console.log(prods);
            setProductsList(prods);

            setProductsList([...productsList, ...prods]);
            setCurrentPage(currentPage + 1);
          });
        }
      });
  };

  console.log("yes");

  console.log(productsList);
  console.log(filterThree);

  // useEffect(() => {
  //   setFilterOne("");
  //   setFilterTwo("");
  //   console.log("Limpando 1 e 2");
  // }, [filterThree]);

  // useEffect(() => {
  //   setFilterThree("");
  //   console.log("Limpando 3");
  // }, [filterOne, filterTwo]);

  return (
    <div>
      <h1>Lista de produtos</h1>
      <Filter
        onChangeFirst={(e) => {
          setFilterOne(e.target.value);
          setFilterThree('');
        }}
        onChangeSeccond={(e) => {
          setFilterTwo(e.target.value)
          setFilterThree('');
        }}
        onChangeThird={(e) => {
          setFilterThree(e.target.value)
          setFilterOne('');
          setFilterTwo('');
        }}
      />
      <button onClick={fetchProducts}>Fetch</button>
      {productsList.length}
      <ProductsStyles>
        {productsList.length > 0 &&
          productsList.map((item) => (
            <Product imgSrc={item.img} name={item.name} url={item.url} />
          ))}
      </ProductsStyles>
      {productsList.length > 0 && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

export default Products;
