import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import fetchAPI from '../../services/fetchAPI';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import RecommendPageDrinks from '../../components/recommendPageDrinks';
import generatesIngredientList from '../../services/generatesIngredientList';
import shareLink from '../../services/shareLink';
import removeFromFavorites from '../../services/removeFromFavorites';
import addToFavorites from '../../services/addToFavorites';

function DrinkDetails({ match: { params: { id } } }) {
  const [currentDrink, setCurrentDrink] = useState();
  const [favorite, setFavorite] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [shareMessage, setShareMessage] = useState(false);
  const history = useHistory();

  function showIngredients() {
    const ingredients = generatesIngredientList(currentDrink);
    // Faz um map do array gerado acima, criando uma p para cada ingrediente da lista
    return ingredients.map((ingredient, index) => (
      <p
        key={ index }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        { ingredient }
      </p>
    ));
  }

  useEffect(() => {
    const fetchByID = async () => {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { drinks } = await fetchAPI(URL);
      setCurrentDrink(drinks[0]);
      // Checa se a receita é favorita, para que o coracao fique preenchido ao carregar a página
      // Primeiro busca a chave de favoritos do LocalStorage
      if (localStorage.getItem('favoriteRecipes')) {
        const currentFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
        // Seta o favoritos de acordo com o resultado do some, assim se algum id corresponder ao
        // da receita atual, o resutado e true, o que faz com que o coracao seja preenchido
        setFavorite(currentFavorites.some((recipe) => recipe.id === id));
      }
      setLoadingPage(false);
    };
    fetchByID();
  }, [id]);

  function toggleFavorite() {
    if (favorite) {
      // Remove dos favoritos e nega o valor do estado para que o coracao mude de cor
      removeFromFavorites(currentDrink.idDrink);
      setFavorite(!favorite);
    } else {
      // Adiciona aos favoritos e nega o valor do estado para que o coracao mude de cor
      addToFavorites('Drink', currentDrink);
      setFavorite(!favorite);
    }
  }

  function continueOrStart() {
    // Checa se a receita já foi iniciada, vendo se o array de igredientes existe na chave do LocalStorage
    // Busca a chave do LocalStorage
    const currentRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!currentRecipes) {
      return (
        <button
          className="start-recipe"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
        >
          Iniciar Receita
        </button>);
    } if (currentRecipes.cocktails) {
      return (
        <button
          className="start-recipe"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
        >
          Continuar Receita
        </button>);
    }
  }

  function handleShare() {
    shareLink('Drink', id);
    setShareMessage(true);
  }

  if (loadingPage) return 'Carregando página...';

  return (
    <>
      <img
        className="meal-img"
        data-testid="recipe-photo"
        src={ currentDrink.strDrinkThumb }
        alt="Meal"
      />
      <div className="detail-header">
        <h2 data-testid="recipe-title">{currentDrink.strDrink}</h2>
        <div className="detail-body-header">
          <h4 data-testid="recipe-category">{currentDrink.strAlcoholic}</h4>
          <button
            className="detail-button"
            type="button"
            data-testid="share-btn"
            onClick={ handleShare }
          >
            <img
              src={ shareIcon }
              alt="share button"
            />
          </button>
          <button
            className="detail-button"
            type="button"
            onClick={ toggleFavorite }
          >
            <img
              data-testid="favorite-btn"
              alt="Favoritar"
              src={ favorite ? blackHeartIcon : whiteHeartIcon }
            />
          </button>
        </div>
        { shareMessage ? <p>Link copiado!</p> : null }
      </div>
      <h3>Ingredientes:</h3>
      { showIngredients() }
      <p
        className="paragraph"
        data-testid="instructions"
      >
        { currentDrink.strInstructions }
      </p>
      <RecommendPageDrinks />
      { continueOrStart() }
    </>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinkDetails;
