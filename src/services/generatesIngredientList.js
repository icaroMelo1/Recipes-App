function generatesIngredientList(recipe) {
  // Gera a lista de ingredientes
  const ingredients = Object.keys(recipe)
  // Filtra apenas as chaves que possuem ingredientes
    .filter((key) => key.includes('strIngredient'))
  // A partir das chaves anteriores, faz um array que contém strings de ingredientes
    .map((key) => recipe[key])
  // Filtra as chaves que são nulas ou vazias
    .filter((key) => (key));
  // Gera a lista de quantidade de ingredientes
  const quantities = Object.keys(recipe)
  // Filtra as chaves que possuem quantidade de ingredientes
    .filter((key) => key.includes('strMeasure'))
  // A partir das chaves anteriores, faz um array que contém strings de quantidades
    .map((key) => recipe[key])
  // Filtra as chaves que são nulas ou vazias
    .filter((key) => (key));
  // Gera o array de ingredientes para o localStorage
  const ingAndquant = ingredients
    .map((ingredient, index) => {
      if (quantities[index]) {
        return `${ingredient} - ${quantities[index]}`;
      } return ingredient;
    });
  return ingAndquant;
}

export default generatesIngredientList;
