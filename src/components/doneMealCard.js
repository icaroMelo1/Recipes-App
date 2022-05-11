import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneMealCard({ area, category, date, id, index, image, name, tags }) {
  function shareMealRecipe() {
    copy(`http://localhost:3000/comidas/${id}`);
    global.alert('Link copiado!');
  }

  const twoTags = tags
    .map((tagName, tagIndex) => (
      <p
        key={ tagIndex }
        className="tag-name"
        data-testid={ `${tagIndex}-${tagName}-horizontal-tag` }
      >
        { tagName }
      </p>));
  return (
    <div className="eachFood">
      <Link to={ `/comidas/${id}` }>
        <img
          className="foodImage"
          src={ image }
          alt="Recipe thumbnail"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <Link to={ `/comidas/${id}` }>
        <p data-testid={ `${index}-horizontal-name` }>
          { name }
        </p>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>
        { date }
      </p>
      <p data-testid={ `${index}-horizontal-top-text` }>
        { category }
      </p>
      <p>{ area }</p>
      { twoTags }
      <button
        type="button"
        onClick={ shareMealRecipe }
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

DoneMealCard.propTypes = {
  area: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
};

export default DoneMealCard;
