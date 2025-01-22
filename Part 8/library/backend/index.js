require('dotenv').config();
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./src/models/user.js');
const typeDefs = require('./schema.js');
const resolvers = require('./resolvers.js');
const http = require('http')
const cors = require('cors')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const express = require('express');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws')

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.error('error connecting to mongodb', err))

const start = async () => {
    const app = express()
    const httpServer = http.createServer(app)
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/'
    })

    const schema = makeExecutableSchema({ typeDefs, resolvers })
    const serverCleanup = useServer({ schema }, wsServer)

    const server = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    }
                }
            }
        }]
    })

    await server.start()

    app.use(
        '/',
        cors(),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req, res }) => {
                const auth = req ? req.headers.authorization : null
                if (auth && auth.startsWith('Bearer ')) {
                    const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
                    const currentUser = await User.findById(decodedToken.id)
                    return { currentUser }
                }
            }
        })
    )

    const PORT = 4000
    httpServer.listen(PORT, () => {
        console.log(`Server ready at ${PORT}`)
    });
}

start()