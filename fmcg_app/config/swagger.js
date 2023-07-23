const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FMCG App API',
      version: '1.0.0',
      description: 'API for the FMCG commercial app',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};









// ---------------------------------------
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
//--------------------------------------
//product.js


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

// Add other endpoint documentation as needed




module.exports = swaggerJsdoc(options);


