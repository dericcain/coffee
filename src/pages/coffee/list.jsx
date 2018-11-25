import * as React from 'react';
import { HTMLTable, Classes } from '@blueprintjs/core';
import * as cx from 'classnames';

import type { Coffee } from '../../data/model';
import CoffeeItem from './item';

interface IProps {
  coffee: Coffee[];
  isFetching: boolean;
}

const CoffeeList = ({ coffee, isFetching }: IProps) => (
  <HTMLTable style={{ width: '100%' }} striped condensed>
    <thead>
    <tr>
      <th className={cx({ [Classes.SKELETON]: isFetching })}>Brand</th>
      <th className={cx({ [Classes.SKELETON]: isFetching })}>Type</th>
      <th className={cx({ [Classes.SKELETON]: isFetching })}>Thoughts</th>
      <th className={cx({ [Classes.SKELETON]: isFetching })}>Rating</th>
    </tr>
    </thead>
    <tbody>
    {coffee && coffee.map(c => <CoffeeItem coffee={c} key={c.id} />)}
    </tbody>
  </HTMLTable>
);

export default CoffeeList;
