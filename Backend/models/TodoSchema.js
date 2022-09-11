const { Schema, model} = require("mongoose");

const TodoSchema = ({
   id:String,
   todoTask:String,
   todoStatus:String,
   todoTag:String,
});

const Todo = model("todos",TodoSchema);

module.exports = Todo;