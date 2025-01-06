import { useQuery } from '@apollo/client';
import './App.css';
import { ALL_AUTHORS, ALL_BOOKS } from './requests';
import { Menu } from './components/Menu';
import { AuthorList } from './components/AuthorList';
import { BookList } from './components/BookList';
import { useState } from 'react';
import { BookAdd } from './components/BookAdd';

function App() {
  const [activeTab, setActiveTab] = useState("authors");
  const result_authors = useQuery(ALL_AUTHORS);
  const result_books = useQuery(ALL_BOOKS);

  if (result_authors.loading || result_books.loading) {
    return <div>loading...</div>
  }

  function handleActiveTab(tab) {
    setActiveTab(tab);
  }

  return (
    <div style={{ padding: '0.7rem' }}>
      <Menu page={activeTab} handleActiveTab={handleActiveTab} />
      {activeTab === 'authors' && <AuthorList authors={result_authors.data} />}
      {activeTab === 'books' && <BookList books={result_books.data} />}
      {activeTab === 'add_book' && <BookAdd />}
    </div>
  );
}

export default App;
