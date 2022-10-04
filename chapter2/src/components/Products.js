import React, { useState, useEffect } from "react";
import { VARIANTS_URL } from "../../config";
import Filter from "./Filter";
import Product from "../components/Product";
import { getProductList, getParentsURLS, setParentData } from "./helpers";

import { ProductsStyles, Container } from "./styles";

const Products = () => {
  const [productsList, setProductsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOne, setFilterOne] = useState("");
  const [filterTwo, setFilterTwo] = useState("");
  const [filterThree, setFilterThree] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const isFilterEnabled = () =>
    filterOne !== "" || filterTwo !== "" || filterThree !== "";

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

  const fetchProducts = () => {
    setProductsList([]);
    setIsLoadingMore(false);

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
            setParentData(data, prods);
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
      setIsLoadingMore(true);

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
              setParentData(data, prods);
              setProductsList(prods);
              setCurrentPage(currentPage + 1);
              setIsLoadingMore(false);
            });
          } else {
            setIsLoadingMore(false);
            alert("Sem mais resultados.");
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
        disabled={isFilterEnabled()}
      />
      {productsList.length > 0 && !loading && (
        <ProductsStyles>
          {productsList.map(
            (item) =>
              item.img && (
                <Product
                  imgSrc={item.img}
                  name={item.name}
                  url={item.url}
                  price={item.price}
                  available={item.available}
                />
              )
          )}
        </ProductsStyles>
      )}

      {loading && !isLoadingMore && (
        <div className="loading">Aguarde carregando resultados...</div>
      )}

      {!loading && noResults && (
        <div>
          Nenhum resultado encontrado, tente novamente ou mude as opções.
        </div>
      )}

      {productsList.length > 0 && !loading && (
        <button
          className="load-more"
          onClick={loadMore}
          disabled={isLoadingMore}
        >
          {isLoadingMore ? "Aguarde..." : "Carregar mais"}
        </button>
      )}
    </Container>
  );
};

export default Products;
