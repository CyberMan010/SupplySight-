import { gql } from '@apollo/client';
import type { Product, Warehouse, KPI } from '../types';

export const GET_PRODUCTS = gql`
  query GetProducts($search: String, $status: String, $warehouse: String) {
    products(search: $search, status: $status, warehouse: $warehouse) {
      id
      name
      sku
      warehouse
      stock
      demand
    }
  }
`;

export const GET_WAREHOUSES = gql`
  query GetWarehouses {
    warehouses {
      code
      name
      city
      country
    }
  }
`;

export const GET_KPIS = gql`
  query GetKPIs($range: String!) {
    kpis(range: $range) {
      date
      stock
      demand
    }
  }
`;

// Query result types
export interface GetProductsData {
  products: Product[];
}

export interface GetProductsVariables {
  search?: string;
  status?: string;
  warehouse?: string;
}

export interface GetWarehousesData {
  warehouses: Warehouse[];
}

export interface GetKPIsData {
  kpis: KPI[];
}

export interface GetKPIsVariables {
  range: string;
}


export const UPDATE_DEMAND_MUTATION = gql`
  mutation UpdateDemand($id: ID!, $demand: Int!) {
    updateDemand(id: $id, demand: $demand) {
      id
      name
      sku
      warehouse
      stock
      demand
    }
  }
`;

export const TRANSFER_STOCK_MUTATION = gql`
  mutation TransferStock($id: ID!, $from: String!, $to: String!, $qty: Int!) {
    transferStock(id: $id, from: $from, to: $to, qty: $qty) {
      id
      name
      sku
      warehouse
      stock
      demand
    }
  }
`;