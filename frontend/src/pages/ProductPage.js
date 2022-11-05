import React from 'react';
import { useParams } from 'react-router-dom';
import { useReducer } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row'
import  Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function ProductPage() {
  const params = useParams();
  const { id } = params;

  const [{ loading, error, product }, dispach] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });

  //const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispach({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/id/${id}`);
        dispach({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispach({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [id]);

  return loading ? (
    <div> Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img className='img-large'
          src={product.image}
          alt={product.name}></img>
        </Col>
        <Col md={3}>
          <ListGroup.Item>
            <h1>{product.name}</h1>
          </ListGroup.Item>
          <ListGroup.Item>
            <h3>Price: {product.price}</h3>
          </ListGroup.Item>
        </Col>
        <Col md={3}></Col>
      </Row>
    </div>
  );
}
