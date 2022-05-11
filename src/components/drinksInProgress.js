import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import recipesContext from '../context';

const copy = require('clipboard-copy');

function DrinksInProgressCard() {
  const receitas = JSON.parse(localStorage.toDoRecipes);
  const info = receitas[0];
  const medidas = receitas[1];
  console.log(medidas);
  const ingredientes = receitas[2];
  const id = useParams();
  const { setFavRecipes } = useContext(recipesContext);
  const compartilhar = () => {
    copy(window.location);
  };

  const checkFavorite = () => {
    if (localStorage.favoriteRecipes) {
      // getItem com chave favoriteRecipes
      const receitasFav = JSON.parse(localStorage.favoriteRecipes);
      // realiza chegagem por id
      return receitasFav.some((recipe) => recipe.id === id.id);
    }
    return false;
  };

  const favoritar = () => {
    const obj = {
      id: info.idDrink,
      type: 'Drinks',
      area: info.strArea,
      category: info.strCategory,
      name: info.strDrink,
      image: info.strDrinkThumb,
    };
    // Verifica se ja ha uma chave favoriteRecipes, se ouver soma o obj aos anteriores, se nao, adiciona um novo
    if (localStorage.favoriteRecipes) {
      // getItem com chave favoriteRecipes
      const parseVersion = JSON.parse(localStorage.favoriteRecipes);
      localStorage.favoriteRecipes = JSON.stringify([...parseVersion, (obj)]);
      return setFavRecipes(true);
    }
    localStorage.favoriteRecipes = JSON.stringify([obj]);
  };

  const desfavoritar = () => {
    // getItem com chave favoriteRecipes
    const localTest = JSON.parse(localStorage.favoriteRecipes);
    // Remove o item de acordo com seu id
    const desfa = localTest.filter((recipe) => ((recipe).id) !== id.id);
    localStorage.favoriteRecipes = JSON.stringify((desfa));
    setFavRecipes(false);
  };
  // Verifica se deve favoritar ou desfavoritar
  function handleFavButton() {
    return checkFavorite() ? desfavoritar() : favoritar();
  }

  function handleChange({ target }) {
    const { checked } = target;

    if (checked) {
      target.parentNode.style.textDecoration = 'line-through';
    } else {
      target.parentNode.style.textDecoration = '';
    }
  }

  return (
    <div>
      <img
        className="meal-img"
        data-testid="recipe-photo"
        src={ info.strDrinkThumb }
        alt="Receita"
      />
      <div className="detail-header">
        <h2 data-testid="recipe-title">{ info.strDrink }</h2>
        <button
          className="detail-button"
          data-testid="share-btn"
          type="button"
          onClick={ compartilhar }
        >
          <img
            src={ shareIcon }
            alt="share button"
          />
        </button>
        <button
          className="detail-button"
          type="button"
          data-testid="favorite-btn"
          onClick={ handleFavButton }
        >
          <img
            src={ checkFavorite() ? blackHeartIcon : whiteHeartIcon }
            alt="Favoritar"
          />
        </button>
      </div>
      <h3 data-testid="recipe-category">{ info.strAlcoholic }</h3>
      <div className="recipe-checkboxs">
        {ingredientes.map((ingrediente, index) => (
          <div key className="recipe-checkbox">
            <label htmlFor={ ingrediente }>
              <input
                onChange={ handleChange }
                id={ ingrediente }
                type="checkbox"
                data-testid={ `${index}-ingredient-step` }
                key={ index }
              />
              { ingrediente }
              { medidas[index] === undefined ? null : ` - ${medidas[index]}` }
            </label>
          </div>
        ))}
      </div>
      <h2 data-testid="instructions">
        Instruções
      </h2>
      <p className="paragraph">
        { info.strInstructions }
      </p>
    </div>
  );
}

export default DrinksInProgressCard;
