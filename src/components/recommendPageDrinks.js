import React, { useContext } from 'react';
import recipesContext from '../context';

function RecommendPageDrinks() {
  const { meals: { meals } } = useContext(recipesContext);
  const maxNumber = 6;
  if (!meals) {
    return <p>Nenhum resultado encontrado</p>;
  }
  const recommends = Object.values(meals).slice(0, maxNumber);
  const recommendMeals = recommends.map((recom, index) => (
    <div
      key={ index }
      className="container-carousel"
    >
      <div
        data-testid={ `${index}-recomendation-card` }
        className="recommend-card"
      >
        <img
          src={ recom.strMealThumb }
          alt="recomendações"
          className="foodImage"
        />
        <h4>{ recom.strCategory }</h4>
        <h2 data-testid={ `${index}-recomendation-title` }>{ recom.strMeal }</h2>
      </div>
    </div>
  ));
  return (
    <div className="carousel-card">{ recommendMeals }</div>
  );
}

export default RecommendPageDrinks;
