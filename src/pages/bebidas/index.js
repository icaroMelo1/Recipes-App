import React, { useContext } from 'react';
import '../Search.css';
import DrinkCategories from '../../components/drinkCategories';
import EveryDrinkCard from '../../components/everyDrinkCard';
import Footer from '../../components/footer';
import Header from '../../components/header';
import recipesContext from '../../context';

function Bebidas() {
  const { loading } = useContext(recipesContext);
  return (
    <>
      <Header title="Bebidas" />
      <DrinkCategories />
      { loading ? <p>LOADING...</p> : <EveryDrinkCard />}
      <Footer />
    </>
  );
}

export default Bebidas;
