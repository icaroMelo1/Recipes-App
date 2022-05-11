import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';
import Header from '../../components/header';
import SingleCard from '../../components/singleCard';
import recipesContext from '../../context';
import fetchAPI from '../../services/fetchAPI';

function DrinkIngredients() {
  const [loadingPageDrink, setLoadingPageDrink] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const { setLoading, setDrinks } = useContext(recipesContext);
  useEffect(() => {
    async function fetchIngredients() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const ingredientsDrink = await response.json();
      const maxNumber = 12;
      console.log(ingredientsDrink);
      console.log(Object.values(ingredientsDrink.drinks).slice(0, maxNumber));
      setIngredients(Object.values(ingredientsDrink.drinks).slice(0, maxNumber));
      setLoadingPageDrink(false);
    }
    fetchIngredients();
  }, []);

  async function handleClick(name) {
    setLoading(true);
    const filterIngredientsDrink = await fetchAPI(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`);

    setDrinks(filterIngredientsDrink);
    setLoading(false);
  }

  function showCard() {
    const ingredientMapDrink = ingredients.map((ingredient, index) => (
      <div data-testid={ `${index}-ingredient-card` } key={ index }>
        <Link to="/bebidas/">
          {console.log(ingredient)}
          <SingleCard
            cardName={ ingredient.strIngredient1 }
            index={ index }
            imgsrc={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
            onclick={ () => handleClick(ingredient.strIngredient1) }
          />
        </Link>
      </div>
    ));
    return ingredientMapDrink;
  }
  return (
    <>
      <Header title="Explorar Ingredientes" />
      <div className="div-cards">
        { loadingPageDrink ? <p>CARREGANDO...</p> : showCard() }
      </div>
      <Footer />
    </>
  );
}
export default DrinkIngredients;
