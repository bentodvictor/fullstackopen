import { gql } from '@apollo/client'

// Fragments
export const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        published
        id
        genres
        author {
            id
            name
        }
    }
`;
export const AUTHOR_DETAILS = gql`
    fragment AuthorDetails on Author {
        id
        bookCount
        born
        name
    }
`;

// Mutations
export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`;
export const UPDATE_AUTHOR = gql`
    mutation EditAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            ...AuthorDetails
        }
    }
    ${AUTHOR_DETAILS}
`;
export const CREATE_BOOK = gql`
    mutation AddBook($title: String!, $genres: [String!]!, $published: Int!, $author: String!) {
        addBook(title: $title, genres: $genres, published: $published, author: $author) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`;

// Queries
export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            ...AuthorDetails
        }
    }
    ${AUTHOR_DETAILS}
`;
export const ALL_BOOKS = gql`
    query($genre: String) {
        allBooks(genre: $genre) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`;
export const ME = gql`
    query {
        me {
            favoriteGenre
        }
    }
`;
export const GET_GENRES = gql`
    query {
        genres
    }
`;

// Subscription
export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`;