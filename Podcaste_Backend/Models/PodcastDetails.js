const mdb = require("mongoose");

const PodcastSchema = new mdb.Schema({
    userid: {
        type: mdb.Schema.Types.ObjectId,
        ref: "SIGNUPMAIN",
        required: true,
      },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  audio: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mdb.model("PODCAST", PodcastSchema);
