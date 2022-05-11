function saveMealOnLS(recipe) {
  // Monta o objeto a ser colocado no LocalStorage
  const newRecipe = {
    [recipe.idMeal]: [],
  };
  // Checa se já existe a chave de receitas em progresso, caso não existe cria chave
  // correspondente à categoria
  if (!localStorage.getItem('inProgressRecipes')) {
    const newMeal = { meals: newRecipe };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newMeal));
  } else {
    // Busca a chave do LocalStorage, se for uma comida coloca a nova receita na chave
    // de comidas, caso contrário na chave de cocktails
    const currentRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // Checa se já existe a chave de comidas
    if (currentRecipes.meals) {
      // Checa se a receita já está em progresso, caso esteja não é necessário mexer no LocalStorage.
      // Primeiro faz um array com os Ids em progresso
      const mealsIds = Object.keys(currentRecipes.meals);
      // Checa se o id da receita tual está presente no array formado acima. Caso não esteja, cria a
      // entrada no LocalStorage
      if (!mealsIds.some((recipeId) => recipeId === recipe.idMeal)) {
        const newRecipes = { ...currentRecipes,
          meals: {
            ...currentRecipes.meals,
            ...newRecipe,
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipes));
      }
    } else {
      const newRecipes = { ...currentRecipes,
        meals: {
          newRecipe,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipes));
    }
  }
}
export default saveMealOnLS;
