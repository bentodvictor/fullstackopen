export const Menu = ({ page, handleActiveTab }) => {
    return (
        <div>
            <button disabled={page === 'authors'} onClick={() => handleActiveTab('authors')}>authors</button>
            <button disabled={page === 'books'} onClick={() => handleActiveTab('books')}>books</button>
            <button disabled={page === 'add_book'} onClick={() => handleActiveTab('add_book')}>add book</button>
        </div>
    )
}