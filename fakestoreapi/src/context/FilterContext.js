

import React, { createContext, useState, useContext } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [minPrice,setMinPrice] = useState();
  const [maxPrice,setMaxPrice] = useState();
  const [category,setCategory] = useState();
  const [availablity,setAvailablity] = useState();


  

  return (
    <FilterContext.Provider value={{ minPrice,setAvailablity,setMinPrice,setMaxPrice,maxPrice,category,setCategory,availablity}}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
