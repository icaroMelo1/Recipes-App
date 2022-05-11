import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';
import Header from '../../components/header';

function ExploreDrinkPage() {
  const [loading, setLoading] = useState(true);
  const [randomId, setRandomId] = useState();

  useEffect(() => {
    async function fetchRandomDrink() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      const randomDrink = await response.json();
      setRandomId(randomDrink.drinks[0].idDrink);
      setLoading(false);
    }
    fetchRandomDrink();
  }, []);

  function details(id) {
    const toDetails = {
      pathname: `/bebidas/${id}`,
      id,
    };
    return toDetails;
  }
  function showButtons() {
    return (
      <div className="three-explore-buttons">
        <Link to="/explorar/bebidas/ingredientes">
          <button data-testid="explore-by-ingredient" type="button">
            Por Ingredientes
          </button>
        </Link>
        <Link to={ () => details(randomId) }>
          <button data-testid="explore-surprise" type="button">
            Me Surpreenda!
          </button>
        </Link>
      </div>
    );
  }
  return (
    <>
      <Header title="Explorar Bebidas" />
      { loading ? <p>CARREGANDO...</p> : showButtons() }
      <Footer />
    </>
  );
}

export default ExploreDrinkPage;
