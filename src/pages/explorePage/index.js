import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';
import Header from '../../components/header';

function ExplorePage() {
  return (
    <>
      <Header title="Explorar" />
      <div className="explore-buttons">
        <Link className="explore-button" to="/explorar/comidas">
          <button className="explore" type="button" data-testid="explore-food">
            Explorar Comidas
          </button>
        </Link>
        <Link className="explore-button" to="/explorar/bebidas">
          <button className="explore" type="button" data-testid="explore-drinks">
            Explorar Bebidas
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default ExplorePage;
