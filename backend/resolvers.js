const { v4: uuidv4 } = require('uuid');
const { products, warehouses } = require("./data");
const newId = uuidv4();

const resolvers = {
  Query: {
    products: (_, { search, status, warehouse }) => {
      console.log('Query received:', { search, status, warehouse }); 
      let result = products;
      
      if (search) {
        result = result.filter(p => 
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.sku.toLowerCase().includes(search.toLowerCase()) ||
          p.id.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (warehouse && warehouse !== 'All') {
        result = result.filter(p => p.warehouse === warehouse);
      }

      if (status && status !== 'All') {
        result = result.filter(p => {
          if (status === 'Healthy') return p.stock > p.demand;
          if (status === 'Low') return p.stock === p.demand;
          if (status === 'Critical') return p.stock < p.demand;
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
      // Generate a new unique id for the target product
      const newId = `${id}-${to}-${Date.now()}`; // Or use uuidv4()
      targetProduct = { ...product, id: newId, warehouse: to, stock: 0 };
      products.push(targetProduct);
    }
    targetProduct.stock += qty;

      return product;
    }
  }
};


module.exports = resolvers;