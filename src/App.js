import { useDispatch, useSelector } from 'react-redux';
import AppRouter from './components/AppRouter';
import Header from './components/Header';
import { checkAuth, selectAuth } from './store/slices/authSlice';
import { useEffect } from 'react';
import Footer from './components/Footer';

function App() {
  const { isLoading } = useSelector(selectAuth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, []);
  if (isLoading) {
    return <div className="loader-title">Загрузка, жди...</div>;
  }
  return (
    <div className="app">
      <Header />
      <main className="page">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}

export default App;
