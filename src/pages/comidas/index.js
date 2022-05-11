import React, { useContext } from 'react';
import '../Search.css';
import EveryMealCard from '../../components/everyMealCard';
import Footer from '../../components/footer';
import Header from '../../components/header';
import MealsCategories from '../../components/mealsCategories';
import recipesContext from '../../context';

function Comidas() {
  const { loading } = useContext(recipesContext);
  return (
    <>
      <Header title="Comidas" />
      <MealsCategories />
      { loading ? <p>LOADING...</p> : <EveryMealCard />}
      <Footer />
    </>
  );
}

export default Comidas;
