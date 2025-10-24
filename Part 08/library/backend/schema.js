const typeDefs = `
    type Subscription {
        bookAdded: Book!
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book!
        
        editAuthor(
            name: String!
            setBornTo: Int!
        ) : Author!
        
        createUser(
            username: String!
            favoriteGenre: String!
        ): User

        login(
            username: String!
            password: String!
        ): Token
    }

    type Author {
        id: ID!
        name: String!
        bookCount: Int!
        born: Int
    }
    
    type Book {
        id: ID!
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }
    
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
        genres: [String!]!
    }
`;

module.exports = typeDefs;