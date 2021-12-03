const Product = require('../models/Products');

class Category {
    static async addCategory(req, res) {
        try {
            const newCategory = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    $push: {
                        category: {
                            $each: [req.body.category],
                        },
                    },
                },
                { new: true }
            );
            return res.status(201).json(newCategory);
        } catch (error) {
            returnres.status(500).json({ error });
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
            return res.status(204).send(products);
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    static async editCategory(req, res) {
        const { category } = req.body;
        try {
            const product = await Product.updateMany(
                { category: { $in: [req.params.tag] } },
                { $set: { 'category.$': category } },
                { new: true }
            );
            return res.status(200).send(product);
        } catch (error) {
            return res.status(500).json({ error });
        }
    }
}

module.exports = Category;
