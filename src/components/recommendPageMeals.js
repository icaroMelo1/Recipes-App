import React, { useContext } from 'react';
import recipesContext from '../context';

function RecommendPageMeals() {
  const { drinks: { drinks } } = useContext(recipesContext);
  const maxNumber = 6;
  if (!drinks) {
    return <p>Nenhum resultado encontrado</p>;
  }
  const recommends = Object.values(drinks).slice(0, maxNumber);
  const recommendmeals = recommends.map((recom, index) => (
    <div
      key={ index }
      className="container-carousel"
    >
      <div
        data-testid={ `${index}-recomendation-card` }
        className="recommend-card"
      >
        <img
          src={ recom.strDrinkThumb }
          alt="recomendações"
          className="foodImage"
        />
        <h4>{ recom.strCategory }</h4>
        <h2 data-testid={ `${index}-recomendation-title` }>{ recom.strDrink }</h2>
      </div>
    </div>
  ));
  return (
    <div className="carousel-card">{ recommendmeals }</div>
  );
}

export default RecommendPageMeals;
