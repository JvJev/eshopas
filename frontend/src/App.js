import React from 'react';
import './App.css';
import CarCard from './components/carCard';
import data from './data';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path='/product/:slug' element={<ProductPage></ProductPage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
