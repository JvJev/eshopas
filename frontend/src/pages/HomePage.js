import React, { useEffect, useState } from 'react';
import CarCard from '../components/carCard';
import { Link } from 'react-router-dom';

export default function HomePage() {
 
  return (
    <div>
      <div>
        <header className="Main-header">
          <Link to="/">autoplius kolnas?</Link>
        </header>
        <main>
          
          <CarCard></CarCard>
        </main>
      </div>
    </div>
  );
}
