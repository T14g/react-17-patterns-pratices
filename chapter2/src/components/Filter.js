import React, { useState } from "react";
import { medidasCL, medidasD } from "./app-config";

import { FilterStyles } from "./styles";

const Filter = ({
  onChangeFirst,
  onChangeSeccond,
  onChangeThird,
  onSubmit,
  disabled,
  clearFilters
}) => {
  const [redondas, setRedondas] = useState(false);

  return (
    <FilterStyles className="filtro-wrapper">
      {!redondas ? (
        <>
          <select onChange={onChangeFirst}>
            <option value="">Largura</option>
            {medidasCL.map((op) => (
              <option value={op.value}>{op.text}</option>
            ))}
          </select>
          <select onChange={onChangeSeccond}>
            <option value="">Comprimento</option>
            {medidasCL.map((op) => (
              <option value={op.value}>{op.text}</option>
            ))}
          </select>
        </>
      ) : (
        <select onChange={onChangeThird}>
          <option value="">Diâmetro</option>
          {medidasD.map((op) => (
            <option value={op.value}>{op.text}</option>
          ))}
        </select>
      )}
      <div className="block-radio">
        <input type="checkbox" onChange={() => {
          setRedondas(!redondas);
          clearFilters();
        }} />
        <label>Filtrar toalhas redondas</label>
      </div>
      <button onClick={() => onSubmit()} disabled={!disabled}>
        Buscar
      </button>
    </FilterStyles>
  );
};

export default Filter;
