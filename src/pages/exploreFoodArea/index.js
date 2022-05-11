import React, { useState, useEffect, useContext } from 'react';
import EveryMealCard from '../../components/everyMealCard';
import Footer from '../../components/footer';
import Header from '../../components/header';
import recipesContext from '../../context';
import fetchAPI from '../../services/fetchAPI';

function ExploreFoodArea() {
  const { loading, setMeals, setLoading } = useContext(recipesContext);
  const [loadingPage, setLoadingPage] = useState(true);
  const [areas, setAreas] = useState({});

  useEffect(() => {
    async function fetchAreas() {
      const { meals } = await fetchAPI('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      setAreas(meals);
      setLoadingPage(false);
    }
    fetchAreas();
  }, []);

  async function handleChange({ target: { value } }) {
    if (value === 'All') {
      const results = await fetchAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setLoading(true);
      setMeals(results);
      setLoading(false);
    } else {
      const results = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`);
      setLoading(true);
      setMeals(results);
      setLoading(false);
    }
  }

  function showAreaOptions() {
    const areaOptions = areas.map((area, index) => (
      <option
        value={ area.strArea }
        key={ index }
        data-testid={ `${area.strArea}-option` }
      >
        { area.strArea }
      </option>));
    const menu = (
      <select
        name="areas"
        data-testid="explore-by-area-dropdown"
        onChange={ handleChange }
      >
        { areaOptions }
        <option value="All" data-testid="All-option">All</option>
      </select>
    );
    return menu;
  }

  return (
    <>
      <Header title="Explorar Origem" />
      { loadingPage ? <p>Carregando...</p> : <div>{ showAreaOptions() }</div> }
      { loading ? <p>LOADING...</p> : <EveryMealCard />}
      <Footer />
    </>
  );
}

export default ExploreFoodArea;
