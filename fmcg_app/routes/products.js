const express = require('express');
const Product = require('../models/product');
const auth = require('../middleware/auth');

const router = express.Router();





/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the product.
 *           example: 612f8ec7461b953e2ab58b3c
 *         name:
 *           type: string
 *           description: The name of the product.
 *           example: Product A
 *         category:
 *           type: string
 *           description: The category of the product.
 *           example: Electronics
 *         price:
 *           type: number
 *           description: The price of the product.
 *           example: 29.99
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for managing products.
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           description: The page number for pagination (default is 1).
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           description: The maximum number of products to return per page (default is 10).
 *           example: 10
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           description: Filter products by category (optional).
 *           example: Electronics
 *       - in: query
 *         name: price_band
 *         schema:
 *           type: string
 *           description: Filter products by price band (e.g., 10-30 for products with price between 10 and 30).
 *           example: 10-30
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *           description: Search products by name (case-insensitive) (optional).
 *           example: Product A
 *     responses:
 *       200:
 *         description: Returns an array of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product (accessible only to admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product.
 *                 example: Product A
 *               category:
 *                 type: string
 *                 description: The category of the product.
 *                 example: Electronics
 *               price:
 *                 type: number
 *                 description: The price of the product.
 *                 example: 29.99
 *     responses:
 *       201:
 *         description: Returns the newly created product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request (e.g., missing required fields).
 *       403:
 *         description: Unauthorized. Only admin users can access this endpoint.
 *       500:
 *         description: Internal server error.
 */







// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Pagination options
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Filtering options
    const { category, price_band, name } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (price_band) {
      const [min, max] = price_band.split('-');
      filter.price = { $gte: min, $lte: max };
    }
    if (name) filter.name = new RegExp(name, 'i'); // Case-insensitive search for name

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// @route   POST /api/products
// @desc    Create a new product (accessible only to admin)
// @access  Private (requires token)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { name, category, price } = req.body;
    const newProduct = new Product({ name, category, price });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

// @route   GET /api/products/:id
// @desc    Get a specific product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product (accessible only to admin)
// @access  Private (requires token)
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { name, category, price } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, category, price },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product (accessible only to admin)
// @access  Private (requires token)
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// @route   GET /api/products/search
// @desc    Search products by name
// @access  Public
router.get('/search', async (req, res) => {
  try {
    if (!req.query.name) {
      return res.status(400).json({ message: 'Missing search parameter: name' });
    }

    const products = await Product.find({ name: { $regex: req.query.name, $options: 'i' } });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// @route   GET /api/products/sort
// @desc    Sorting products by name or price
// @access  Public
router.get('/sort', async (req, res) => {
  try {
    if (!req.query.sortBy || !['name', 'price'].includes(req.query.sortBy)) {
      return res.status(400).json({ message: 'Invalid sortBy parameter' });
    }

    const sortBy = req.query.sortBy;
    const sortOrder = req.query.order === 'desc' ? -1 : 1;

    const products = await Product.find({}).sort({ [sortBy]: sortOrder });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
