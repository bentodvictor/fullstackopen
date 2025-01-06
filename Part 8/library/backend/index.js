require('dotenv').config();
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const { v1 } = require('uuid')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Author = require('./src/models/author.js');
const Book = require('./src/models/book.js');
const User = require('./src/models/user.js');

/**
 * Connect to mongodb
 */
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.error('error connecting to mongodb', err))

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
    }
`

const resolvers = {
    Query: {
        bookCount: async () => await Book.find({}).countDocuments({}),
        authorCount: async () => {
            const books = await Book.find({});

            return books?.reduce((acc, val) => {
                const authorCount = Array.isArray(val.author) ? acc.author.length : 1;
                return authorCount + acc;
            }, 0)
        },
        allBooks: async (root, args) => {
            const { author, genre } = args;
            let authorEntity = null;
            if (author) {
                authorEntity = await Author.findOne({ name: author });
                if (!authorEntity) {
                    throw new Error('Author not found.');
                }
            }

            // Build the query object
            const query = {};
            if (authorEntity) {
                query.author = authorEntity._id; // Match the author's ID
            }
            if (genre) {
                query.genres = genre; // Check if the genre is in the genres array
            }

            // Find the book based on the query
            const books = await Book
                .find(query)
                .populate('author');

            if (!books) {
                throw new Error('Book not found');
            }

            return books.map(book => {
                const { genres, author, published, title, _id } = book;
                return {
                    id: _id.toString(),
                    title,
                    published,
                    genres,
                    author: {
                        name: author.name,
                        id: author.id.toString()
                    },
                }
            });
        },
        allAuthors: async () => {
            let result = [];
            const authors = await Author.find({});
            if (!authors) {
                throw new Error('Authors not found!');
            }

            for (const author of authors) {
                const { _id, name, born } = author;
                const bookCount = await Book.find({ author: _id }).countDocuments();
                result.push({
                    id: _id.toString(),
                    name,
                    born,
                    bookCount
                });
            }
            return result;
        },
        me: async (root, args, context) => {
            return context.currentUser
        }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const { currentUser } = context;
            if (!currentUser) {
                throw new GraphQLError('Not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }

            try {
                const { title, author, published, genres } = args;
                if (!title || !author || !published || !genres || !Array.isArray(genres)) {
                    throw new GraphQLError('Missing one or more input elements', {
                        extensions: {
                            code: 'BAD_USER_INPUT'
                        }
                    })
                }

                let authorEntity = await Author.findOne({ name: author });
                if (!authorEntity) {
                    authorEntity = new Author({
                        name: author,
                        bookCount: 1
                    })

                    await authorEntity.save();
                } else {
                    authorEntity.bookCount += 1;
                    await authorEntity.save();
                }

                const newBook = new Book({ title, published, genres, author: authorEntity._id });
                await newBook.save();

                return {
                    title: newBook.title,
                    published: newBook.published,
                    id: newBook._id.toString(),
                    genres: newBook.genres,
                    author: {
                        id: authorEntity._id.toString(),
                        name: authorEntity.name
                    }
                };
            } catch (error) {
                let errorMessage = "Saving book failed";

                if (error instanceof mongoose.Error.ValidationError) {
                    if (error.errors.hasOwnProperty("name")) {
                        errorMessage = "Saving book failed. Author name is not valid";
                    } else if (error.errors.hasOwnProperty("title")) {
                        errorMessage = "Saving book failed. Book title is not valid";
                    }
                    throw new GraphQLError(errorMessage, {
                        extensions: {
                            code: "BAD_USER_INPUT",
                        },
                    });
                } else {
                    throw new GraphQLError(errorMessage);
                }
            }
        },
        editAuthor: async (root, args, context) => {
            const { currentUser } = context;
            if (!currentUser) {
                throw new GraphQLError('Not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }

            let _author = await Author.findOne({ name: args.name });
            if (!_author) {
                throw new Error('Author not found in database');
            }

            _author['born'] = args.setBornTo;

            if (!_author.hasOwnProperty('bookCount')) {
                _author['bookCount'] = books.filter(book => book.author === _author.name)?.length ?? 0;
            }

            try {
                await _author.save()
            } catch (error) {
                throw new GraphQLError("Editing author failed");
            }

            return _author;
        },
        createUser: async (root, args) => {
            try {
                const user = new User({ ...args });
                return await user.save();
            } catch (error) {
                let errorMessage = "Creating user failed";

                if (error instanceof mongoose.Error.ValidationError) {
                    if (error.errors.hasOwnProperty("usename")) {
                        errorMessage = "Creating user failed. User name is not valid";
                    } else if (error.errors.hasOwnProperty("favoriteGenre")) {
                        errorMessage = "Creating user failed. User favorite genre is not valid";
                    }
                    throw new GraphQLError(errorMessage, {
                        extensions: {
                            code: "BAD_USER_INPUT",
                        },
                    });
                } else {
                    throw new GraphQLError(errorMessage);
                }
            }
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new GraphQLError('Wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), process.env.JWT_SECRET
            )
            const currentUser = await User
                .findById(decodedToken.id)
            return { currentUser }
        }
    }
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})