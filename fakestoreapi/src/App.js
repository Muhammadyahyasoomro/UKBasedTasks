import logo from './logo.svg';
import React from "react";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import ProductListing from './Pages/ProductListing';
import { useTheme } from './context/ThemeContext';
function App() {
  const {theme}=useTheme();
  return (
    <div className="App" style={{backgroundColor:theme==="light"?"white":"black"}}>
     <BrowserRouter>
     <Routes>
      <Route exact path="/" Component={ProductListing}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
