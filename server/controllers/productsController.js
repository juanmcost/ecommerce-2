const Product = require('../models/Products');
const { joiProduct } = require('../utils/joi');
const defaultProfilePicture = 'https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg'

class ProductController {
    static async getAllProduct(req, res) {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static async getProduct(req, res) {
        try {
            const product = await Product.findById(req.params.id);
            res.json(product);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static async getProductByTitle(req, res) {
        try {
            const product = await Product.find({ title: req.params.title });
            res.json(product);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static async getProductLike(req, res) {
        try {
            const product = await Product.find({ title: { $regex: '.*' + req.params.title + '.*' } });
            res.json(product);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static async getTags(req, res) {
        try {
            const products = await Product.find({ category: { $in: [req.params.tag] } });
            res.json(products);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static async getAllReviews(req, res) {
        // const reviews = [];
        try {
            const product = await Product.findById( req.params.id );
            const reviews = product.reviews.map(e => { return {   
                    username: e.username,
                    review: e.review,
                    img: 'https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg',
                };
            });
            res.status(200).send( reviews );
        } catch (error) {
            res.status(500).json({ error });
        }
    }

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
        console.log(req.body)
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
    }

    //admin
    static async addProduct(req, res) {
        try {
            const newProduct = await new Product(req.body);
            const savedProduct = await newProduct.save();
            res.status(201).json(savedProduct);
        } catch (error) {
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
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static async removeProduct(req, res) {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            res.status(204).send(product);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}

module.exports = ProductController;
