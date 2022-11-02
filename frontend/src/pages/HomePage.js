import React from 'react';
import CarCard from '../components/carCard';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <div>
        <header classname="Main-header">
          <Link to="/">autoplius kolnas?</Link>
        </header>
        <main>
          <CarCard></CarCard>
        </main>
      </div>
    </div>
  );
}
