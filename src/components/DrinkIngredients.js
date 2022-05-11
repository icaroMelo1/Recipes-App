import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '../context';

function DrinkIngredients(props) {
  const { id } = props;
  const { ingredientes, medida } = useContext(recipesContext);
  return (
    <div>
      <ul data-testid={ `${id}-ingredient-name-and-measure` }>
        {ingredientes
          .map((ing, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              { ing }
              { medida[index] === undefined ? null : ` - ${medida[index]}` }
            </li>
          ))}
      </ul>
    </div>
  );
}

DrinkIngredients.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DrinkIngredients;
