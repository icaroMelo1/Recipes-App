import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';
import Header from '../../components/header';

function ExploreFoodPage() {
  const [loading, setLoading] = useState(true);
  const [randomId, setRandomId] = useState();

  useEffect(() => {
    async function fetchRandomMeal() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const randomMeal = await response.json();
      setRandomId(randomMeal.meals[0].idMeal);
      setLoading(false);
    }
    fetchRandomMeal();
  }, []);

  function details(id) {
    const toDetails = {
      pathname: `/comidas/${id}`,
      id,
    };
    return toDetails;
  }
  function showButtons() {
    return (
      <div className="three-explore-buttons">
        <Link to="/explorar/comidas/ingredientes">
          <button data-testid="explore-by-ingredient" type="button">
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button data-testid="explore-by-area" type="button">
            Por Local de Origem
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
      <Header title="Explorar Comidas" />
      { loading ? <p>CARREGANDO...</p> : showButtons() }
      <Footer />
    </>
  );
}

export default ExploreFoodPage;
