const copy = require('clipboard-copy');

function shareLink(mealOrDrink, id) {
  if (mealOrDrink === 'Meal' || mealOrDrink === 'comidas') {
    copy(`http://localhost:3000/comidas/${id}`);
  } else {
    copy(`http://localhost:3000/bebidas/${id}`);
  }
}

export default shareLink;
