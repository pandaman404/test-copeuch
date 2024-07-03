import App from '../App.tsx';
import { Provider } from 'react-redux';
import { store } from '../state/store.ts';

export const AppProvider = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
