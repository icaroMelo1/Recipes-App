function saveDrinkOnLS(recipe) {
  // Monta o objeto a ser colocado no LocalStorage
  const newRecipe = {
    [recipe.idDrink]: [],
  };
  // Checa se já existe a chave de receitas em progresso, caso não existe cria chave
  // correspondente à categoria
  if (!localStorage.getItem('inProgressRecipes')) {
    const newDrink = { cocktails: newRecipe };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newDrink));
  } else {
    // Coloca a nova receita na chave de bebidas
    const currentRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // Checa se já existe a chave de bebidas
    if (currentRecipes.cocktails) {
      // Checa se a receita já está em progresso, caso esteja não é necessário mexer no LocalStorage.
      // Primeiro faz um array com os Ids em progresso
      const cocktailsIds = Object.keys(currentRecipes.cocktails);
      // Checa se o id da receita atual está presente no array formado acima. Caso não esteja, cria a
      // entrada no LocalStorage
      if (!cocktailsIds.some((recipeId) => recipeId === recipe.idDrink)) {
        const newRecipes = { ...currentRecipes,
          cocktails: {
            ...currentRecipes.cocktails,
            ...newRecipe,
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipes));
      }
    } else {
      const newRecipes = { ...currentRecipes,
        cocktails: {
          ...newRecipe,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipes));
    }
  }
}
export default saveDrinkOnLS;
