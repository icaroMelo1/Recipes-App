import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import recipesContext from '../context';
import SingleCard from './singleCard';

function EveryDrinkCard() {
  const { drinks: { drinks } } = useContext(recipesContext);
  const maxResults = 12;
  // Checa se foi encontrado algum resultado na pesquisa
  if (!drinks) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return <p>Nenhum resultado encontrado</p>;
  }
  const everyRecipe = Object.values(drinks).slice(0, maxResults);
  const everyCard = everyRecipe
    .map((recipe, index) => (
      <div
        className="every-card"
        data-testid={ `${index}-recipe-card` }
        key={ index }
      >
        <Link to={ `/bebidas/${recipe.idDrink}` } key={ index }>
          <SingleCard
            className="single-card"
            imgsrc={ recipe.strDrinkThumb }
            index={ index }
            cardName={ recipe.strDrink }
            data-testid={ `${index}-recipe-card` }
          />
        </Link>
      </div>));
  return (
    <div className="div-cards">
      { everyCard }
    </div>
  );
}

export default EveryDrinkCard;
