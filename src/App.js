import { useDispatch } from 'react-redux';
import AppRouter from './components/AppRouter';
import Header from './components/Header';
import { authActions } from './store/slices/authSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('auth')) {
      dispatch(authActions.setIsAuth(true));
    }
  }, []);
  return (
    <div className="app">
      {/* <Header /> */}
      <main className="page">
        <AppRouter />
      </main>
    </div>
  );
}

export default App;
