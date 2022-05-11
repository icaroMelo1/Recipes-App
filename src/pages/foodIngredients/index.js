import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';
import Header from '../../components/header';
import SingleCard from '../../components/singleCard';
import recipesContext from '../../context';
import fetchAPI from '../../services/fetchAPI';

function FoodIngredients() {
  const [loadingPage, setLoadingPage] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const { setLoading, setMeals } = useContext(recipesContext);

  useEffect(() => {
    async function fetchIngredients() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const ingredientsMeal = await response.json();
      const maxNumber = 12;
      console.log(Object.values(ingredientsMeal.meals).slice(0, maxNumber));
      setIngredients(Object.values(ingredientsMeal.meals).slice(0, maxNumber));
      setLoadingPage(false);
    }
    fetchIngredients();
  }, []);

  async function handleClick(name) {
    setLoading(true);
    const filterIngredients = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`);
    setMeals(filterIngredients);
    setLoading(false);
  }

  function showCard() {
    const ingredientMap = ingredients.map((ingredient, index) => (
      <div data-testid={ `${index}-ingredient-card` } key={ index }>
        <Link to="/comidas">
          {console.log(ingredient)}
          <SingleCard
            cardName={ ingredient.strIngredient }
            index={ index }
            imgsrc={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
            onclick={ () => handleClick(ingredient.strIngredient) }
          />
        </Link>
      </div>
    ));
    return ingredientMap;
  }
  return (
    <>
      <Header title="Explorar Ingredientes" />
      <div className="div-cards">
        { loadingPage ? <p>CARREGANDO...</p> : showCard() }
      </div>
      <Footer />
    </>
  );
}
export default FoodIngredients;
