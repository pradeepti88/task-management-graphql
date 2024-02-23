# Task Management Application Backend

A nodejs application to support the creation of GraphQL endpoints used to perform CURD operations on tasks. Database used is MongoDB.

# Setup

- Install dependencies using `npm install`

# Start server

Server is configured to run on port 8000.
GraphQL queries can be tested on [http://localhost:8000](http://localhost:8000).

index.js file contains the logic to connect to MongoDB and instantiation of Apollo Server which is used to create GraphQL endpoints.

- `npm start` can be used to start the server

# Testing

All the graphQL endpoints have been tested by creating a mongoDB server to test using MongoMemoryServer. All the tests can be referred at /tests/resolvers.test.js

- `npm test` can be used to run tests

# GraphQL endpoints

Below endpoints are created to fetch data from MongoDB.

- To fetch all the tasks
- To fetch tasks based on status filter
- To fetch tasks based on sort option
- To create a new task
- To update an existing task
- To delete a task

GraphQL schema can be referred at /graphql/schema/index.js
GraphQL resolvers can be referred at /graphql/resolvers/index.js
MongoDB models can be referred at /models/tasks.js

# Comments

- Comments are very well added to get better understanding of the application

# Yet to implement

- User authentication endpoints
- Currently API supports only TODO and DONE status for tasks, future plans to add ACTIVE status too.
- Validation is added for dueDate field which cannot accept a current date or earlier date. This can be improved given more time.
