import React, { useState, useMemo, useEffect } from 'react';
import { Package } from 'lucide-react';
import { 
  mockProducts,
  mockWarehouses
} from '../types';
import type { Product, Warehouse, KPI, FilterStatus, DateRange, DashboardState, } from '../types';
import { useInventoryLogic } from '../hooks/useInventoryLogic';
import { useDebounce } from '../hooks/useDebounce';
import { DateRangeSelector } from '../components/dashboard/DateRangeSelector';
import { KPICards } from '../components/dashboard/KPICards';
import { TrendChart } from '../components/dashboard/TrendCharts';
import { Filters } from '../components/dashboard/Filters';
import { ProductsTable } from '../components/dashboard/ProductsTable';
import { ProductDrawer } from '../components/dashboard/Drawer';

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

  // Custom hooks
  const filterHook = useDashboardFilters(mockProducts);
  const { totalStock, totalDemand, fillRate, getProductStatus } = useInventoryLogic(filterHook.filteredProducts);
  
  // Generate KPI data based on selected range
  const kpiData = useMemo(() => generateKPIData(range), [range]);

  // Simulate loading for demo purposes
  const handleRangeChange = (newRange: DateRange) => {
    setLoading(true);
    setRange(newRange);
    
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b backdrop-blur-sm bg-opacity-95 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                SupplySight
              </h1>
            </div>
            <DateRangeSelector range={range} setRange={handleRangeChange} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Daily Inventory Dashboard</h2>
          <p className="text-gray-600">Monitor and manage your supply chain inventory in real-time</p>
        </div>

        {/* KPI Cards */}
        <KPICards 
          totalStock={totalStock}
          totalDemand={totalDemand} 
          fillRate={fillRate}
          loading={loading}
        />
        
        {/* Trend Chart */}
        <TrendChart 
          data={kpiData} 
          range={range}
          loading={loading}
        />
        
        {/* Filters */}
        <Filters
          search={filterHook.search}
          setSearch={filterHook.setSearch}
          warehouse={filterHook.warehouse}
          setWarehouse={filterHook.setWarehouse}
          status={filterHook.status}
          setStatus={filterHook.setStatus}
          warehouses={mockWarehouses}
        />
        
        {/* Products Table */}
        <ProductsTable
          products={filterHook.filteredProducts}
          getProductStatus={getProductStatus}
          onRowClick={setSelectedProduct}
          currentPage={filterHook.currentPage}
          setCurrentPage={filterHook.setCurrentPage}
          loading={loading}
        />
      </main>

      {/* Side Drawer */}
      {selectedProduct && (
        <ProductDrawer 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default SupplySightDashboard;