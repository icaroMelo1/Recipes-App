import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '.';

function Provider({ children }) {
  const [meals, setMeals] = useState({});
  const [drinks, setDrinks] = useState({});
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [ingredientes, setIngredientes] = useState([]);
  const [medida, setMedida] = useState([]);
  const [favorita, setFavorita] = useState(false);
  const [favRecipes, setFavRecipes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const mealsResponse = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const baseMeals = await mealsResponse.json();
      setMeals(baseMeals);
      const drinksResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const baseDrinks = await drinksResponse.json();
      setDrinks(baseDrinks);
      setLoading(false);
    }
    fetchData();
  }, []);

  const context = {
    meals,
    favRecipes,
    setFavRecipes,
    setMeals,
    drinks,
    details,
    favorita,
    setFavorita,
    ingredientes,
    medida,
    setDetails,
    setIngredientes,
    setMedida,
    setDrinks,
    loading,
    setLoading,
  };
  return (
    <recipesContext.Provider value={ context }>
      { children }
    </recipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
