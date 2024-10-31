const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} = require("graphql");

const orderType = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    id: { type: GraphQLString },
    userId: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    address: { type: GraphQLString },
    city: { type: GraphQLString },
    country: { type: GraphQLString },
    zipCode: { type: GraphQLString },
    totalAmount: { type: GraphQLFloat },
    items: { type: GraphQLString },
  }),
});

module.exports = orderType;
