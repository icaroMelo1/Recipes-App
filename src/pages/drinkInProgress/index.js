import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import IngredientCheckBox from '../../components/ingredientCheckBox';
import fetchAPI from '../../services/fetchAPI';
import generatesIngredientList from '../../services/generatesIngredientList';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import addToFavorites from '../../services/addToFavorites';
import removeFromFavorites from '../../services/removeFromFavorites';
import shareLink from '../../services/shareLink';
import saveDrinkOnLS from '../../services/saveDrinkOnLS';

function DrinkInProgress() {
  const [currentDrink, setCurrentDrink] = useState({});
  const [loadingPage, setLoadingPage] = useState(true);
  const [everyIngredients, setEveryIngredients] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [shareMessage, setShareMessage] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  // Faz o fetch a partir do id da presente receita assim que a página carrega
  useEffect(() => {
    async function fetchDrink() {
      const { drinks } = await fetchAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      setCurrentDrink(drinks[0]);
      setEveryIngredients(generatesIngredientList(drinks[0]));
      // Salva a receita na chave "inProgress" no LocalStorage
      saveDrinkOnLS(drinks[0]);
      // Checa se a receita é favorita, para que o coracao fique preenchido ao carregar a página
      // Primeiro busca a chave de favoritos do LocalStorage
      if (localStorage.getItem('favoriteRecipes')) {
        const currentFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
        // Seta o favoritos de acordo com o resultado do some, assim se algum id corresponder ao
        // da receita atual, o resutado e true, o que faz com que o coracao seja preenchido
        setFavorite(currentFavorites.some((recipe) => recipe.id === id));
      }
    }
    fetchDrink();
    setLoadingPage(false);
  }, [id]);

  function removeIngredients(removeIngredient) {
    const ingredientFilter = everyIngredients
      .filter((ingredient) => ingredient !== removeIngredient);
    setEveryIngredients(ingredientFilter);
  }

  function addIngredients(addIngredient) {
    const adicionaIngredient = [...everyIngredients, addIngredient];
    setEveryIngredients(adicionaIngredient);
  }

  function showIngredients() {
    const ingredients = generatesIngredientList(currentDrink);
    // Faz um map do array gerado acima, criando uma checkbox para cada ingrediente da lista
    return ingredients.map((ingredient, index) => (
      <IngredientCheckBox
        ingredient={ ingredient }
        key={ index }
        index={ index }
        id={ id }
        addIngredients={ addIngredients }
        removeIngredients={ removeIngredients }
      />
    ));
  }

  function saveThisRecipe() {
    // Cria a chave de data de acordo com o sistema da pessoa usuaria
    const today = new Date();
    const doneDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    // Cria um array de no máximo duas tags
    let tags = null;
    if (currentDrink.strTags) {
      tags = currentDrink.strTags.split(',').slice(0, 2);
    }
    // Cria o objeto do drink
    const newDrink = {
      id: currentDrink.idDrink,
      type: 'bebida',
      area: '',
      category: currentDrink.strCategory,
      alcoholicOrNot: currentDrink.strAlcoholic,
      name: currentDrink.strDrink,
      image: currentDrink.strDrinkThumb,
      doneDate,
      tags,
    };
    // Busca a chave do localStorage
    const currentDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    // Se já existe algo no localStorage faz o spread do que já tem e adiciona o objeto criado
    // acima por último
    if (currentDoneRecipes) {
      const newDoneRecipes = [...currentDoneRecipes, newDrink];
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    } else {
      // Caso contrário, adiciona a comida atual na chave do LocalStorage
      localStorage.setItem('doneRecipes', JSON.stringify([newDrink]));
    }
    // Por último, redireciona o usuário para a página de receitas finalizadas
    history.push('/receitas-feitas');
  }

  function toggleFavorite() {
    if (favorite) {
      // Remove dos favoritos e nga o valor do estado para que o coracao mude de cor
      removeFromFavorites(currentDrink.idDrink);
      setFavorite(!favorite);
    } else {
      // Adiciona aos favoritos e nega o valor do estado para que o coracao mude de cor
      addToFavorites('Drink', currentDrink);
      setFavorite(!favorite);
    }
  }

  function handleShare() {
    shareLink('Drink', id);
    setShareMessage(true);
  }

  if (loadingPage) return <p>CARREGANDO...</p>;
  return (
    <>
      {/* Imagem da receita */}
      <img
        className="meal-img"
        src={ currentDrink.strDrinkThumb }
        data-testid="recipe-photo"
        alt={ `${currentDrink.strDrink} thumbnail` }
      />
      {/* Seção de título e categoria */}
      <div className="detail-header">
        <h2 data-testid="recipe-title">{currentDrink.strDrink}</h2>
        <div className="detail-body-header">
          <h4 data-testid="recipe-category">{ currentDrink.strCategory }</h4>
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
      <div className="ingredients-list">
        { showIngredients() }
      </div>
      <h3>Instructions:</h3>
      <p data-testid="instructions">{ currentDrink.strInstructions }</p>
      <button
        className="finish-recipe"
        onClick={ saveThisRecipe }
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ everyIngredients.length !== 0 }
      >
        Finalizar
      </button>
    </>
  );
}

export default DrinkInProgress;
