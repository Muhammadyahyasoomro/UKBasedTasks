

import React, { createContext, useState, useContext } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [minPrice,setMinPrice] = useState();
  const [maxPrice,setMaxPrice] = useState();
  const [category,setCategory] = useState();
  const [availablity,setAvailablity] = useState();


  

  return (
    <SearchContext.Provider value={{ search,setSearch}}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
