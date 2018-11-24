import * as React from 'react';
import { Navbar, Alignment, Button } from '@blueprintjs/core';

import model from '../../data/model';
import AddCoffeeForm from './add-coffee-form';
import CoffeeList from './list';

import type { Coffee as ICoffee } from '../../data/model';
import { Consumer } from '../../context';

interface IProps {
  openDialog: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
}

const Nav = ({ openDialog }: IProps) => (
  <Consumer>
    {({ logout }) => (
      <Navbar fixedToTop>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Coffee</Navbar.Heading>
          <Navbar.Divider />
          <Button className="bp3-minimal" icon="add" text="Add Coffee" intent="success" onClick={openDialog} />
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Button className="bp3-minimal" icon="log-out" text="Logout" onClick={logout} />
        </Navbar.Group>
      </Navbar>
    )}
  </Consumer>
);

interface State extends ICoffee {
  coffee: ICoffee[];
  isFetching: boolean;
  isSubmitting: boolean;
  dialogIsOpen: boolean;
}

class Coffee extends React.Component<null, State> {

  state = {
    brand: '',
    type: '',
    thoughts: '',
    rating: 7,
    coffee: [],
    isFetching: true,
    isSubmitting: false,
    dialogIsOpen: false,
  };

  constructor(props) {
    super(props);
    this.db = model();
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
    const { coffee, isFetching, isSubmitting, dialogIsOpen, ...rest } = this.state;
    this.db.addCoffee(rest)
      .then(() => {
        this.fetchCoffee()
      })
      .catch(e => {
        throw new Error(e);
      }).finally(() => {
      this.setState({
        isSubmitting: false,
        brand: '',
        type: '',
        thoughts: '',
        rating: 8,
        dialogIsOpen: false,
      })
    });
  };

  onInputChange = (e: React.SyntheticEvent) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onRatingChange = rating => {
    this.setState({ rating });
  }

  handleClose = () => {
    this.setState({ dialogIsOpen: false });
  }

  openDialog = () => {
    this.setState({ dialogIsOpen: true });
  }

  render() {
    const { brand, type, rating, thoughts, dialogIsOpen, isFetching } = this.state;

    return (
          <div style={{ paddingTop: 60 }}>
            <Nav openDialog={this.openDialog} />
            <CoffeeList coffee={this.state.coffee} isFetching={isFetching} />
            <AddCoffeeForm
              {...{
                brand,
                rating,
                type,
                thoughts,
                dialogIsOpen,
                onInputChange: this.onInputChange,
                onRatingChange: this.onRatingChange,
                addCoffee: this.addCoffee,
                handleClose: this.handleClose,
              }}
            />
          </div>
    );
  }
}

export default Coffee;
