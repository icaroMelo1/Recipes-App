import React, { useState, useEffect, useContext } from 'react';
import recipesContext from '../context';
import fetchAPI from '../services/fetchAPI';

function MealsCategories() {
  const { setMeals, setLoading } = useContext(recipesContext);
  const [categories, setCategories] = useState({});
  const [currentCategory, setCurrentCategory] = useState('');
  const [sectionloading, setsectionLoading] = useState(true);

  // Faz o fetch das categorias assim que carrega a página e guarda no estado do componente
  useEffect(() => {
    async function fetchCategories() {
      const { meals } = await fetchAPI('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      setCategories(meals);
      setsectionLoading(false);
    }
    fetchCategories();
  }, []);
  // Faz o fetch de acordo com a categoria clicada. Caso a categoria clicada seja a mesma que já
  // está selecionada, retira o filtro de categoria.
  async function fetchByCategory(category) {
    setLoading(true);
    if (category === currentCategory) {
      const results = await fetchAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setMeals(results);
    } else {
      const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      const results = await fetchAPI(URL);
      setMeals(results);
      setCurrentCategory(category);
    }
    setLoading(false);
  }
  // Retorna os botões de categoria de acordo com os resultados da pesquisa contidos no estado
  const maxResults = 5;
  const categoryButtons = Object.values(categories).slice(0, maxResults)
    .map((category, index) => (
      <button
        className="button-category"
        type="button"
        key={ index }
        onClick={ () => fetchByCategory(category.strCategory) }
        data-testid={ `${category.strCategory}-category-filter` }
      >
        { category.strCategory }
      </button>));
  // Botão com a opção de mostrar todas a categorias
  const allButton = (
    <button
      className="button-category"
      type="button"
      onClick={ () => fetchByCategory(currentCategory) }
      data-testid="All-category-filter"
    >
      All
    </button>);
  if (sectionloading) {
    return <p>Categorias de comida</p>;
  } return (
    <div className="every-category-button">
      { categoryButtons }
      { allButton }
    </div>
  );
}

export default MealsCategories;
