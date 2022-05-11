import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';

function IngredientCheckBox({ ingredient, index, id,
  removeIngredients,
  addIngredients }) {
  const [checked, setChecked] = useState();
  const location = useLocation();
  // Checa se estamos em uma pagina de bebidas ou comidas
  let mealOrCockTail;
  if (location.pathname.includes('bebidas')) {
    mealOrCockTail = 'cocktails';
  } else if (location.pathname.includes('comidas')) {
    mealOrCockTail = 'meals';
  }
  useEffect(() => {
    // Checa se o ingrediente está no LocalStorage
    function checkedIngredient() {
      if (localStorage.getItem('inProgressRecipes')) {
        // Busca o LocalStorage
        const currentRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
        // Checa se o ingrediente está presente no array
        if (currentRecipes[mealOrCockTail][id]) {
          setChecked(currentRecipes[mealOrCockTail][id]
            .some((currIngredient) => currIngredient === ingredient));
        }
      }
    }
    checkedIngredient();
  }, [id, ingredient, mealOrCockTail]);
  // Adiciona o ingrediente clicado ao LocalStorage
  function setIngredient() {
    // Busca o localStorage que possui as receitas em progresso
    const currentRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // Se a receita ainda não tiver checkada
    if (!checked) {
      // Seta o check para true, riscando a opção
      setChecked(true);
      // Adiciona o ingrediente utilizado no array correspondente do localStorage
      removeIngredients(ingredient);
      const newIngredients = [...currentRecipes[mealOrCockTail][id], ingredient];
      // Faz o spread das receitas atuais pra não substituir a chave drinks
      const newRecipes = { ...currentRecipes,
        [mealOrCockTail]: {
          // Faz o spread das chaves em meals pra substituir apenas os ingredientes do id necessário
          ...currentRecipes[mealOrCockTail],
          [id]: newIngredients,
        },
      };
      // Seta o novo array de receitas em progresso no localStorage
      localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipes));
    } else {
      // Seta o check pra false, desmarcando a opção
      setChecked(false);
      // Remove o ingrediente utilizado do array correspondente do localStorage
      const newIngredients = currentRecipes[mealOrCockTail][id]
        .filter((currIngredient) => currIngredient !== ingredient);
      addIngredients(ingredient);
      // Faz o spread das receitas atuais pra não substituir a chave drinks
      const newRecipes = { ...currentRecipes,
        [mealOrCockTail]: {
          // Faz o spread das chaves em meals pra substituir apenas os ingredientes do id necessário
          ...currentRecipes[mealOrCockTail],
          [id]: newIngredients,
        },
      };
      // Seta o novo array de receitas em progresso no localStorage
      localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipes));
    }
  }
  return (
    <label
      htmlFor={ ingredient }
      data-testid={ `${index}-ingredient-step` }
      className="ingredient-option"
    >
      {/* A classe apenas risca o nome de acordo com o check corresponde */}
      <p className={ checked ? 'checked-ingredient' : null }>{ ingredient }</p>
      <input
        name={ ingredient }
        type="checkbox"
        onClick={ () => setIngredient() }
        defaultChecked={ checked }
      />
    </label>
  );
}

IngredientCheckBox.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  ingredient: PropTypes.string.isRequired,
  removeIngredients: PropTypes.func.isRequired,
  addIngredients: PropTypes.func.isRequired,
};

export default IngredientCheckBox;
