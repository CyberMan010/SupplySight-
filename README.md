# SupplySight Frontend

SupplySight is a modern inventory management dashboard built with React, TypeScript, Vite, Apollo Client, and TailwindCSS. It provides real-time analytics, product management, and warehouse operations for supply chain teams.

## Features

- **Inventory Dashboard:** View KPIs, trends, and product status at a glance.
- **Product Table:** Paginated, searchable, and filterable product list.
- **Product Drawer:** Update demand, transfer stock, and view product details.
- **Warehouse Management:** Filter products by warehouse.
- **Trend Charts:** Visualize stock and demand over time.
- **Error Handling:** Robust error boundaries and loading skeletons.
- **GraphQL Backend:** Apollo Client integration for queries and mutations.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, TailwindCSS
- **State/Data:** Apollo Client, GraphQL
- **Charts:** Recharts
- **Icons:** Lucide React
- **Linting:** ESLint (with recommended configs)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```sh
git clone https://github.com/your-org/supply-sight.git
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

## Project Structure

```
supply-sight-front/
  src/
    components/
    hooks/
    graphql/
    types/
    utils/
    assets/
    App.tsx
    main.tsx
  public/
  index.html
  package.json
  README.md
  NOTES.md
backend/
  server.js
  package.json
```

## GraphQL API

See [backend/server.js](../backend/server.js) for schema and mock data.

## License

MIT

## Credits

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [TailwindCSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)