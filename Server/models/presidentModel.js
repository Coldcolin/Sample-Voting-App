const mongoose = require("mongoose");

// const vote = new mongoose.Schema({
//   who: {
//     type: String
//   },
//   toggle: {
//     type: Boolean
//   }
// });


const presidentModel = new mongoose.Schema(
  {
    name: {
      type: String
    },
    position: {
      type: String,
      default: "President"
    },
    avatar: {
      type: String
    },
    // voteCount: [vote],
    Votes: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref: "PresidentCount"
    }]
  },
  { timestamps: true }
);

module.exports  = mongoose.model("presidents", presidentModel);




