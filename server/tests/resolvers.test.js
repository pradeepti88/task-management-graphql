const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server-core");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("../graphql/schema/index.js");
const resolvers = require("../graphql/resolvers/index.js");
const Task = require("../models/tasks");

let mongod;
let server;

const mockDBName = "task-management-graphql";

beforeAll(async () => {
  let mongoUri = "";
  mongod = await MongoMemoryServer.create();
  mongoUri = mongod.getUri();
  await mongoose.connect(`${mongoUri}${mockDBName}`);

  server = new ApolloServer({
    typeDefs,
    resolvers,
  });
});

async function closeMongoConnection(mongod, mongooseConnection) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
    try {
      mongod?.stop().then(() => {
        mongooseConnection.close().then(() => {
          resolve();
        });
      });
    } catch (err) {
      console.error(err);
    }
  });
}

afterAll(async () => {
  await closeMongoConnection(mongod, mongoose.connection);
  await server.stop();
});

describe("Integration tests with apollo server and MongoMemoryServer", () => {
  const mockTask = {
    title: "Task 1",
    status: "TODO",
  };

  const taskData = new Task(mockTask);

  it("should return valid result ", async () => {
    await taskData.save();
    const result = await server.executeOperation({
      query: `
            query {
                tasks {
                    title
                    status
                }
            }
            `,
    });

    expect(result.data.tasks).toHaveLength(1);
    expect(result.data.tasks[0]).toMatchObject(mockTask);
  });
  it("should return only title in the graphql API response", async () => {
    await taskData.save();
    const result = await server.executeOperation({
      query: `
            query {
                tasks {
                    title
                }
            }
            `,
    });
    const { title } = taskData;
    expect(result.data.tasks).toHaveLength(1);
    expect(result.data.tasks[0]).toMatchObject({ title });
  });

  it("should add task using create task query", async () => {
    const result = await server.executeOperation({
      query: `
        mutation createTask($title: String!){
            createTask(
                input: {
                title: $title
                status: TODO
                dueDate: "${new Date(
                  new Date().setDate(new Date().getDate() + 3)
                )}"
                }
            ) {
                title
                status
            }
        }`,
      variables: { title: "New task added" },
    });
    const allTasks = await server.executeOperation({
      query: `
            query {
                tasks {
                    title
                }
            }
            `,
    });
    expect(allTasks.data.tasks).toHaveLength(2);
  });
  it("should delete task using delete task graphql query", async () => {
    const allTasksBeforeDeletion = await server.executeOperation({
      query: `
            query {
                tasks {
                    title,
                    id
                }
            }
            `,
    });
    expect(allTasksBeforeDeletion.data.tasks).toHaveLength(2);
    const result = await server.executeOperation({
      query: `
            mutation ($id: ID!) {
                deleteTask(id: $id)
            }
        `,
      variables: { id: allTasksBeforeDeletion.data.tasks[0].id },
    });
    const allTasksAfterDeletion = await server.executeOperation({
      query: `
            query {
                tasks {
                    title,
                }
            }
            `,
    });
    expect(allTasksAfterDeletion.data.tasks).toHaveLength(1);
  });
  it("should update task using update task graphql query", async () => {
    const allTasksBeforeUpdation = await server.executeOperation({
      query: `
            query {
                tasks {
                    title,
                    id
                }
            }
            `,
    });
    const titleBeforeUpdation = allTasksBeforeUpdation.data.tasks[0].title;
    const updatedTitle = "Updated task title";
    const result = await server.executeOperation({
      query: `
              mutation ($id: ID!, $taskStatus: Status, $taskTitle: String) {
                updateTask(id: $id, status: $taskStatus, title: $taskTitle) {
                id
                title
                description
                status
                dueDate
                }
            }
        `,
      variables: {
        id: allTasksBeforeUpdation.data.tasks[0].id,
        taskTitle: updatedTitle,
      },
    });
    const allTasksAfterUpdation = await server.executeOperation({
      query: `
            query {
                tasks {
                    title,
                }
            }
            `,
    });
    expect(allTasksAfterUpdation.data.tasks[0].title).not.toEqual(
      titleBeforeUpdation
    );
    expect(allTasksAfterUpdation.data.tasks[0].title).toEqual(updatedTitle);
  });
});
