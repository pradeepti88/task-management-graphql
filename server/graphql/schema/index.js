// import the gql function from apollo-server to convert query to standard graphql abstract syntax tree
const { gql } = require("apollo-server");

const typeDefs = gql`
  # adding Date as custom data type as it is not a valid scalar type in GraphQL
  scalar Date

  # define an enum type for task status
  enum Status {
    TODO
    DONE
  }

  # define a type for Task
  type Task {
    id: ID!
    title: String!
    description: String
    status: Status!
    dueDate: Date!
  }

  input FilterStatus {
    status: Status
  }

  # define the root query type
  type Query {
    # get all tasks
    tasks(filter: FilterStatus, sort: String): [Task!]!

    # get a single task by id
    task(id: ID!): Task
  }

  input TaskInput {
    title: String!
    description: String
    status: Status!
    dueDate: Date!
  }

  # define the root mutation type
  type Mutation {
    # create a new task
    createTask(input: TaskInput): Task!

    # update an existing task by id
    updateTask(
      id: ID!
      title: String
      description: String
      status: Status
    ): Task!

    # delete an existing task by id
    deleteTask(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;
