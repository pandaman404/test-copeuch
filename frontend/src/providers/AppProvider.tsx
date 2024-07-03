import App from '../App.tsx';
import { Provider } from 'react-redux';
import { store } from '../store/index.ts';

export const AppProvider = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
