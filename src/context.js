import { createContext } from 'react';

const AppContext = createContext();
const { Consumer, Provider } = AppContext;
export { Consumer, Provider, AppContext as default };
