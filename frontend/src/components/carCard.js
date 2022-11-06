import React, { useReducer } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

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
  const [{ loading, error, products }, dispach] = useReducer(reducer, {
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
    <div className="productSection ">
      {loading ? (
        <div>Loading please wait...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        products.createdProducts.map((product) => (
          <div className="productsCard" key={product._id}>
            <Link to={`product/${product._id}`}> 
              <img src={product.image} alt={product.name} />
            </Link>
            <Link to={`product/${product._id}`}>
              <p>{product.name}</p>
            </Link>
            <p>{product.description}</p>
            <span>{product.category}</span>
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
