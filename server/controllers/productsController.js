<<<<<<< HEAD
const Product = require('../models/Products');
const { joiProduct } = require('../utils/joi');

class ProductController {
    static async getAllProduct(req, res) {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error });
        }
=======
const Product = require("../models/Products");
<<<<<<< HEAD
=======
const { joiProduct } = require("../utils/joi");
>>>>>>> back

class ProductController {
  static async getAllProduct(req, res) {
    try {
<<<<<<< HEAD
      const products = await Product.find({ color: "Negro" });
      res.json(products);
    } catch {
=======
      const products = await Product.find();
      res.json(products);
    } catch (error) {
>>>>>>> back
      res.status(500).json({ error });
>>>>>>> main
    }

<<<<<<< HEAD
    static async getProduct(req, res) {
        try {
            const product = await Product.findById(req.params.id);
            res.json(product);
        } catch (error) {
            res.status(500).json({ error });
        }
=======
  static async getProduct(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      res.json(product);
<<<<<<< HEAD
    } catch {
      res.status(500).json({ error });
    }
  }
  //db.people.find({"name": {$regex:".*fis", $options:"i"}},{name:1})
  static async getProductTitle(req, res) {
    try {
      //const { title } = req.body;
      const product = await Product.find({ title: { $regex: ".*" + req.params.title + ".*" } });
      res.json(product);
    } catch {
=======
    } catch (error) {
      res.status(500).json({ error });
>>>>>>> main
    }

<<<<<<< HEAD
    static async getProductByTitle(req, res) {
        try {
            const product = await Product.find({ title: req.params.title });
            res.json(product);
        } catch (error) {
            res.status(500).json({ error });
        }
=======
  static async getProductTitle(req, res) {
    try {
      const product = await Product.find({ title: { $regex: ".*" + req.params.title + ".*" } });
      res.json(product);
    } catch (error) {
>>>>>>> back
      res.status(500).json({ error });
>>>>>>> main
    }

<<<<<<< HEAD
    static async getProductLike(req, res) {
        try {
            const product = await Product.find({ title: { $regex: '.*' + req.params.title + '.*' } });
            res.json(product);
        } catch (error) {
            res.status(500).json({ error });
        }
=======
  static async getTags(req, res) {
    try {
      const products = await Product.find({ category: { $in: [req.params.tag] } });
      res.json(products);
<<<<<<< HEAD
    } catch {
=======
    } catch (error) {
      res.status(500).json({ error });
>>>>>>> main
    }

    static async getTags(req, res) {
        try {
            const products = await Product.find({ category: { $in: [req.params.tag] } });
            res.json(products);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
<<<<<<< HEAD

    // user logueado
    static async addReview(req, res) {
        try {
            const { username, review } = req.body;
            const newReview = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    $push: {
                        reviews: {
                            $each: [{ username, review }],
                        },
                    },
                },
                { new: true }
            );
            res.status(200).send(newReview);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    //invalid request
    static async addAppreciation(req, res) {
        const appreciation = parseInt(req.body.appreciation);
        try {
            const { error } = joiProduct.validate({ appreciation });
            if (!error) {
                const newAppreciation = await Product.findByIdAndUpdate(
                    req.params.id,
                    {
                        $push: {
                            appreciation: {
                                $each: [appreciation],
                            },
                        },
                    },
                    { new: true }
                );
                return res.status(200).send(newAppreciation);
            }
            return res.status(400).json('Bad Request');
        } catch (error) {
            res.status(500).json({ error });
        }
=======
  }

  static async addAppreciation(req, res) {
    const appreciation = parseInt(req.body.appreciation);
    try {
      const { error } = joiProduct.validate({ appreciation });
      if (!error) {
        const newAppreciation = await Product.findByIdAndUpdate(
          req.params.id,
          {
            $push: {
              appreciation: {
                $each: [appreciation],
              },
            },
          },
          { new: true }
        );
        return res.status(200).send(newAppreciation);
      }
      return res.status(400).json("Bad Request");
    } catch (error) {
>>>>>>> back
      res.status(500).json({ error });
>>>>>>> main
    }

<<<<<<< HEAD
    //admin
    static async addProduct(req, res) {
        try {
            const newProduct = await new Product(req.body);
            const savedProduct = await newProduct.save();
            res.status(201).json(savedProduct);
        } catch (error) {
            res.status(500).json({ error });
        }
=======
  //admin
  static async addProduct(req, res) {
    try {
      const newProduct = await new Product(req.body);
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
<<<<<<< HEAD
    } catch {
=======
    } catch (error) {
>>>>>>> back
      res.status(500).json({ error });
>>>>>>> main
    }

<<<<<<< HEAD
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
        } catch (error) {
            res.status(500).json({ error });
        }
=======
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
<<<<<<< HEAD
    } catch {
=======
    } catch (error) {
>>>>>>> back
      res.status(500).json({ error });
>>>>>>> main
    }

<<<<<<< HEAD
    static async removeProduct(req, res) {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            res.status(204).send(product);
        } catch (error) {
            res.status(500).json({ error });
        }
=======
  static async removeProduct(req, res) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      res.status(204).send(product);
<<<<<<< HEAD
    } catch {
=======
    } catch (error) {
>>>>>>> back
      res.status(500).json({ error });
>>>>>>> main
    }
}

module.exports = ProductController;
