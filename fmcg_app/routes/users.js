const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = express.Router();

// user.js fileone
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the user.
 *           example: 612f8ec7461b953e2ab58b3c
 *         username:
 *           type: string
 *           description: The username of the user.
 *           example: john_doe
 *         role:
 *           type: string
 *           description: The role of the user (admin or regular user).
 *           example: admin
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users.
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (accessible only to admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns an array of users (with password excluded).
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Unauthorized. Only admin users can access this endpoint.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a specific user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *           description: The ID of the user to fetch.
 *         example: 612f8ec7461b953e2ab58b3c
 *     responses:
 *       200:
 *         description: Returns the user (with password excluded).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       403:
 *         description: Unauthorized. Only admin users can access this endpoint.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

// Add other endpoint documentation as needed

// ---------------------------------------
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
 *         name:
 *           type: string
 *           description: The name of the product.
 *         category:
 *           type: string
 *           description: The category of the product.
 *         price:
 *           type: number
 *           description: The price of the product.
 *       example:
 *         _id: 612e360f887e2c23a45a47d9
 *         name: Product 1
 *         category: Electronics
 *         price: 999
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for managing products.
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination (default: 1).
 *         required: false
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         description: Number of items per page (default: 10).
 *         required: false
 *         schema:
 *           type: integer
 *       - name: category
 *         in: query
 *         description: Filter products by category.
 *         required: false
 *         schema:
 *           type: string
 *       - name: price_band
 *         in: query
 *         description: Filter products by price range (e.g., 10-50).
 *         required: false
 *         schema:
 *           type: string
 *       - name: name
 *         in: query
 *         description: Search products by name (case-insensitive).
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '500':
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
 *                 example: Product 2
 *               category:
 *                 type: string
 *                 description: The category of the product.
 *                 example: Books
 *               price:
 *                 type: number
 *                 description: The price of the product.
 *                 example: 19.99
 *             required:
 *               - name
 *               - category
 *               - price
 *     responses:
 *       '201':
 *         description: The created product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '401':
 *         description: Unauthorized. No valid token provided.
 *       '403':
 *         description: Forbidden. Accessible only to admin.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a specific product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product to get.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The product with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '404':
 *         description: Product not found.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product (accessible only to admin)
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product to update.
 *         required: true
 *         schema:
 *           type: string
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
 *                 example: Updated Product
 *               category:
 *                 type: string
 *                 description: The category of the product.
 *                 example: Electronics
 *               price:
 *                 type: number
 *                 description: The price of the product.
 *                 example: 149.99
 *     responses:
 *       '200':
 *         description: The updated product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '401':
 *         description: Unauthorized. No valid token provided.
 *       '403':
 *         description: Forbidden. Accessible only to admin.
 *       '404':
 *         description: Product not found.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product (accessible only to admin)
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product to delete.
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Product deleted successfully.
 *       '401':
 *         description: Unauthorized. No valid token provided.
 *       '403':
 *         description: Forbidden. Accessible only to admin.
 *       '404':
 *         description: Product not found.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Search products by name
 *     tags: [Products]
 *     parameters:
 *       - name: name
 *         in: query
 *         description: Name of the product to search for.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of products matching the search query.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/products/sort:
 *   get:
 *     summary: Sorting products by name or price
 *     tags: [Products]
 *     parameters:
 *       - name: sortBy
 *         in: query
 *         description: Sort the products by name or price. (Values: 'name' or 'price')
 *         required: true
 *         schema:
 *           type: string
 *           enum: [name, price]
 *       - name: order
 *         in: query
 *         description: Sort order. (Values: 'asc' or 'desc')
 *         required: false
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       '200':
 *         description: A list of sorted products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Bad request. Invalid sortBy parameter.
 *       '500':
 *         description: Internal server error.
 */



// Get all users (accessible only to admin)
// auth
router.get('/', async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const users = await User.find({}, { password: 0 }); // Exclude password from the response
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Other CRUD routes for users (create, update, delete) can be implemented here
router.get('/:id', auth, async (req, res) => {
    try {
      const user = await User.findById(req.params.id, { password: 0 });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Update a user (accessible only to admin)
  router.put('/:id', auth, async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      const { username, role } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { username, role },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(updatedUser);
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Delete a user (accessible only to admin)
  router.delete('/:id', auth, async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      const deletedUser = await User.findByIdAndDelete(req.params.id);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Search users by username
router.get('/search', auth, async (req, res) => {
    try {
      if (!req.query.username) {
        return res.status(400).json({ message: 'Missing search parameter: username' });
      }
  
      const users = await User.find({ username: { $regex: req.query.username, $options: 'i' } }, { password: 0 });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Sorting users by username or role
  router.get('/sort', auth, async (req, res) => {
    try {
      if (!req.query.sortBy || !['username', 'role'].includes(req.query.sortBy)) {
        return res.status(400).json({ message: 'Invalid sortBy parameter' });
      }
  
      const sortBy = req.query.sortBy;
      const sortOrder = req.query.order === 'desc' ? -1 : 1;
  
      const users = await User.find({}, { password: 0 }).sort({ [sortBy]: sortOrder });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
module.exports = router;
