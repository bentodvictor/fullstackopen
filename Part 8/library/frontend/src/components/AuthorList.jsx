import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../requests";

export const AuthorList = ({ authors }) => {
    const [EditAuthor] = useMutation(UPDATE_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (error) => {
            if (error.graphQLErrors.length > 0) {
                const messages = error.graphQLErrors.map(e => e.message).join('\n');
                console.error(messages);
            }
            else if (error) {
                console.error(error);
            }
        }
    })
    function updateAuthorHandler(event) {
        event.preventDefault();

        const { author, born } = event.currentTarget;
        EditAuthor({
            variables: {
                name: author.value,
                setBornTo: parseInt(born.value, 10)
            }
        })

        born.value = '';
    }

    return (
        <div>
            <section>
                <h2>authors</h2>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>born</th>
                            <th>books</th>
                        </tr>
                    </thead>
                    <tbody>
                        {authors?.allAuthors?.map(author => (
                            <tr key={author.id}>
                                <td>{author.name}</td>
                                <td>{author.born ?? ''}</td>
                                <td>{author.bookCount ?? 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <section>
                <h2>Set birthyear</h2>
                <form onSubmit={updateAuthorHandler}>
                    <select name="author" id="author">
                        {authors?.allAuthors?.map(author => (
                            <option key={author.id} value={author.name}>{author.name}</option>
                        ))}
                    </select>
                    <div>
                        <label htmlFor="born">born</label>
                        <input type="number" name="born" id="born"></input>
                    </div>
                    <button type="submit">update author</button>
                </form>
            </section>
        </div>
    );
}