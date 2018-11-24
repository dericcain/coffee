import React from 'react';

import type { Coffee } from '../../data/model';

interface IProps {
  coffee: Coffee;
}

const CoffeeItem = ({ coffee }: IProps) => (
  <tr>
    <td>{coffee.brand}</td>
    <td>{coffee.type}</td>
    <td>{coffee.thoughts}</td>
    <td>{coffee.rating}</td>
  </tr>
);

export default CoffeeItem;
