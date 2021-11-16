const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const findOrCreate = require("mongoose-findorcreate");
const { string } = require("joi");
const User = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    phone: {
      type: Number,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
    facebookId: String,
    googleId: String,
    image: String,
  },
  { timestamps: true }
);

// Instance Method => check password
User.method({
  matchPassword: async function (password) {
    const res = await bcrypt.compareSync(password, this.password);
    return res;
  },
});

//Schema Hook => hash password
User.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  return next();
});

User.plugin(findOrCreate);

module.exports = model("User", User);
