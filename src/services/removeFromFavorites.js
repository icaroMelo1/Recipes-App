function removeFromFavorites(id) {
  // Busca os favoritos atuais
  const currentFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  // Remove a receita atual no array de favoritos a partir do id informado
  const newFavorites = currentFavorites.filter((recipe) => recipe.id !== id);
  // Coloca o array formado acima no LocalStorage
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
}

export default removeFromFavorites;
