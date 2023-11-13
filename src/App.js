import { useDispatch, useSelector } from 'react-redux';
import AppRouter from './components/AppRouter';
import Header from './components/Header';
import { checkAuth, selectAuth } from './store/slices/authSlice';
import { useEffect, useState } from 'react';
import Preloader from './components/UI/Preloader';

function App() {
  // const [isLoading, setIsLoading] = useState(true);
  const { isLoading } = useSelector(selectAuth);
  console.log(isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
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
