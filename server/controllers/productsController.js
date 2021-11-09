const Product = require("../models/Products");

class ProductController {
  static async getAllProduct(req, res) {
    try {
      const products = await Product.find({ color: "Negro" });
      res.json(products);
    } catch {
      res.status(500).json({ error });
    }
  }

  static async getProduct(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      res.json(product);
    } catch {
      res.status(500).json({ error });
    }
  }
  //db.people.find({"name": {$regex:".*fis", $options:"i"}},{name:1})
  static async getProductTitle(req, res) {
    try {
      //const { title } = req.body;
      const product = await Product.findOne({ title: req.params.title });
      res.json(product);
    } catch {
      res.status(500).json({ error });
    }
  }

  static async getTags(req, res) {
    try {
      const products = await Product.find({ category: { $in: [req.params.tag] } });
      res.json(products);
    } catch {
      res.status(500).json({ error });
    }
  }

  //admin
  static async addProduct(req, res) {
    try {
      const newProduct = await new Product(req.body);
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch {
      res.status(500).json({ error });
    }
  }

  static async modifyProduct(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      console.log(product);
      res.status(200).send(product);
    } catch {
      res.status(500).json({ error });
    }
  }

  static async removeProduct(req, res) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      res.status(204).send(product);
    } catch {
      res.status(500).json({ error });
    }
  }
}

module.exports = ProductController;
