import React, { useReducer } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import logger from 'use-reducer-logger';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function CarCard() {
  const [{ loading, error, products }, dispach] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });

  //const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispach({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispach({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispach({ type: 'FETCH_FAIL', payload: err.message });
      }

      //setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="productSection">
      {loading ? (
        <div>Loading please wait...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        products.map((product) => (
          <div className="productsCard" key={product.id}>
            <Link to={`product/${product.id}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <Link to={`product/${product.id}`}>
              <p>{product.name}</p>
            </Link>
            <p>{product.description}</p>
            <span>
              {product.fuelType}
              {product.year}
              {product.color}
            </span>
            <p>
              <strong>{product.price}</strong>
            </p>
            <button>Buy</button>
          </div>
        ))
      )}
      ;
    </div>
  );
}
