# SupplySight

SupplySight is a modern inventory management dashboard for supply chain teams, built with React, TypeScript, Vite, Apollo Client, and TailwindCSS. It provides real-time analytics, product management, and warehouse operations in a beautiful, responsive UI.

---

## 🚀 Features

- **Inventory Dashboard:** View KPIs, trends, and product status at a glance.
- **Product Table:** Paginated, searchable, and filterable product list.
- **Product Drawer:** Update demand, transfer stock, and view product details.
- **Warehouse Management:** Filter products by warehouse.
- **Trend Charts:** Visualize stock and demand over time.
- **Error Handling:** Robust error boundaries and loading skeletons.
- **GraphQL Backend:** Apollo Client integration for queries and mutations.
- **TypeScript:** Strict typing for reliability.
- **Responsive UI:** Built with TailwindCSS for fast, mobile-friendly design.
- **Mock Data:** Rapid prototyping with seeded sample data.

---

## 📦 Tech Stack

- **Frontend:** React 19, TypeScript, Vite, TailwindCSS
- **State/Data:** Apollo Client, GraphQL
- **Charts:** Recharts
- **Icons:** Lucide React
- **Linting:** ESLint (with recommended configs)
- **Backend:** Node.js, Apollo Server (mock data)

---

## 📝 Project Structure

```
SupplySight-/
  backend/
    data.js
    package.json
    resolvers.js
    schema.js
    server.js
  supply-sight-front/
    .env
    index.html
    package.json
    README.md
    NOTES.md
    tsconfig.*
    vite.config.ts
    public/
    src/
      App.tsx
      main.tsx
      assets/
      components/
      graphql/
      hooks/
      types/
      utils/
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```sh
git clone https://github.com/CyberMan010/SupplySight-.git
cd supply-sight-front
npm install
```

### Running the App

Start the backend GraphQL server:

```sh
cd ../backend
npm install
node server.js
```

Start the frontend:

```sh
cd ../supply-sight-front
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Environment Variables

Set the GraphQL endpoint in `.env`:

```
VITE_GRAPHQL_URI=http://localhost:4000/
```

### Building for Production

```sh
npm run build
```

### Linting

```sh
npm run lint
```

---

## 📊 Usage Tutorial

1. **Dashboard Overview:**  
   On launch, view KPIs (Total Stock, Total Demand, Fill Rate) and a trend chart for inventory.

2. **Filtering Products:**  
   Use the search bar, warehouse dropdown, and status filter to find products.

3. **Product Table:**  
   Click on any product row to open the side drawer for details.

4. **Product Drawer:**  
   - **Details Tab:** View stock, demand, SKU, warehouse, and utilization.
   - **Update Demand Tab:** Change demand forecast for a product.
   - **Transfer Stock Tab:** Move stock between warehouses.

5. **Error Handling:**  
   If something goes wrong, a friendly error boundary will prompt you to retry or reload.

---

## 💡 Decisions & Trade-offs

See [NOTES.md](NOTES.md) for more details:

- Mock data and a simple Node.js GraphQL backend for rapid prototyping.
- Apollo Client chosen for robust caching and error handling.
- UI/UX focused on clarity and responsiveness.
- Strict TypeScript typing for reliability.
- Error boundaries and loading skeletons for better user experience.
- No automated tests due to time constraints.

---

## 🧩 Improvements with More Time

- Replace mock backend with a real database and authentication.
- Add unit, integration, and E2E tests.
- Audit and improve accessibility (ARIA, keyboard navigation).
- Optimize queries, pagination, and bundle size.
- Add product CRUD, warehouse CRUD, user roles, notifications, and real-time updates.
- Refine design, add dark mode, and improve mobile experience.
- Expand API docs and developer guides.

---

## 📚 GraphQL API

See [backend/server.js](backend/server.js) for schema and mock data.

---

## 📝 License

MIT

---

## 🙏 Credits

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
-