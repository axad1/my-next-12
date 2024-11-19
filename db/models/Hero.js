const mongoose = require("mongoose");

const hero = {
  superHero: {
    type: String,
    required: [true, "Please name the hero"],
    unique: true,
    trim: true,
  },
  realName: {
    type: String,
    required: true,
    trim: true,
    maxLength: [10, "Please keep real name short"],
  },
};

const schema = new mongoose.Schema(hero, {
  timestamps: true,
});

module.exports = mongoose.models.Hero || mongoose.model("Hero", schema);
