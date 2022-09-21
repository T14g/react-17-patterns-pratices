import styled from "styled-components";

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  font-family: "Roboto", cursive;

  select {
    font-size: 18px;
    padding: 3px;
    width: 155px;
    margin-right: 10px;
  }
`;

export const ProductsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
`;

export const ProductStyles = styled.div`
  width: 300px;
  font-size: 14px;
  text-align: center;
  padding: 15px;

  img {
    width: 100%;
    height: 200px;
  }
`;

export const FilterStyles = styled.div`
  margin: 20px 0;
  
  label {
    font-size: 18px;
    margin-right: 15px;
  }

  button {
    background-color: #8e264e;
    border-radius: 40px;
    font-size: 18px;
    color: #fff;
    font-weight: 600;
    text-transform: capitalize;
    transition: all 0.2s ease-out;
    width: 100%;
    max-width: 150px;
    height: 30px;
    border: none;
  }
`;
