const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const { v1 } = require('uuid')

let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
*/

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'Demons',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ) : Author
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
        author: String!
        genres: [String!]!
    }
    
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    }
`

const resolvers = {
    Query: {
        bookCount: () => books.length,
        authorCount: () => books.reduce((acc, val) => {
            const authorCount = Array.isArray(val.author) ? acc.author.length : 1;
            return authorCount + acc;
        }, 0),
        allBooks: (root, args) => {
            const { author, genre } = args;
            if (author && genre) {
                return books.filter(book => book.author === args.author && book.genres.includes(genre));
            }
            else if (args && !genre) {
                return books.filter(book => book.author === args.author);
            }
            else if (!args && genre) {
                return books.filter(book => book.genres.includes(genre));
            }
            else {
                return books;
            }
        },
        allAuthors: () => authors.map(author => {
            const bookCount = books.filter(book => book.author === author.name).length ?? 0;
            return { name: author.name, bookCount };
        })
    },
    Mutation: {
        addBook: (root, args) => {
            const { title, author, published, genres } = args;
            if (!title || !author || !published || !genres || !Array.isArray(genres)) {
                throw new GraphQLError('Missing one or more input elements', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }
            if (!authors.some(a => a.name === author)) {
                authors = authors.concat({
                    name: author,
                    bookCount: 1,
                    born: null
                });
            }
            const newBook = { ...args, id: v1() };
            books = books.concat(newBook);
            return newBook;
        },
        editAuthor: (root, args) => {
            let _author = authors.find(a => a.name === args.author);
            if(!_author) {
                return null;
            }
            _author.born = args.setBornTo;
            
            return _author;
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})