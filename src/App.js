import { useContext } from 'react';
import './App.css';
import { HomePage, Login } from './components';
import { authContext } from './utils/contexts/AuthWrapper';

function App() {
  const {authUser} = useContext(authContext);
  return (
    <main className="App">
      {
        authUser == null? <Login /> : <HomePage />
      }
    </main>
  );
}

export default App;
