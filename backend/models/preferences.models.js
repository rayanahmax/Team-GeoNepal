const mongoose = require("mongoose");

const preferenceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    interest: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:'DPreference',
        require: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Preference", preferenceSchema);
