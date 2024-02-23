const mongoose = require("mongoose");

const { Schema } = mongoose;

// Create a schema for Task model
const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["TODO", "DONE"],
      uppercase: true,
    },
    dueDate: {
      type: Date,
      validate: {
        validator: (value) => value >= Date.now(),
        message: (props) => `${props.value} is not a valid due date`,
      },
    },
  },
  {
    // this adds the createdDate and updatedDate fields in DB
    timestamps: true,
  }
);

// Create a model for Task schema
module.exports = mongoose.model("Task", taskSchema);
