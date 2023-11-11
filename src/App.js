import { useDispatch } from 'react-redux';
import AppRouter from './components/AppRouter';
import Header from './components/Header';
import { authActions, checkAuth } from './store/slices/authSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, []);
  return (
    <div className="app">
      <Header />
      <main className="page">
        <AppRouter />
      </main>
    </div>
  );
}

export default App;
