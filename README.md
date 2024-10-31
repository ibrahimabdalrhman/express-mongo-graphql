# express-mongo-graphql 

express-mongo-graphql   is a simple backend application designed to help developers learn how to integrate **GraphQL** with **Express.js** and **MongoDB**. This project serves as an educational resource, providing a clear example of how to build a GraphQL API that supports basic operations such as querying and mutating data. It offers hands-on experience with concepts like schema design, resolvers, and MongoDB interactions, making it an ideal starting point for those looking to understand GraphQL in a practical context.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [GraphQL Schema](#graphql-schema)
  - [Queries](#queries)
  - [Mutations](#mutations)
- [Dependencies](#dependencies)

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/GraphCommerce-API.git
2. **Navigate to the project directory**

   ```bash
   cd GraphCommerce-API
3. **Install dependencies:**

   ```bash
   npm install
4. **Set up environment variables:**

   - Create a file named `.env` in the root directory of your project.
   - Add the following variables to the `.env` file:

     ```env
     MONGO_URI=your_mongodb_uri
     JWT_SECRET_KEY=your_jwt_secret_key
     PORT=4000
     ```

   - Make sure to replace `your_mongodb_uri` with your actual MongoDB connection string and `your_jwt_secret_key` with a secure key of your choice.

## Configuration

Ensure that MongoDB is running locally or via a cloud service. Verify that your `.env` file is configured with the correct MongoDB URI and JWT secret key.

## Usage

To start the application, use the following command:

```bash
npm start
```

The server will start by default on [http://localhost:4000/graphql](http://localhost:4000/graphql), where you can interact with the API using the GraphiQL interface.

## GraphQL Schema

### Queries

- **getAllProduct**  
  Retrieves a list of all products.

- **getProduct (id: ID!)**  
  Retrieves details of a specific product by ID.

- **getAllOrder (userId: ID!)**  
  Retrieves all orders associated with a specific user.

### Mutations

- **createProduct**  
  Adds a new product with details like title, description, category, and more.

- **updateProduct (id: ID!)**  
  Updates details of an existing product by ID.

- **deleteProduct (id: ID!)**  
  Deletes a product by its ID.

- **createOrder**  
  Creates a new order with user and order details.

- **createUser**  
  Registers a new user with a hashed password for security.

- **login**  
  Authenticates a user by email and password, returning a JWT token upon successful login.

## Dependencies

- **bcrypt**: For password hashing.
- **dotenv**: To manage environment variables.
- **express**: Web server framework.
- **express-graphql**: Middleware for integrating GraphQL with Express.
- **graphql**: GraphQL library.
- **jsonwebtoken**: For JWT-based authentication.
- **mongoose**: MongoDB object modeling.
- **nodemon**: Automatically restarts the server for development.



