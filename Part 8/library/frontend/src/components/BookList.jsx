import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ALL_BOOKS, GET_GENRES, ME } from "../requests";

export const BookList = () => {
    const [genre, setGenre] = useState('');
    const [books, setBooks] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [firstLoad, setFirstLoad] = useState(true);
    const { loading: userLoading, data: userData } = useQuery(ME);
    const { loading: genresLoading, data: genresData } = useQuery(GET_GENRES);
    const { loading: booksLoading, data: booksData, refetch: refetchBooks } = useQuery(ALL_BOOKS, {
        variables: { genre },
        skip: !genre
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
        refetchBooks({ genre }); // Explicitly refetch books for the selected genre
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