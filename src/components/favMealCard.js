import React from 'react';

function FavMealCard(r) {
  return (
    <div>
      <img
        className="foodImage"
        alt="Food"
        src={ r.r.image }
      />
      <h2>{ r.r.name }</h2>
      <h3>{ r.r.category }</h3>
      <h3>{ r.r.area }</h3>
    </div>
  );
}

export default FavMealCard;
