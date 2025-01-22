import { useQuery, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { ALL_BOOKS, BOOK_ADDED, GET_GENRES, ME } from "../requests";

export const BookList = () => {
    const [genre, setGenre] = useState('');
    const [books, setBooks] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [firstLoad, setFirstLoad] = useState(true);
    const { loading: userLoading, data: userData } = useQuery(ME);
    const { loading: genresLoading, data: genresData } = useQuery(GET_GENRES);
    const { loading: booksLoading, data: booksData } = useQuery(ALL_BOOKS, {
        variables: { genre },
        skip: !genre
    });

    useSubscription(BOOK_ADDED, {
        onData: ({ client, data }) => {
            const newBook = data.data.bookAdded;

            window.alert(`New book added: \r    📖 ${newBook.title} \r    ✍ ${newBook.author.name}`);

            client.cache.modify({
                fields: {
                    allBooks(existingBooks = []) {
                        const isDuplicate = existingBooks.some(book => book.id === newBook.id);
                        if (!isDuplicate) {
                            return [...existingBooks, newBook];
                        }
                        return existingBooks;
                    },
                    allAuthors(existingAuthors = []) {
                        const isAuthorExists = existingAuthors.some(author => author?.__ref?.includes(newBook.author.name));
                        if (!isAuthorExists) {
                            return [...existingAuthors, newBook.author];
                        }
                        return existingAuthors;
                    }
                }
            })
            client.refetchQueries({ includes: [ALL_BOOKS] })
        }
    });

    let dynamicHtml = firstLoad
        ? <><h2>recommendations</h2> <p>books in your favorite genre <strong>patterns</strong></p></>
        : <><h2>books</h2> <p>in genre <strong>{genre}</strong></p></>;

    useEffect(() => {
        if (!userLoading && userData) {
            setGenre(userData?.me?.favoriteGenre);
        }
    }, [userLoading, userData])

    // Update genres list when data is fetched
    useEffect(() => {
        if (!genresLoading && genresData) {
            setGenreList(genresData.genres);
        }
    }, [genresLoading, genresData]);

    // Update books when data is fetched
    useEffect(() => {
        if (!booksLoading && booksData) {
            setBooks(booksData.allBooks);
        }
    }, [booksLoading, booksData]);

    if (genresLoading) {
        return <div>Loading genres...</div>;
    }

    const handleGenreClick = (genre) => {
        setGenre(genre);
        setFirstLoad(false);
    };

    return (
        <div>
            <br />
            {genreList?.map(genre => <button key={genre} onClick={() => handleGenreClick(genre)}>{genre}</button>)}
            {dynamicHtml}
            <table>
                <thead>
                    <tr>
                        <th>title</th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                </thead>
                <tbody>
                    {books?.map(book => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author.name}</td>
                            <td>{book.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}