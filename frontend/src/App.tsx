import { NewTaskForm } from './components/ui/NewTaskForm';
import { TodoList } from './components/ui/TodoList';
import { MainLayout } from './layout/MainLayout';

const App = () => {
  return (
    <MainLayout>
      <NewTaskForm />
      <TodoList />
    </MainLayout>
  );
};

export default App;
