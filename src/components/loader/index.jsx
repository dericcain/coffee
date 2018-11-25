import * as React from 'react';
import { Spinner } from '@blueprintjs/core';

import { loader } from './loader.module.scss'

interface ILoader {
  isActive: boolean;
}

const Loader: React.FunctionComponent<ILoader> | null = ({ isActive }) => isActive ? (
  <div className={loader}>
    <Spinner />
  </div>
) : null;

Loader.defaultProps = {
  isActive: true,
};

export default Loader;


