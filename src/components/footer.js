import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer" className="footer">
      <button
        className="footerButtons"
        onClick={ () => history.push('/bebidas') }
        type="button"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        alt="drink Icon"
      >
        <img
          src={ drinkIcon }
          alt="drink Icon"
        />
      </button>
      <button
        className="footerButtons"
        type="button"
        data-testid="food-bottom-btn"
        onClick={ () => history.push('/comidas') }
        src={ mealIcon }
        alt="Meal Icon"
      >
        <img
          src={ mealIcon }
          alt="Meal Icon"
        />
      </button>
      <button
        className="footerButtons"
        type="button"
        data-testid="explore-bottom-btn"
        onClick={ () => history.push('/explorar') }
        src={ exploreIcon }
        alt="Explore Icon"
      >
        <img
          src={ exploreIcon }
          alt="Explore Icon"
        />
      </button>
    </footer>
  );
}

export default Footer;
