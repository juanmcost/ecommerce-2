const Product = require("../models/Products");

class Category {
  static async addCategory(req, res) {
    try {
      const newCategory = await new Product(req.body);
      const savedCategory = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch {
      res.status(500).json({ error });
    }
  }

  static async removeCategory(req, res) {
    const { category } = req.body;
    try {
      const products = await Product.updateMany(
        { category: { $in: [category] } },
        { $pull: { category } },
        { multi: true }
      );
      res.status(204).send(products);
    } catch {
      res.status(500).json({ error });
    }
  }
}

module.exports = Category;
