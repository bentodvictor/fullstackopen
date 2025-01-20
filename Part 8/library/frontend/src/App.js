import { useQuery } from '@apollo/client';
import './App.css';
import { ALL_AUTHORS } from './requests';
import { Menu } from './components/Menu';
import { AuthorList } from './components/AuthorList';
import { BookList } from './components/BookList';
import { useEffect, useState } from 'react';
import { BookAdd } from './components/BookAdd';
import { LoginForm } from './components/LoginForm';

function App() {
  const [activeTab, setActiveTab] = useState("login");
  const [user, setUser] = useState(null);
  const result_authors = useQuery(ALL_AUTHORS);

  useEffect(() => {
    const alreadyLogged = localStorage.getItem('token');
    setUser(alreadyLogged);
    if (alreadyLogged) {
      setActiveTab("authors");
    }
  }, []);

  if (result_authors.loading) {
    return <div>loading...</div>
  }

  function handleActiveTab(tab) {
    setActiveTab(tab);
  }

  function handleUserLogin(token, tab) {
    setUser(token);
    setActiveTab(tab);
  }

  return (
    <div style={{ padding: '0.7rem' }}>
      <Menu page={activeTab} handleActiveTab={handleActiveTab} user={user} handleUserLogin={handleUserLogin} />
      {activeTab === 'authors' && <AuthorList authors={result_authors.data} />}
      {activeTab === 'books' && <BookList />}
      {activeTab === 'add_book' && <BookAdd />}
      {activeTab === 'login' && <LoginForm handleUserLogin={handleUserLogin} />}
    </div>
  );
}

export default App;
