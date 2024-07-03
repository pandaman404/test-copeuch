import { TodoList } from './components/ui/TodoList';
import { MainLayout } from './layout/MainLayout';

const App = () => {
  return (
    <MainLayout>
      <TodoList />
    </MainLayout>
  );
};

export default App;
