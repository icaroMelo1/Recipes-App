function addToFavorites(mealOrDrink, recipe) {
  let newRecipe;
  // Primeiro checa se é uma bebida ou uma comida
  if (mealOrDrink === 'Meal') {
    newRecipe = {
      id: recipe.idMeal,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };
  } else if (mealOrDrink === 'Drink') {
    newRecipe = {
      id: recipe.idDrink,
      type: 'bebida',
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
  }
  // Checa se já existe a chave de favoritos e adiciona nova receita no fim
  if (localStorage.getItem('favoriteRecipes')) {
    // Busca os favoritos atuais
    const currentFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // Adiciona a receita atual no array de favoritos
    const newFavorites = [...currentFavorites, newRecipe];
    // Coloca o array formado acima no LocalStorage
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  } else {
    // Cria o array de favoritos e adiciona no LocalStorage
    const favorites = [newRecipe];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  }
}

export default addToFavorites;
