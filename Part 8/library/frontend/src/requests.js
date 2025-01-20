import { gql } from '@apollo/client'

export const ME = gql`
    query {
        me {
            favoriteGenre
        }
    }
`;

export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`

export const GET_GENRES = gql`
    query {
        genres
    }
`;

export const UPDATE_AUTHOR = gql`
    mutation EditAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
            bookCount
            id 
        }
    }
`;

export const CREATE_BOOK = gql`
    mutation AddBook($title: String!, $genres: [String!]!, $published: Int!, $author: String!) {
        addBook(title: $title, genres: $genres, published: $published, author: $author) {
            title
            published
            id
            genres
            author {
                id
                name
            }
        }
    }
`;

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            id
            bookCount
            born
            name
        }
    }
`;

export const ALL_BOOKS = gql`
    query($genre: String) {
        allBooks(genre: $genre) {
            title
            published
            id
            genres
            author {
                id
                name
            }
        }
    }
`;