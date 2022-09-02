import React from "react";

const Filter = ({ onChangeFirst, onChangeSeccond }) => {
  return (
    <div>
      <select onChange={onChangeFirst}>
        <option>Largura</option>
        <option value="1\,30">1,30</option>
        <option value="1\,40">1,40</option>
        <option value="1\,50">1,50</option>
        <option value="1\,60">1,160</option>
        <option value="1\,70">1,170</option>
        <option value="1\,80">1,80</option>
        <option value="1\,90">1,90</option>
        <option value="2\,00">2,00</option>
      </select>
      <select onChange={onChangeSeccond}>
        <option>Comprimento</option>
        <option value="1\,30">1,30</option>
        <option value="1\,40">1,40</option>
        <option value="1\,50">1,50</option>
        <option value="1\,60">1,160</option>
        <option value="1\,70">1,170</option>
        <option value="1\,80">1,80</option>
        <option value="1\,90">1,90</option>
        <option value="2\,00">2,00</option>
      </select>
    </div>
  );
};

export default Filter;
