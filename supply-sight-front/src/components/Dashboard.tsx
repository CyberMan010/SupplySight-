import React, { useState, useMemo, useEffect } from 'react';
import { BarChart3, Package, Settings } from 'lucide-react';
import { 
  mockProducts,
  mockWarehouses
} from '../types';
import type { Product, KPI, FilterStatus, DateRange, } from '../types';
import { useInventoryLogic } from '../hooks/useInventoryLogic';
import { useDebounce } from '../hooks/useDebounce';
import { DateRangeSelector } from '../components/dashboard/DateRangeSelector';
import { KPICards } from '../components/dashboard/KPICards';
import { TrendChart } from '../components/dashboard/TrendCharts';
import { Filters } from '../components/dashboard/Filters';
import { ProductsTable } from '../components/dashboard/ProductsTable';
import { ProductDrawer } from '../components/dashboard/Drawer';
import { KPICardsSkeleton, ChartSkeleton, TableSkeleton } from './ui/Skeleton';
import { useMutation, useQuery } from '@apollo/client/react';

import { 
  GET_PRODUCTS,
  UPDATE_DEMAND_MUTATION,
  TRANSFER_STOCK_MUTATION 
} from '../graphql/queries';

// Mock data generator for KPIs
const generateKPIData = (range: DateRange): KPI[] => {
  const days = range === '7d' ? 7 : range === '14d' ? 14 : 30;
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    stock: Math.floor(Math.random() * 100) + 200 + (i * 2),
    demand: Math.floor(Math.random() * 80) + 150 + (i * 1.5)
  }));
};

// Custom hook for managing dashboard filters
const useDashboardFilters = (products: Product[]) => {
  const [search, setSearch] = useState<string>('');
  const [warehouse, setWarehouse] = useState<string>('All');
  const [status, setStatus] = useState<FilterStatus>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // Debounce search to avoid excessive filtering
  const debouncedSearch = useDebounce(search, 300);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, warehouse, status]);

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    
    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.sku.toLowerCase().includes(searchLower) ||
        p.id.toLowerCase().includes(searchLower)
      );
    }
    
    if (warehouse !== 'All') {
      filtered = filtered.filter(p => p.warehouse === warehouse);
    }
    
    if (status !== 'All') {
      filtered = filtered.filter(p => {
        const stock = p.stock;
        const demand = p.demand;
        const productStatus = stock > demand ? 'Healthy' :
                             stock === demand ? 'Low' : 'Critical';
        return productStatus === status;
      });
    }
    
    return filtered;
  }, [products, debouncedSearch, warehouse, status]);

  return {
    search,
    setSearch,
    warehouse,
    setWarehouse,
    status,
    setStatus,
    currentPage,
    setCurrentPage,
    filteredProducts
  };
};

// Main Dashboard Component
const SupplySightDashboard: React.FC = () => {
  // State management
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [range, setRange] = useState<DateRange>('7d');
  const [loading, setLoading] = useState<boolean>(false);

  // GraphQL queries and mutations
  const { loading: productsLoading, data: productsData, refetch } = useQuery(GET_PRODUCTS, {
    variables: {
      search: '',  // Initial empty search
      status: 'All',  // Initial status
      warehouse: 'All'  // Initial warehouse
    },
    fetchPolicy: 'network-only'
  });

console.log('Loading:', productsLoading);
console.log('Data:', productsData);
// console.log('Error:', error);
  const [updateDemand] = useMutation(UPDATE_DEMAND_MUTATION, {
    onCompleted: () => {
      refetch();
      setSelectedProduct(null);
    }
  });

  const [transferStock] = useMutation(TRANSFER_STOCK_MUTATION, {
    onCompleted: () => {
      refetch();
      setSelectedProduct(null);
    }
  });

  // Get products from query data
  const products = productsData?.products || [];

  // Use real data with filters
  const filterHook = useDashboardFilters(products);

  // Custom hooks
  const { totalStock, totalDemand, fillRate, getProductStatus } = useInventoryLogic(filterHook.filteredProducts);
  
  // Generate KPI data based on selected range
  const kpiData = useMemo(() => generateKPIData(range), [range]);

  const handleUpdateDemand = async (id: string, demand: number) => {
    try {
      await updateDemand({
        variables: { id, demand }
      });
    } catch (error) {
      console.error('Error updating demand:', error);
    }
  };

  const handleTransferStock = async (id: string, from: string, to: string, qty: number) => {
    try {
      await transferStock({
        variables: { id, from, to, qty }
      });
    } catch (error) {
      console.error('Error transferring stock:', error);
    }
  };

  // Simulate loading for demo purposes
  const handleRangeChange = (newRange: DateRange) => {
    setLoading(true);
    setRange(newRange);
    
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  // Refetch when filters change
  useEffect(() => {
    refetch({
      status: filterHook.status,
      warehouse: filterHook.warehouse
    });
  }, [ filterHook.status, filterHook.warehouse, refetch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-500 bg-clip-text text-transparent">
                  SupplySight
                </h1>
                <p className="text-xs text-slate-500">Inventory Management</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <DateRangeSelector range={range} setRange={handleRangeChange} />
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 space-y-1">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800">Daily Inventory Dashboard</h2>
          </div>
          <p className="text-slate-500 ml-8">
            Real-time monitoring and management of your supply chain inventory
          </p>
        </div>

        {/* Analytics Section */}
        <div className="space-y-6">
          {/* KPI Cards with enhanced loading state */}
          <section>
            {loading ? <KPICardsSkeleton /> : (
              <KPICards 
                totalStock={totalStock}
                totalDemand={totalDemand} 
                fillRate={fillRate}
              />
            )}
          </section>
        
       {/* Trend Chart with enhanced loading state */}
          <section className="rounded-2xl bg-white border border-slate-200 shadow-sm">
            {loading ? <ChartSkeleton /> : (
              <TrendChart 
                data={kpiData} 
                range={range}
              />
            )}
          </section>
        
        {/* Filters */}
       <section className="sticky top-[4.5rem] z-30 pt-4 bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <Filters
              search={filterHook.search}
              setSearch={filterHook.setSearch}
              warehouse={filterHook.warehouse}
              setWarehouse={filterHook.setWarehouse}
              status={filterHook.status}
              setStatus={filterHook.setStatus}
              warehouses={mockWarehouses}
            />
          </section>
        
        {/* Products Table */}
         <section className="rounded-2xl overflow-hidden">
            {loading || productsLoading ? <TableSkeleton /> : (
              <ProductsTable
                 products={filterHook.filteredProducts}
                 getProductStatus={getProductStatus}
                 onRowClick={setSelectedProduct}
                 currentPage={filterHook.currentPage}
                 setCurrentPage={filterHook.setCurrentPage}
              />
            )}
          </section>
        </div>
      </main>

      {/* Side Drawer */}
       {selectedProduct && (
        <ProductDrawer 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
          onUpdateDemand={handleUpdateDemand}
          onTransferStock={handleTransferStock}
        />
      )}




       {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-slate-500">
            SupplySight Dashboard • {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SupplySightDashboard;