const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema = new Schema({
  title: { type: String, require },
  content: { type: String, require },
  adSoyad: { type: String, require },
  date: { type: String, require },
  pdf: { type: String, require },
  kimden: { type: String, require }, 
  siparisCinsi: { type: String, require },
  siparisMiktari: { type: String, require }
});

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;
