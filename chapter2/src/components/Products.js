import React, { useState, useEffect } from "react";
import { TRAY_URL, VARIANTS_URL } from "../../config";
import Filter from "./Filter";
import Product from "../components/Product";

import { ProductsStyles, Container } from "./styles";

const Products = () => {
  const [productsList, setProductsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOne, setFilterOne] = useState("");
  const [filterTwo, setFilterTwo] = useState("");
  const [filterThree, setFilterThree] = useState("");
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const getURL = () => {
    let url = VARIANTS_URL;
    if (filterThree !== "") {
      url += `?type_1=Diametro&value_1=${filterThree}`;
    } else {
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
    }

    return url;
  };

  const validation = () =>
    filterOne !== "" || filterTwo !== "" || filterThree !== "";

  const getProductList = (data) => {
    const prods = [];

    data.forEach((variant) => {
      let item = {};
      item.prod_id = variant.Variant.product_id;
      item.img = variant.Variant.VariantImage[0]?.https;
      item.name = "";
      item.url = variant.Variant.url.https;
      item.price = variant.Variant.price;
      prods.push(item);
    });

    return prods;
  };

  const getParentsURLS = (data) => {
    const urls = [];

    data.forEach((prod) => {
      urls.push(TRAY_URL + "/" + prod.prod_id);
    });

    return urls;
  };

  const fetchProducts = () => {
    setProductsList([]);

    if (validation()) {
      setLoading(true);
      setNoResults(false);

      fetch(getURL())
        .then((result) => result.json())
        .then((data) => {
          const { Variants } = data;
          const prods = getProductList(Variants);
          const urls = getParentsURLS(prods);
          setProductsList(Variants);

          Promise.all(
            urls.map((url) =>
              fetch(url).then((result) => {
                return result.json();
              })
            )
          ).then((data) => {
            data.forEach((prod) => {
              prods.forEach((p) => {
                if (p.prod_id === prod.Product.id) {
                  p.name = prod.Product.name;
                }
              });
            });

            setProductsList(prods);
            setLoading(false);

            if (prods.length === 0) {
              setNoResults(true);
            }
          });
        });
    } else {
      console.log("error");
    }
  };

  const loadMore = () => {
    let url = getURL();
    url += `&page=${currentPage + 1}`;

    if (validation()) {
      setLoading(true);

      fetch(url)
        .then((result) => result.json())
        .then((data) => {
          if (data.Variants.length > 0) {
            const { Variants } = data;
            const prods = getProductList(Variants);
            const urls = getParentsURLS(prods);

            Promise.all(
              urls.map((url) =>
                fetch(url).then((result) => {
                  return result.json();
                })
              )
            ).then((data) => {
              data.forEach((prod) => {
                prods.forEach((p) => {
                  if (p.prod_id === prod.Product.id) {
                    p.name = prod.Product.name;
                  }
                });
              });

              setProductsList(prods);
              setProductsList([...productsList, ...prods]);
              setCurrentPage(currentPage + 1);
              setLoading(false);
            });
          }
        });
    }
  };

  return (
    <Container>
      <h1>Encontre Toalhas com o novo buscador</h1>
      <div>
        Selecione as dimensões ou marque filtrar toalhas redondas para pesquisar
        por diâmetro
      </div>
      <Filter
        onChangeFirst={(e) => {
          setFilterOne(e.target.value);
          setFilterThree("");
          setCurrentPage(1);
        }}
        onChangeSeccond={(e) => {
          setFilterTwo(e.target.value);
          setFilterThree("");
          setCurrentPage(1);
        }}
        onChangeThird={(e) => {
          setFilterThree(e.target.value);
          setFilterOne("");
          setFilterTwo("");
          setCurrentPage(1);
        }}
        onSubmit={fetchProducts}
      />
      {productsList.length > 0 && (
        <ProductsStyles>
          {productsList.map((item) => (
            <Product
              imgSrc={item.img}
              name={item.name}
              url={item.url}
              price={item.price}
            />
          ))}
        </ProductsStyles>
      )}

      {loading && (
        <div className="loading">Aguarde carregando resultados...</div>
      )}

      {!loading && noResults && (
        <div>
          Nenhum resultado encontrado, entre novamente ou mude as opções.
        </div>
      )}
      {productsList.length > 0 && !loading   && (
        <button className="load-more" onClick={loadMore}>
          Carregar mais
        </button>
      )}
    </Container>
  );
};

export default Products;
