import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchFoodBar from './searchFoodBar';
import SearchDrinkBar from './searchDrinkBar';

function Header({ title }) {
  const [showSearchBar, setShowSearchBar] = useState(false);

  function showSearchButton() {
    // Primeiro checa se a página tem o título de Comidas ou Explorar Origem,
    // a barra de procura deve ser mostrada somente nessa ocasião.
    if (title === 'Comidas' || title === 'Explorar Origem' || title === 'Bebidas') {
      // Caso esteja na página com título de Comidas ou Explorar Origem, aparece um botão para ser
      // clicado.
      return (
        <button
          className="header-button"
          type="button"
          onClick={ () => setShowSearchBar(!showSearchBar) }
        >
          <img
            src={ searchIcon }
            alt="searchIcon"
            data-testid="search-top-btn"
          />
        </button>);
    } return null;
  }

  function searchBar() {
    // Checa se deve mostrar a searchBar, se for negativo retorna nulo, se for
    // positivo retorna o componente SearchBar
    let whichsearchBar;
    if (title === 'Comidas' || title === 'Explorar Origem') {
      whichsearchBar = <SearchFoodBar />;
    } else {
      whichsearchBar = <SearchDrinkBar />;
    }
    const searchBarComponent = showSearchBar ? whichsearchBar : null;
    return searchBarComponent;
  }

  return (
    <header className="header-complete">
      <div className="header">
        <div className="iconprofile1">
          <Link to="/perfil">
            <img
              className="iconprofile"
              src={ profileIcon }
              alt="profileIcon"
              data-testid="profile-top-btn"
            />
          </Link>
        </div>
        <div className="page-title">
          <h1 data-testid="page-title">{ title }</h1>
        </div>
        { showSearchButton() }
      </div>
      { searchBar() }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
