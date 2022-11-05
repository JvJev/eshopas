import React from 'react';
import './App.css';
import CarCard from './components/carCard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Container from 'react-bootstrap/esm/Container';
import SignInPage from './pages/SignInPage';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <Container className="max-height">
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route
              path="/product/:id"
              element={<ProductPage></ProductPage>}></Route>
            <Route path="/signin" 
            element={<SignInPage></SignInPage>}></Route>
          </Routes>
        </Container>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
