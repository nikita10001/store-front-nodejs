import { useDispatch } from 'react-redux';
import AppRouter from './components/AppRouter';
import Header from './components/Header';
import { adminActions } from './store/slices/adminSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('auth')) {
      dispatch(adminActions.setIsAuth(true));
    }
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
