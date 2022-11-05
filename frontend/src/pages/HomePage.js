import React, { useEffect, useState } from 'react';
import CarCard from '../components/carCard';
import { Link } from 'react-router-dom';
import NavBar from 'react-bootstrap/NavBar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

export default function HomePage() {
  return (
    <div>
      <header className="Main-header ">
        <NavBar bg="dark" variant="dark" >
          <Container >
            <LinkContainer to="/">
              <NavBar.Brand >Jev's e-shop</NavBar.Brand>
            </LinkContainer>
          </Container>
        </NavBar>
      </header>
      <main className=''>
        <CarCard></CarCard>
      </main>
    </div>
  );
}
