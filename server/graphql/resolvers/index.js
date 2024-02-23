const Task = require("./../../models/tasks");

const resolvers = {
  Query: {
    // Fetch all tasks
    tasks: async (parent, args) => {
      try {
        // Build a query object based on filter argument
        const { filter, sort } = args;
        const query = {};
        if (filter) {
          if (filter.status) {
            query.status = filter.status;
          }
        }
        // Update query object with sort options
        const sortOptions = {};
        if (sort) {
          if (sort.field) {
            sortOptions[sort.field] = sort.order.upperCase() === "ASC" ? 1 : -1;
          }
        }
        const tasks = await Task.find(query).sort(sortOptions);
        return tasks;
      } catch (err) {
        console.error("Fetch tasks error ", err);
        throw err;
      }
    },

    // Fetch a task by id
    task: async (parent, args) => {
      try {
        const { id } = args;
        const task = await Task.findById(id);
        return task;
      } catch (err) {
        console.error("Fetch task by ID error ", err);
        throw err;
      }
    },
  },

  Mutation: {
    // Create a new task
    createTask: async (parent, args) => {
      try {
        const { input } = args;
        const task = new Task(input);
        await task.save();
        return task;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },

    // Update an existing task
    updateTask: async (parent, args) => {
      try {
        const { id } = args;
        const task = await Task.findByIdAndUpdate(id, args, {
          new: true, // return the modified task
        });
        return task;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },

    // Delete an existing task
    deleteTask: async (parent, args) => {
      try {
        const { id } = args;
        await Task.deleteOne({ _id: id });
        return true;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  },
};

module.exports = resolvers;
