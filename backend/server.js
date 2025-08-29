const { ApolloServer, gql } = require("apollo-server");

// schema
const typeDefs = gql`
  type Warehouse {
    code: ID!
    name: String!
    city: String!
    country: String!
  }

  type Product {
    id: ID!
    name: String!
    sku: String!
    warehouse: String!
    stock: Int!
    demand: Int!
  }

  type KPI {
    date: String!
    stock: Int!
    demand: Int!
  }

  type Query {
    products(search: String, status: String, warehouse: String): [Product!]!
    warehouses: [Warehouse!]!
    kpis(range: String!): [KPI!]!
  }

  type Mutation {
    updateDemand(id: ID!, demand: Int!): Product!
    transferStock(id: ID!, from: String!, to: String!, qty: Int!): Product!
  }
`;

// 1. Seed sample data
let products = [
  { id: "P-1001", name: "12mm Hex Bolt", sku: "HEX-12-100", warehouse: "BLR-A", stock: 180, demand: 120 },
  { id: "P-1002", name: "Steel Washer", sku: "WSR-08-500", warehouse: "BLR-A", stock: 50, demand: 80 },
  { id: "P-1003", name: "M8 Nut", sku: "NUT-08-200", warehouse: "PNQ-C", stock: 80, demand: 80 },
  { id: "P-1004", name: "Bearing 608ZZ", sku: "BRG-608-50", warehouse: "DEL-B", stock: 24, demand: 120 }
];

let warehouses = [
  { code: "BLR-A", name: "Bangalore A", city: "Bangalore", country: "India" },
  { code: "PNQ-C", name: "Pune C", city: "Pune", country: "India" },
  { code: "DEL-B", name: "Delhi B", city: "Delhi", country: "India" }
];

// 2. Resolvers = logic
const resolvers = {
  Query: {
    products: (_, { search, status, warehouse }) => {
      let result = products;

      if (search) {
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.sku.toLowerCase().includes(search.toLowerCase()) ||
            p.id.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (warehouse) {
        result = result.filter((p) => p.warehouse === warehouse);
      }

      if (status) {
        result = result.filter((p) => {
          if (status === "Healthy") return p.stock > p.demand;
          if (status === "Low") return p.stock === p.demand;
          if (status === "Critical") return p.stock < p.demand;
          return true;
        });
      }

      return result;
    },

    warehouses: () => warehouses,

    kpis: (_, { range }) => {
      // mock KPI trend data
      const days = range === "7d" ? 7 : range === "14d" ? 14 : 30;
      const today = new Date();

      return Array.from({ length: days }).map((_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        return {
          date: date.toISOString().split("T")[0],
          stock: products.reduce((sum, p) => sum + p.stock, 0),
          demand: products.reduce((sum, p) => sum + p.demand, 0)
        };
      }).reverse();
    }
  },

  Mutation: {
    updateDemand: (_, { id, demand }) => {
      const product = products.find((p) => p.id === id);
      if (!product) throw new Error("Product not found");
      product.demand = demand;
      return product;
    },

    transferStock: (_, { id, from, to, qty }) => {
      const product = products.find((p) => p.id === id && p.warehouse === from);
      if (!product) throw new Error("Product not found in source warehouse");
      if (product.stock < qty) throw new Error("Not enough stock");

      // Deduct from source
      product.stock -= qty;

      // Add to target (or create if doesn't exist)
      let targetProduct = products.find((p) => p.id === id && p.warehouse === to);
      if (!targetProduct) {
        targetProduct = { ...product, warehouse: to, stock: 0 };
        products.push(targetProduct);
      }
      targetProduct.stock += qty;

      return product;
    }
  }
};


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Mock GraphQL server ready at ${url}`);
});
