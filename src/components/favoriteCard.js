import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteCards({ recipe, index, handleShare, toggleFavorite }) {
  let recipeType;
  const { alcoholicOrNot, area, category,
    id, image, name, type } = recipe;
  // Checa se estamos fazendo um card de bebida ou de comida
  if (type === 'bebida') {
    recipeType = 'bebidas';
  } else {
    recipeType = 'comidas';
  }

  // Retorna o cartão completo
  return (
    <div className="eachFood">
      <Link to={ `/${recipeType}/${id}` }>
        <img
          className="foodImage"
          src={ image }
          alt="Recipe thumbnail"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <Link to={ `/${recipeType}/${id}` }>
        <p data-testid={ `${index}-horizontal-name` }>
          { name }
        </p>
      </Link>
      <p>Categoria:</p>
      <p data-testid={ `${index}-horizontal-top-text` }>
        { type === 'bebida' ? alcoholicOrNot : `${area} - ${category}` }
      </p>
      <button
        type="button"
        onClick={ () => handleShare(type, id) }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="share button"
        />
      </button>
      <button
        className="detail-button"
        type="button"
        onClick={ () => toggleFavorite(id) }
      >
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          alt="Favoritar"
          src={ blackHeartIcon }
        />
      </button>
    </div>
  );
}

FavoriteCards.propTypes = {
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleShare: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

export default FavoriteCards;
