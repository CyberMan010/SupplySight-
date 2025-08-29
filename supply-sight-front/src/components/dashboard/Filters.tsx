import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Card } from '../ui/Card';
import type { FiltersProps } from '../../types';

export const Filters: React.FC<FiltersProps> = ({ 
  search, 
  setSearch, 
  warehouse, 
  setWarehouse, 
  status, 
  setStatus, 
  warehouses 
}) => {
  return (
    <Card className="mb-6 bg-gradient-to-r from-gray-50 to-white">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by product name, SKU, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>
        
        {/* Warehouse Filter */}
        <div className="relative">
          <select
            value={warehouse}
            onChange={(e) => setWarehouse(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-w-[160px]"
          >
            <option value="All">All Warehouses</option>
            {warehouses.map(w => (
              <option key={w.code} value={w.code}>{w.name}</option>
            ))}
          </select>
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
        
        {/* Status Filter */}
        <div className="relative">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-w-[140px]"
          >
            <option value="All">All Status</option>
            <option value="Healthy">Healthy</option>
            <option value="Low">Low Stock</option>
            <option value="Critical">Critical</option>
          </select>
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>
    </Card>
  );
};