const { Schema, model } = require("mongoose");

const Product = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: Array,
      required: true,
    },
    category: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
    },
    reviews: [
      {
        username: { type: String },
        review: { type: String },
      },
    ],
    appreciation: {
      type: [Number],
    },
    value: {
      type: Number,
    },
  },
  { timestamps: true } // createAt updateAt
);

Product.post("init", function (doc) {
  if (this.appreciation[0]) {
    let num = this.appreciation.length;
    let num2 = this.appreciation.reduce((e, acc) => e + acc);
    this.value = num2 / num;
  }
});

module.exports = model("Product", Product);
