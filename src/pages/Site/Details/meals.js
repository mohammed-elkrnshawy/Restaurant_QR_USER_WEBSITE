import React, { useEffect, useState } from 'react';
import Item from './item_';

export default function category({ meals }) {
  return (
    <div className="categories">
      <h4>Meals</h4>
      {meals.map((i) => (
        <Item
          name={i.name}
          image={i.image}
          description={i.description}
          price={i.price}
        />
      ))}
    </div>
  );
}
