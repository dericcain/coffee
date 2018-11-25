import * as React from "react";

import { Button, Dialog, FormGroup, H4, InputGroup, Slider, Classes } from '@blueprintjs/core';

interface IProps {
  onInputChange: (e:  React.SyntheticEvent<HTMLInputElement>) => void;
  onRatingChange: (rating: number) => void;
  addCoffee: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  brand: string;
  type: string;
  thoughts: string;
  rating: number;
  isSubmitting: boolean;
  dialogIsOpen: boolean;
  handleClose: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
}

const AddCoffeeForm = ({
 onInputChange,
 onRatingChange,
 brand,
 type,
 thoughts,
 rating,
 isSubmitting,
 addCoffee,
 handleClose,
 dialogIsOpen
}: IProps) => (
  <Dialog
    icon="info-sign"
    onClose={handleClose}
    title="Add Coffee"
    isOpen={dialogIsOpen}
  >
    <div className={Classes.DIALOG_BODY}>
      <form onSubmit={addCoffee}>
        <H4>Add Coffee</H4>
        <FormGroup
          label="What brand coffee is it?"
          labelFor="brand"
          labelInfo="(required)"
        >
          <InputGroup id="brand" name="brand" placeholder="JavaPresse" onChange={onInputChange} value={brand} />
        </FormGroup>
        <FormGroup
          label="What specific type of coffee?"
          labelFor="type"
          labelInfo="(required)"
        >
          <InputGroup id="type" name="type" placeholder="Summer Aroma" onChange={onInputChange} value={type} />
        </FormGroup>
        <FormGroup
          label="What are your thoughts?"
          labelFor="thoughts"
        >
          <InputGroup
            id="thoughts"
            name="thoughts"
            placeholder="Tastes nice with hints of berry"
            onChange={onInputChange}
            value={thoughts}
          />
        </FormGroup>
        <FormGroup
          label="How good is it on a scale of 1 to 10?"
          labelFor="rating"
        >
          <Slider
            id="rating"
            name="rating"
            onChange={onRatingChange}
            min={1}
            max={10}
            stepSize={1}
            value={rating}
          />
        </FormGroup>
        <Button
          icon="small-tick"
          intent="success"
          type="submit"
          loading={isSubmitting}
          fill
        >
          Add Coffee
        </Button>
      </form>
    </div>
  </Dialog>
);

export default AddCoffeeForm;
