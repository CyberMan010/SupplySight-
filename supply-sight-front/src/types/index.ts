export interface Warehouse {
  code: string;
  name: string;
  city: string;
  country: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  warehouse: string;
  stock: number;
  demand: number;
  price?: number;
  category?: string;
  description?: string;
  image?: string;
}

export interface KPI {
  date: string;
  stock: number;
  demand: number;
}

export type ProductStatus = 'Healthy' | 'Low' | 'Critical';
export type FilterStatus = 'All' | ProductStatus;
export type DateRange = '7d' | '14d' | '30d';

export interface InventoryCalculations {
  totalStock: number;
  totalDemand: number;
  fillRate: number;
  getProductStatus: (product: Product) => ProductStatus;
}

// GraphQL Types
export interface ProductsQueryVariables {
  search?: string;
  status?: string;
  warehouse?: string;
}

export interface UpdateDemandMutation {
  id: string;
  demand: number;
}

export interface TransferStockMutation {
  id: string;
  from: string;
  to: string;
  qty: number;
}

// Component Props Types
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export interface StatusPillProps {
  status: ProductStatus;
}

export interface KPICardsProps {
  totalStock: number;
  totalDemand: number;
  fillRate: number;
  loading?: boolean;
}

export interface TrendChartProps {
  data: KPI[];
  range: DateRange;
  loading?: boolean;
}

export interface FiltersProps {
  search: string;
  setSearch: (search: string) => void;
  warehouse: string;
  setWarehouse: (warehouse: string) => void;
  status: FilterStatus;
  setStatus: (status: FilterStatus) => void;
  warehouses: Warehouse[];
}

export interface ProductsTableProps {
  products: Product[];
  getProductStatus: (product: Product) => ProductStatus;
  onRowClick: (product: Product) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  loading?: boolean;
}

export interface ProductDrawerProps {
  product: Product;
  onClose: () => void;
}

export interface DateRangeSelectorProps {
  range: DateRange;
  setRange: (range: DateRange) => void;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
}

// Hook Types
export interface UseInventoryLogicReturn extends InventoryCalculations {}

export interface UseProductFiltersReturn {
  filteredProducts: Product[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  warehouseFilter: string;
  setWarehouseFilter: (warehouse: string) => void;
  statusFilter: FilterStatus;
  setStatusFilter: (status: FilterStatus) => void;
}

// Form Types
export interface UpdateDemandForm {
  demand: number;
}

export interface TransferStockForm {
  quantity: number;
  toWarehouse: string;
}

// API Response Types
export interface ProductsResponse {
  products: Product[];
}

export interface WarehousesResponse {
  warehouses: Warehouse[];
}

export interface KPIsResponse {
  kpis: KPI[];
}

export interface MutationResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Dashboard State Types
export interface DashboardState {
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
    warehouse: string;
    status: FilterStatus;
    dateRange: DateRange;
  };
  pagination: {
    currentPage: number;
    itemsPerPage: number;
  };
}

// Utils Types
export interface FormatNumberOptions {
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export interface DateFormatOptions {
  format?: 'short' | 'long' | 'numeric';
  locale?: string;
}

// Chart Data Types
export interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    color: string;
    dataKey: string;
    name: string;
    value: number;
  }>;
  label?: string;
}

export interface ChartDataPoint extends KPI {
  formattedDate?: string;
}

// Error Types
export interface APIError {
  message: string;
  code?: string;
  field?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

// Constants Types
export const PRODUCT_STATUS_CONFIG: Record<ProductStatus, {
  color: string;
  bgColor: string;
  textColor: string;
  dotColor: string;
}> = {
  Healthy: {
    color: 'text-green-800',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    dotColor: 'bg-green-400'
  },
  Low: {
    color: 'text-yellow-800',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    dotColor: 'bg-yellow-400'
  },
  Critical: {
    color: 'text-red-800',
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
    dotColor: 'bg-red-400'
  }
};

export const DATE_RANGES: Array<{value: DateRange; label: string}> = [
  { value: '7d', label: '7 Days' },
  { value: '14d', label: '14 Days' },
  { value: '30d', label: '30 Days' }
];

export const ITEMS_PER_PAGE = 10;

// Mock Data with proper typing
export const mockProducts: Product[] = [
  { id: "P-1001", name: "12mm Hex Bolt", sku: "HEX-12-100", warehouse: "BLR-A", stock: 180, demand: 120 },
  { id: "P-1002", name: "Steel Washer", sku: "WSR-08-500", warehouse: "BLR-A", stock: 50, demand: 80 },
  { id: "P-1003", name: "M8 Nut", sku: "NUT-08-200", warehouse: "PNQ-C", stock: 80, demand: 80 },
  { id: "P-1004", name: "Bearing 608ZZ", sku: "BRG-608-50", warehouse: "DEL-B", stock: 24, demand: 120 },
  { id: "P-1005", name: "Stainless Bolt", sku: "SSB-10-150", warehouse: "BLR-A", stock: 200, demand: 90 },
  { id: "P-1006", name: "Rubber Gasket", sku: "RGS-06-300", warehouse: "PNQ-C", stock: 45, demand: 60 },
  { id: "P-1007", name: "Copper Wire", sku: "CWR-12-500", warehouse: "DEL-B", stock: 150, demand: 150 },
  { id: "P-1008", name: "Aluminum Pipe", sku: "ALP-25-200", warehouse: "BLR-A", stock: 30, demand: 85 },
];

export const mockWarehouses: Warehouse[] = [
  { code: "BLR-A", name: "Bangalore A", city: "Bangalore", country: "India" },
  { code: "PNQ-C", name: "Pune C", city: "Pune", country: "India" },
  { code: "DEL-B", name: "Delhi B", city: "Delhi", country: "India" }
];

// GraphQL Queries and Mutations 
export const GET_PRODUCTS = `
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

export const GET_WAREHOUSES = `
  query GetWarehouses {
    warehouses {
      code
      name
      city
      country
    }
  }
`;

export const GET_KPIS = `
  query GetKPIs($range: String!) {
    kpis(range: $range) {
      date
      stock
      demand
    }
  }
`;

export const UPDATE_DEMAND_MUTATION = `
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

export const TRANSFER_STOCK_MUTATION = `
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




// Query result types
export interface GetProductsQuery {
  products: Product[];
}

export interface GetProductsQueryVariables {
  search?: string;
  status?: string;
  warehouse?: string;
}

export interface GetWarehousesQuery {
  warehouses: Warehouse[];
}

export interface GetKPIsQuery {
  kpis: KPI[];
}

export interface GetKPIsQueryVariables {
  range: string;
}

// Mutation types
export interface UpdateDemandMutation {
  updateDemand: Product;
}

export interface UpdateDemandMutationVariables {
  id: string;
  demand: number;
}

export interface TransferStockMutation {
  transferStock: Product;
}

export interface TransferStockMutationVariables {
  id: string;
  from: string;
  to: string;
  qty: number;
}