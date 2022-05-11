import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneDrinkCard({ alcoholicOrNot, doneDate, id, index, image, name }) {
  function shareDrinkRecipe() {
    copy(`http://localhost:3000/bebidas/${id}`);
    global.alert('Link copiado!');
  }

  return (
    <div className="eachFood">
      <Link to={ `/bebidas/${id}` }>
        <img
          className="foodImage"
          src={ image }
          alt="Recipe thumbnail"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <Link to={ `/bebidas/${id}` }>
        <p data-testid={ `${index}-horizontal-name` }>
          { name }
        </p>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>
        { doneDate }
      </p>
      <p>{ alcoholicOrNot }</p>
      <button
        type="button"
        onClick={ shareDrinkRecipe }
        data-testid={ `${index}-horizontal-share-btn` }
      >
        <img
          src={ shareIcon }
          alt="share button"
        />
      </button>
    </div>
  );
}

DoneDrinkCard.propTypes = {
  index: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default DoneDrinkCard;
