import React from 'react';
import data from '../../../backend/data';
import '../App.css';
import { Link } from 'react-router-dom';

export default function CarCard() {
  return (
    <div className="productSection">
      {data.products.map((product) => (
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
      ))}
    </div>
  );
}
