import React, { useState } from "react";

const Filter = ({
  onChangeFirst,
  onChangeSeccond,
  onChangeThird,
  onSubmit,
}) => {
  const [redondas, setRedondas] = useState(false);

  return (
    <div>
      {!redondas ? (
        <>
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
        </>
      ) : (
        <select onChange={onChangeThird}>
          <option>Diâmetro</option>
          <option value="1\,30">1,30</option>
          <option value="1\,40">1,40</option>
          <option value="1\,50">1,50</option>
          <option value="1\,60">1,160</option>
          <option value="1\,70">1,170</option>
          <option value="1\,80">1,80</option>
          <option value="1\,90">1,90</option>
          <option value="2\,00">2,00</option>
        </select>
      )}
      <input type="checkbox" onChange={() => setRedondas(!redondas)} />
      Filtrar toalhas redondas
      <button onClick={() => onSubmit()}>Fetch</button>
    </div>
  );
};

export default Filter;
