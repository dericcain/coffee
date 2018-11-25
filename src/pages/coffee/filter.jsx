import * as React from 'react';

export type Rating = 'rating-high' | 'rating-low';

export interface IOption {
  value: Rating;
  name: string;
}

interface IFilter {
  options: IOption[];
  value: string;
  onChange: (e: React.SyntheticEvent<HTMLSelectElement>) => void;
}

const Filter: React.FunctionComponent<IFilter> = ({ value, options, onChange }: IFilter) => (
  <select value={value} onChange={onChange}>
    <option value="">Sort...</option>
    {options.map(({ value, name }: IOption) => (
      <option value={value} key={value}>{name}</option>
    ))}
  </select>
);

export default Filter;

