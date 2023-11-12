import { useDispatch, useSelector } from 'react-redux';
import AppRouter from './components/AppRouter';
import Header from './components/Header';
import { checkAuth, selectAuth } from './store/slices/authSlice';
import { useEffect, useState } from 'react';
import Preloader from './components/UI/Preloader';

function App() {
  const { user } = useSelector(selectAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, []);
  if (!user) {
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
