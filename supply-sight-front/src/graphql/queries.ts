import { gql } from '@apollo/client';

// Enhanced Product fragment
export const PRODUCT_FRAGMENT = gql`
  fragment ProductFragment on Product {
    id
    name
    sku
    warehouse
    stock
    demand
  }
`;

// Enhanced Warehouse fragment
export const WAREHOUSE_FRAGMENT = gql`
  fragment WarehouseFragment on Warehouse {
    code
    name
    city
    country
  }
`;

// Enhanced KPI fragment
export const KPI_FRAGMENT = gql`
  fragment KPIFragment on KPI {
    date
    stock
    demand
  }
`;

// Enhanced Queries
export const GET_PRODUCTS = gql`
  ${PRODUCT_FRAGMENT}
  query GetProducts($search: String, $status: String, $warehouse: String) {
    products(search: $search, status: $status, warehouse: $warehouse) {
      ...ProductFragment
    }
  }
`;

export const GET_WAREHOUSES = gql`
  ${WAREHOUSE_FRAGMENT}
  query GetWarehouses {
    warehouses {
      ...WarehouseFragment
    }
  }
`;

export const GET_KPIS = gql`
  ${KPI_FRAGMENT}
  query GetKPIs($range: String!) {
    kpis(range: $range) {
      ...KPIFragment
    }
  }
`;

// Enhanced Mutations
export const UPDATE_DEMAND_MUTATION = gql`
  ${PRODUCT_FRAGMENT}
  mutation UpdateDemand($id: ID!, $demand: Int!) {
    updateDemand(id: $id, demand: $demand) {
      ...ProductFragment
    }
  }
`;

export const TRANSFER_STOCK_MUTATION = gql`
  ${PRODUCT_FRAGMENT}
  mutation TransferStock($id: ID!, $from: String!, $to: String!, $qty: Int!) {
    transferStock(id: $id, from: $from, to: $to, qty: $qty) {
      ...ProductFragment
    }
  }
`;