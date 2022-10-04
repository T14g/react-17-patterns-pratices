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

  .load-more {
    background-color: #8e264e;
    border-radius: 40px;
    font-size: 18px;
    color: #fff;
    font-weight: 600;
    text-transform: capitalize;
    transition: all 0.2s ease-out;
    width: 100%;
    max-width: 300px;
    height: 50px;
    border: none;
    margin: 15px auto;
    display: block;

    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }

    &:disabled {
      background: gray;
    }
  }
`;

export const ProductsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
  height: 600px;
  overflow: auto;
  border-bottom: 1px #c6c6c6 solid;
  border-top: 1px #c6c6c6 solid;
  padding-bottom: 15px;
`;

export const ProductStyles = styled.div`
  width: 210px;
  font-size: 14px;
  text-align: center;
  padding: 15px;

  a {
    color: #8e264e;
    text-decoration: none;

    img {
      width: 200px;
      height: 150px;
    }

    .name {
      max-width: 200px;
      margin: 0 auto;
      font-size: 14px;
    }

    .price {
      font-weight: 800;
      font-size: 18px;
    }

    .available {
      font-weight: 800;
      font-size: 18px;
      color: rgb(52 44 47);
    }
  }
`;

export const FilterStyles = styled.div`
  margin: 20px 0;

  @media (min-width: 731px) {
    display: flex;
  }

  select {
    @media (max-width: 730px) {
      display: block;
      width: 100%;
      margin-bottom: 10px;
    }
  }

  .block-radio {
    padding-top: 5px;

    @media (max-width: 730px) {
      padding-top: 0;
      margin-bottom: 15px;
    }

    input {
      @media (max-width: 730px) {
        margin: 0;
        margin-right: 5px;
      }
    }
  }

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

    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }

    &:disabled {
      background: #c7c7c7;

      &:hover {
        cursor: initial;
        opacity: 1;
      }
    }

    @media (max-width: 730px) {
      display: block;
      width: 100%;
      margin-bottom: 10px;
      max-width: initial;
    }
  }
`;
