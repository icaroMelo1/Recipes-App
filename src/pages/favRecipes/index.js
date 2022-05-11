import React, { useEffect, useState } from 'react';
import FavoriteCards from '../../components/favoriteCard';
import Header from '../../components/header';
import removeFromFavorites from '../../services/removeFromFavorites';
import shareLink from '../../services/shareLink';

function FavRecipes() {
  const [everyFavorite, setEveryFavorite] = useState([]);
  const [filter, setFilter] = useState('All');
  const [shareMessage, setShareMessage] = useState(false);

  useEffect(() => {
    // Busca a chave de receitas feitas do localStorage e seta nos cards para mostrar
    const currentFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setEveryFavorite(currentFavorites);
  }, []);

  // Primeiro checa se há alguma receita favorita
  if (!localStorage.favoriteRecipes) {
    return (
      <>
        <Header title="Receitas Favoritas" />
        <p>Não há receitas favoritas</p>
      </>
    );
  }

  function handleShare(type, id) {
    setShareMessage(true);
    if (type === 'bebida') {
      shareLink('Drink', id);
    } else {
      shareLink('Meal', id);
    }
  }

  function toggleFavorite(id) {
    removeFromFavorites(id);
    // Busca a chave de receitas feitas do localStorage e seta nos cards para mostrar
    const currentFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setEveryFavorite(currentFavorites);
  }

  function generatesCards() {
    let cardsToShow;
    if (filter === 'All') {
      cardsToShow = everyFavorite;
    } else if (filter === 'Meals') {
      // Filtra apenas as comidas
      cardsToShow = everyFavorite
        .filter((recipe) => recipe.type === 'comida');
    } else if (filter === 'Drinks') {
      // Filtra apenas as comidas
      cardsToShow = everyFavorite
        .filter((recipe) => recipe.type === 'bebida');
    }
    return cardsToShow.map((recipe, index) => (
      <FavoriteCards
        recipe={ recipe }
        index={ index }
        key={ index }
        handleShare={ handleShare }
        toggleFavorite={ toggleFavorite }
      />));
  }

  return (
    <>
      <Header title="Receitas Favoritas" />
      <div className="non-header">
        <div className="done-recipes-filters">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => setFilter('All') }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => setFilter('Meals') }
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => setFilter('Drinks') }
          >
            Drinks
          </button>
        </div>
        { shareMessage ? <p>Link copiado!</p> : null }
      </div>
      <div className="div-cards">
        { generatesCards() }
      </div>
    </>
  );
}

export default FavRecipes;
