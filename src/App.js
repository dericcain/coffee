// @flow
import React, { Component } from 'react';
import { FormGroup, InputGroup, Slider, H4, Button, HTMLTable } from '@blueprintjs/core';

import model from './model';
import type { Coffee } from './model';

interface State extends Coffee {
  coffee: Coffee[]
}

class App extends Component<null, State> {

  state = {
    brand: '',
    type: '',
    thoughts: '',
    rating: 8,
    coffee: [],
    isFetching: true,
    isSubmitting: false,
  };

  constructor(props) {
    super(props);
    this.db = model();
  }

  componentDidMount() {
    this.fetchCoffee();
  }

  fetchCoffee = () => {
    this.db.getCoffee().then(coffee => {
      this.setState({ coffee });
    }).catch(e => {
      throw new Error(e);
    }).finally(() => {
      this.setState({ isFetching: false });
    });
  }

  addCoffee = e => {
    e.preventDefault();
    this.setState({ isSubmitting: true })
    const { coffee, isFetching, isSubmitting, ...rest } = this.state;
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
        })
      });
  };

  handleChange = (e: React.SyntheticEvent) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSliderChange = rating => {
    this.setState({ rating });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.addCoffee}>
          <H4>Add Coffee</H4>
          <FormGroup
            label="What brand coffee is it?"
            labelFor="brand"
            labelInfo="(required)"
          >
            <InputGroup id="brand" name="brand" placeholder="JavaPresse" onChange={this.handleChange} />
          </FormGroup>
          <FormGroup
            label="What type"
            labelFor="type"
            labelInfo="(required)"
          >
            <InputGroup id="type" name="type" placeholder="Summer Aroma" onChange={this.handleChange} />
          </FormGroup>
          <FormGroup
            label="What are your thoughts?"
            labelFor="thoughts"
          >
            <InputGroup id="thoughts" name="thoughts" placeholder="Tastes nice with hints of berry" onChange={this.handleChange} />
          </FormGroup>
          <FormGroup
            label="How good is it on a scale of 1 to 10?"
            labelFor="rating"
          >
            <Slider
              id="rating"
              name="rating"
              initialValue={this.state.rating}
              onChange={this.handleSliderChange}
              min={1}
              max={10}
              stepSize={1}
              value={this.state.rating}
            />
          </FormGroup>
          <Button
            icon="small-tick"
            intent="success"
            type="submit"
            loading={this.state.isSubmitting}
          >
            Add Coffee
          </Button>
        </form>
        <HTMLTable>
          <thead>
          <tr>
            <th>Brand</th>
            <th>Type</th>
            <th>Thoughts</th>
            <th>Rating</th>
          </tr>
          </thead>
          <tbody>
          {this.state.coffee && this.state.coffee.map(c => (
            <tr key={c.id}>
              <td>{c.brand}</td>
              <td>{c.type}</td>
              <td>{c.thoughts}</td>
              <td>{c.rating}</td>
            </tr>
          ))}
          </tbody>
        </HTMLTable>
      </div>
    );
  }
}

export default App;
