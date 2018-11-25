import * as React from 'react';
import { Button, Icon } from '@blueprintjs/core';

import AppContext from '../../context';
import model from '../../data/model';
import AddCoffeeForm from './form';
import CoffeeList from './list';
import Filter from './filter';
import { addCoffeeButton } from './coffee.module.scss';

import type { Coffee as ICoffee } from '../../data/model';
import Nav from '../../components/nav';
import type { IOption, Rating } from './filter';

interface State {
  newCoffee: ICoffee;
  coffee: ICoffee[];
  isFetching: boolean;
  isSubmitting: boolean;
  dialogIsOpen: boolean;
  filteredBy: Rating;
}

const newCoffee: ICoffee = {
  brand: '',
  type: '',
  thoughts: '',
  rating: 7,
};

class Coffee extends React.Component<null, State> {

  static contextType = AppContext;

  static filters: IOption[] = [
    { name: 'Rating (highest)', value: 'rating-high' },
    { name: 'Rating (lowest)', value: 'rating-low' },
  ];

  state = {
    newCoffee,
    coffee: [],
    isFetching: true,
    isSubmitting: false,
    dialogIsOpen: false,
  };

  constructor(props, context) {
    super(props, context);
    this.db = model(context.user.uid);
  }

  componentDidMount() {
    this.fetchCoffee();
    this.setState({ isFetching: false });
  }

  fetchCoffee = () => {
    this.db.getCoffee()
      .then(coffee => {
        this.setState({ coffee });
      })
      .catch(e => {
        throw new Error(e);
      })
      .finally(() => {
        this.setState({ isFetching: false });
      });
  }

  addCoffee = e => {
    e.preventDefault();
    this.setState({ isSubmitting: true })
    this.db.addCoffee(this.state.newCoffee)
      .then(() => {
        this.fetchCoffee()
      })
      .catch(e => {
        throw new Error(e);
      }).finally(() => {
      this.setState({
        newCoffee,
        isSubmitting: false,
        dialogIsOpen: false,
      })
    });
  };

  onInputChange = (e: React.SyntheticEvent) => {
    const { name, value } = e.target;
    this.setState(({ newCoffee }) => ({ newCoffee: { ...newCoffee, [name]: value }}));
  };

  onRatingChange = rating => {
    this.setState(({ newCoffee }) => ({ newCoffee: { ...newCoffee, rating }}));
  }

  handleClose = () => {
    this.setState({ dialogIsOpen: false });
  }

  openDialog = () => {
    this.setState({ dialogIsOpen: true });
  }

  handleSort = e => {
    const { value } = e.target;
    this.setState(({ coffee }) => ({
      filteredBy: value,
      coffee: coffee.sort((a, b) => {
        if (value === 'rating-high') {
          return b.rating - a.rating;
        }
        return a.rating - b.rating;
      })
    }))
  };

  render() {
    const { newCoffee, dialogIsOpen, isFetching, filteredBy } = this.state;

    return (
      <div style={{ paddingTop: 60 }}>
        <Nav />
        <Filter options={Coffee.filters} value={filteredBy} onChange={this.handleSort} />
        <CoffeeList coffee={this.state.coffee} isFetching={isFetching} />
        <AddCoffeeForm
          {...{
            ...newCoffee,
            dialogIsOpen,
            onInputChange: this.onInputChange,
            onRatingChange: this.onRatingChange,
            addCoffee: this.addCoffee,
            handleClose: this.handleClose,
          }}
        />
        <Button intent="primary" className={addCoffeeButton} onClick={this.openDialog}>
          <Icon icon="plus" iconSize={20} />
        </Button>
      </div>
    );
  }
}

export default Coffee;
