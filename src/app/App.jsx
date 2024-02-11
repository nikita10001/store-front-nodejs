import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth, selecAuthIsLoading, selectAuth } from '../store/slices/authSlice';
import AppRouter from './providers/router/ui/AppRouter';

import { Header } from 'widgets/Header';
import { Footer } from 'widgets/Footer';
// import Preloader from '../components/UI/Preloader';

function App() {
  const isLoading = useSelector(selecAuthIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  // if (isLoading) {
  //   return (
  //     <div>
  //       <div className="loader-title">Загрузка...</div>
  //       <Preloader />
  //     </div>
  //   );
  // }
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
