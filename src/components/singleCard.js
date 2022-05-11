import React from 'react';
import PropTypes from 'prop-types';

function SingleCard({ imgsrc, cardName, index, onclick }) {
  return (
    <button className="eachFood" type="button" onClick={ onclick }>
      <img
        className="foodImage"
        src={ imgsrc }
        alt="Recipe thumbnail"
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>
        { cardName }
      </p>
    </button>
  );
}

SingleCard.propTypes = {
  imgsrc: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onclick: PropTypes.func,
};

SingleCard.defaultProps = {
  onclick: () => {},
};

export default SingleCard;
