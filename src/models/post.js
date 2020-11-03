const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
    required: false,
	},
	userId: {
		type: String,
    required: false,
	}
});

module.exports = mongoose.model("Post", postSchema);