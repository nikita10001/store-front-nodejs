import { useDispatch } from 'react-redux';
import AppRouter from './components/AppRouter';
import Header from './components/Header';
import { authActions, checkAuth } from './store/slices/authSlice';
import { useEffect, useState } from 'react';
import Preloader from './components/UI/Preloader';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return <Preloader />;
  }
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
