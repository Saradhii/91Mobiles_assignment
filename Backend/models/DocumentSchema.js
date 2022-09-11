const { Schema, model} = require("mongoose");

const DocumentSchema = ({
   name:String,
   doc:String,
   userid:String,
});

const Document = model("docs",DocumentSchema);

module.exports = Document;