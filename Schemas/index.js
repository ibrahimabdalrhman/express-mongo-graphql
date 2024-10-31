const graphql = require("graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
} = graphql;
const bcrypt = require("bcrypt");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const User = require("../models/userModel");

const ProductType = require("./TypeDefs/ProductType");
const UserType = require("./TypeDefs/UserType");
const OrderType = require("./TypeDefs/orderType");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllProduct: {
      type: new GraphQLList(ProductType),
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        const productList = await Product.find();
        return productList;
      },
    },

    getProduct: {
      type: ProductType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        const product = await Product.findById(args.id);
        return product;
      },
    },

    getAllOrder: {
      type: new GraphQLList(OrderType),
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        const orderList = await Order.find({ userId: args.userId });
        return orderList;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    //Product mutations
    createProduct: {
      type: ProductType,
      args: {
        brand: { type: GraphQLString },
        category: { type: GraphQLString },
        description: { type: GraphQLString },
        discountPercentage: { type: GraphQLFloat },
        images: { type: GraphQLString },
        price: { type: GraphQLFloat },
        rating: { type: GraphQLFloat },
        stock: { type: GraphQLInt },
        thumbnail: { type: GraphQLString },
        title: { type: GraphQLString },
      },
      async resolve(parent, args, req) {
        const newProduct = new Product({
          title: args.title,
          brand: args.brand,
          category: args.category,
          description: args.description,
          discountPercentage: args.discountPercentage,
          images: args.images,
          price: args.price,
          rating: args.rating,
          stock: args.stock,
          thumbnail: args.thumbnail,
        });

        await newProduct.save();

        return newProduct;
      },
    },

    updateProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLString },
        brand: { type: GraphQLString },
        category: { type: GraphQLString },
        description: { type: GraphQLString },
        discountPercentage: { type: GraphQLFloat },
        images: { type: GraphQLString },
        price: { type: GraphQLFloat },
        rating: { type: GraphQLFloat },
        stock: { type: GraphQLInt },
        thumbnail: { type: GraphQLString },
        title: { type: GraphQLString },
      },
      async resolve(parent, args, req) {
        const newProduct = await Product.findByIdAndUpdate(args.id, {
          brand: args.brand,
          category: args.category,
          description: args.description,
          discountPercentage: args.discountPercentage,
          images: args.images,
          price: args.price,
          rating: args.rating,
          stock: args.stock,
          thumbnail: args.thumbnail,
          title: args.title,
        });

        return newProduct;
      },
    },

    deleteProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLString },
      },
      async resolve(parent, args) {
        console.log(args.id);

        const deletedProduct = await Product.findByIdAndDelete(args.id);

        return args;
      },
    },

    //order mutation
    createOrder: {
      type: OrderType,
      args: {
        userId: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        address: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        zipCode: { type: GraphQLString },
        totalAmount: { type: GraphQLFloat },
        items: { type: GraphQLString },
      },
      async resolve(parent, args) {
        console.log(args); // This will log the arguments received
        const newOrder = await Order.create({
          userId: args.userId,
          firstName: args.firstName,
          lastName: args.lastName,
          address: args.address,
          city: args.city,
          country: args.country,
          zipCode: args.zipCode,
          totalAmount: args.totalAmount,
          items: args.items,
        });
        return newOrder;
      },
    },

    //user mutation
    createUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        isAdmin: { type: graphql.GraphQLBoolean },
      },
      async resolve(parent, args) {
        console.log(args);

        const newUser = new User({
          username: args.username,
          email: args.email,
          password: args.password,
          isAdmin: args.isAdmin,
        });
        const user = await User.findOne({ email: args.email });
        console.log(user);

        if (user) {
          throw new Error("Already Created");
        }
        newUser.password = await bcrypt.hash(newUser.password, 12);
        await newUser.save();

        return newUser;
      },
    },
    login: {
      type: GraphQLString,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const user = await User.findOne({ email: args.email });
        if (!user) {
          throw new Error("incorrect email or password");
        }
        if (!(await bcrypt.compare(args.password, user.password))) {
          throw new Error("incorrect email or password");
        }

        return user.generateToken();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation, //add mutations here
});
