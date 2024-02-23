const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// load environmental variables
dotenv.config();

// import graphql schema and resolvers
const typeDefs = require("./graphql/schema/index.js");
const resolvers = require("./graphql/resolvers/index.js");

// create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.dkc8vwb.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
  )
  .then(() => {
    return server.listen(8000);
  })
  .then(({ url }) => {
    console.log(`Server is ready at ${url}`);
  })
  .catch((error) => {
    console.error("Error connecting to MONGO DB ", error);
  });
