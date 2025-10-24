import { useApolloClient } from "@apollo/client";

export const Menu = ({ page, handleActiveTab, user, handleUserLogin }) => {
    const client = useApolloClient();

    function handleLogout () {
        handleUserLogin(null, "login")
        localStorage.clear();
        client.resetStore();    
    }
    return (
        <div>
            {user && <button disabled={page === 'authors'} onClick={() => handleActiveTab('authors')}>authors</button>}
            {user && <button disabled={page === 'books'} onClick={() => handleActiveTab('books')}>books</button>}
            {user && <button disabled={page === 'add_book'} onClick={() => handleActiveTab('add_book')}>add book</button>}
            {user ?
                <button onClick={handleLogout}>logout</button> :
                <button disabled={page === 'login'} onClick={() => handleActiveTab('login')}>login</button>}
        </div>
    )
}