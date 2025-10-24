import { useState } from "react"
import { useMutation } from "@apollo/client";
import { CREATE_BOOK } from '../requests'

const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter(({ title }) => seen.had(title) ? false : seen.add(title))
}

export const BookAdd = () => {
    const [genres, setGenres] = useState([]);
    const [AddBook] = useMutation(CREATE_BOOK, {
        onError: (error) => {
            if (error.graphQLErrors.length > 0) {
                const messages = error.graphQLErrors.map(e => e.message).join('\n');
                console.error(messages);
            }
            else if (error) {
                console.error(error.message)
            }
        },
        // refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
        update: (cache, { data: { addBook } }) => {
            cache.modify({
                fields: {
                    allAuthors(existingAuthors = []) {
                        return [...existingAuthors, addBook.authors];
                    },
                    allBooks(existingBooks = []) {
                        uniqByTitle(existingBooks.concat());
                    }
                }
            })
        }
    })

    function genreHandler() {
        const newGenre = document.querySelector('#genre');
        setGenres(genres.concat(newGenre.value));
        newGenre.value = '';
    }

    function addBookHandler(event) {
        event.preventDefault();

        if (genres.length <= 0) return;

        const { title, author, published } = event.currentTarget;
        AddBook({
            variables: {
                title: title.value,
                author: author.value,
                published: parseInt(published.value, 10),
                genres
            }
        });

        title.value = '';
        author.value = '';
        published.value = '';
        setGenres([]);
    }
    return (
        <div>
            <form onSubmit={addBookHandler}>
                <div>
                    <label htmlFor="title">title</label>
                    <input required type="text" name="title" id="title" />
                </div>
                <div>
                    <label htmlFor="author">author</label>
                    <input required type="text" name="author" id="author" />
                </div>
                <div>
                    <label htmlFor="published">published</label>
                    <input required type="number" name="published" id="published" />
                </div>
                <div>
                    <input type="text" name="genre" id="genre" />
                    <button type="button" onClick={genreHandler}>add genre</button>
                    <p>genres:{genres?.join(', ')}</p>
                </div>
                <div>
                    <button type="submit">create a book</button>
                </div>
            </form>
        </div>
    )
}