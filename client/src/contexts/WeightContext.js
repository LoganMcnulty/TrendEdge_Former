import React, { createContext, useReducer, useState, useEffect } from 'react';

const WeightContext = createContext();

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value,
  };
}

export const WeightProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, userSettings);
  const handleChange = e => {
    dispatch({ field: e.target.name, value: e.target.value });
  };
  return (
    <WeightContext.Provider value={{ state, handleChange }}>
      {children}
    </WeightContext.Provider>
  );
};

export default WeightContext;
