const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} = require("graphql");

const productType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
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
  }),
});

module.exports = productType;
