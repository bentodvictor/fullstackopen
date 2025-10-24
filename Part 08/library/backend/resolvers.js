const { GraphQLError } = require('graphql');
const Author = require('./src/models/author.js');
const Book = require('./src/models/book.js');
const User = require('./src/models/user.js');
const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken');

const pubsub = new PubSub()

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
        },
        genres: async (root, args, context) => {
            const allGenres = await Book.distinct('genres');
            return allGenres;
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

                pubsub.publish('BOOK_ADDED', {
                    bookAdded: {
                        title: newBook.title,
                        published: newBook.published,
                        id: newBook._id.toString(),
                        genres: newBook.genres,
                        author: {
                            id: authorEntity._id.toString(),
                            name: authorEntity.name
                        }
                    }
                });

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
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        }
    }
}

module.exports = resolvers