import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, ALL_BOOKS, LOGIN } from "../requests";

export const LoginForm = ({ handleUserLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [handleLogin] = useMutation(LOGIN, {
        refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
        onError: (error) => {
            if (error.graphQLErrors.length > 0) {
                const messages = error.graphQLErrors.map(e => e.message).join('\n');
                console.error(messages);
            }
            else if (error) {
                console.error(error.message)
            }
        },
        onCompleted: (data) => {
            localStorage.setItem('token', data.login.value);
            handleUserLogin(data.login.value, "authors");
        }
    })

    function handleSubmit(event) {
        event.preventDefault();

        handleLogin({
            variables: {
                username,
                password
            }
        });

        setUsername('');
        setPassword('');
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="usernam">username</label>
                    <input value={username} id='username' name="username" type="text" required onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input value={password} id="password" name="password" type="password" required onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button type="submit">login</button>
            </form >
        </div>
    );
} 