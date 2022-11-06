import React from 'react';
import { useParams } from 'react-router-dom';
import { useReducer } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../App.css';


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
  const { _id } = params;
  console.log(_id)

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
        const result = await axios.get(`/api/products`);
        dispach({ type: 'FETCH_SUCCESS', payload: result }); console.log(result)
      } catch (err) {
        dispach({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [_id]) ;

  return loading ? (
    <div> Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="mt-3">
      <div className='single-product-card'>
      <Row>
        <Col md={12}>
          <img
            className="image-cutomClass"
            src={product.image}
            alt={product.name}
            
          ></img>
        </Col>
        <Col md={8}>
          <ListGroup.Item>
            <h1>{product.name}</h1>
          </ListGroup.Item>
          <ListGroup.Item>
            <h3>Price: {product.price}</h3>
          </ListGroup.Item>
          <ListGroup.Item>
            <p>Category: {product.category}</p>
          </ListGroup.Item>
          <ListGroup.Item>
            <p>Description: {product.description}</p>
          </ListGroup.Item>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price</Col>
                    <Col>{product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In stock</Badge>
                      ) : (
                        <Badge bg="danger"> Out of stock</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup>
                    <div className="d-grid">
                      <Button variant="primary">Add to cart</Button>
                    </div>
                  </ListGroup>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </div>
      
    </div>
  );
}
