import { useMemo } from 'react';
import type { Product, ProductStatus, UseInventoryLogicReturn } from '../types';

export const useInventoryLogic = (products: Product[]): UseInventoryLogicReturn => {
  return useMemo(() => {
    if (!products?.length) {
      return { 
        totalStock: 0, 
        totalDemand: 0, 
        fillRate: 0, 
        getProductStatus: () => 'Critical' as ProductStatus 
      };
    }
    
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
    const totalDemand = products.reduce((sum, p) => sum + p.demand, 0);
    const totalFulfilled = products.reduce((sum, p) => sum + Math.min(p.stock, p.demand), 0);
    const fillRate = totalDemand > 0 ? (totalFulfilled / totalDemand) * 100 : 0;
    
    const getProductStatus = (product: Product): ProductStatus => {
      if (product.stock > product.demand) return 'Healthy';
      if (product.stock === product.demand) return 'Low';
      return 'Critical';
    };
    
    return { totalStock, totalDemand, fillRate, getProductStatus };
  }, [products]);
};