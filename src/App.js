import { useDispatch, useSelector } from 'react-redux';
import AppRouter from './components/AppRouter';
import Header from './components/Header';
import { checkAuth, selecAuthIsLoading, selectAuth } from './store/slices/authSlice';
import { useEffect } from 'react';
import Footer from './components/Footer';
import Preloader from './components/UI/Preloader';

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
