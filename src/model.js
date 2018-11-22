// @flow
import * as firebase from 'firebase';

const COFFEE = 'coffee';

export interface Coffee {
  brand: string;
  type: string;
  thoughts: string;
  rating: number;
}

export default () => {
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true,
  });

  const coffeeCollection = db.collection(COFFEE);

  const getCoffee = async () => {
    try {
      const coffee = [];
      const q = await coffeeCollection.get();
      q.forEach(doc => {
        coffee.push({
          id: doc.id,
          ...doc.data(),
        })
      });
      return coffee;
    } catch (e) {
      throw new Error(e);
    }
  };

  const addCoffee = async (coffee: Coffee) => {
    try {
      return coffeeCollection.add(coffee);
    } catch (e) {
      throw new Error(e);
    }
  };

  return {
    db,
    getCoffee,
    addCoffee,
  }
};
