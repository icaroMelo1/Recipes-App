import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import shareIcon from '../images/shareIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import fetchAPI from '../services/fetchAPI';
import generatesIngredientList from '../services/generatesIngredientList';
import IngredientCheckBox from './ingredientCheckBox';

function MealInProgressCard({ id: { id } }) {
  const [currentMeal, setCurrentMeal] = useState({});
  const [loadingPage, setLoadingPage] = useState(true);

  // Faz o fetch a partir do id da presente receita assim que a página carrega
  useEffect(() => {
    async function fetchMeal() {
      const { meals } = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setCurrentMeal(meals[0]);
    }
    fetchMeal();
    setLoadingPage(false);
  }, [id]);

  function showIngredients() {
    const ingredients = generatesIngredientList(currentMeal);
    // Faz um map do array gerado acima, criando uma checkbox para cada ingrediente da lista
    return ingredients.map((ingredient, index) => (
      <IngredientCheckBox
        ingredient={ ingredient }
        key={ index }
        index={ index }
        id={ id }
      />
    ));
  }

  if (loadingPage) return <p>CARREGANDO...</p>;
  return (
    <>
      {/* Título da receita */}
      <h1 data-testid="recipe-title">{ currentMeal.strMeal }</h1>
      {/* Imagem da receita */}
      <img
        className="meal-img"
        src={ currentMeal.strMealThumb }
        data-testid="recipe-photo"
        alt={ `${currentMeal.strMeal} thumbnail` }
      />
      <h3 data-testid="recipe-category">
        Categoria:
        { currentMeal.strCategory }
      </h3>
      <h3>Ingredientes:</h3>
      <div className="ingredients-list">
        { showIngredients() }
      </div>
    </>
  );
}

MealInProgressCard.propTypes = {
  id: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default MealInProgressCard;
