// components/dashboard/ProductDrawer.tsx
import React, { useState } from 'react';
import { X, Package, Edit2, ArrowRightLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import {  mockWarehouses  } from '../../types';
import type { ProductDrawerProps,  UpdateDemandForm, TransferStockForm } from '../../types';
import { validateUpdateDemand, validateTransferStock } from '../../utils/validation';
import { formatNumber, formatPercentage } from '../../utils/formatters';

type DrawerTab = 'details' | 'demand' | 'transfer';

export const ProductDrawer: React.FC<ProductDrawerProps> = ({ 
  product, 
  onClose,
  onUpdateDemand,
  onTransferStock
}) => {
  const [activeTab, setActiveTab] = useState<DrawerTab>('details');
  const [isClosing, setIsClosing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [updateDemandForm, setUpdateDemandForm] = useState<UpdateDemandForm>({
    demand: product.demand
  });
  const [transferStockForm, setTransferStockForm] = useState<TransferStockForm>({
    quantity: 0,
    toWarehouse: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});



  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); 
  };


  


  const handleUpdateDemand = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateUpdateDemand(updateDemandForm);
    
    if (validationErrors.length > 0) {
      const errorMap = validationErrors.reduce((acc, error) => ({
        ...acc,
        [error.field]: error.message
      }), {});
      setErrors(errorMap);
      return;
    }
    
    setErrors({});
    try {
      await onUpdateDemand(product.id, updateDemandForm.demand);
    } catch (error) {
      setErrors({ demand: 'Failed to update demand. Please try again.' });
    }
  };

  const handleTransferStock = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateTransferStock(transferStockForm, product);
    
    if (validationErrors.length > 0) {
      const errorMap = validationErrors.reduce((acc, error) => ({
        ...acc,
        [error.field]: error.message
      }), {});
      setErrors(errorMap);
       if (validationErrors.some(err => err.field === 'toWarehouse')) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
      }
      return;
    }
    
    setErrors({});
    try {
      await onTransferStock(
        product.id, 
        product.warehouse, 
        transferStockForm.toWarehouse, 
        transferStockForm.quantity
      );
    } catch (error) {
      setErrors({ quantity: 'Failed to transfer stock. Please try again.' });
    }
  };

  const utilizationPercentage = (product.demand / product.stock) * 100;

  const tabs = [
    { id: 'details' as const, label: 'Details', icon: Package },
    { id: 'demand' as const, label: 'Update Demand', icon: Edit2 },
    { id: 'transfer' as const, label: 'Transfer Stock', icon: ArrowRightLeft }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
       {showToast && (
        <div className="fixed top-6 right-6 z-50 bg-red-600 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300">
          Please select a destination warehouse before transferring stock.
        </div>
      )}
      {/* Backdrop with fade animation */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isClosing ? 'opacity-0' : 'opacity-25'
        }`} 
        onClick={handleClose}
      />

      {/* Drawer with slide animation */}
      <div 
        className={`absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isClosing ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
              <p className="text-sm text-gray-600">{product.id} • {product.sku}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClose}
              className="hover:rotate-90 transition-transform duration-200"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Tabs with slide animation */}
          <div className="flex border-b relative">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  activeTab === id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform duration-200 ${
                  activeTab === id ? 'scale-110' : 'scale-100'
                }`} />
                {label}
              </button>
            ))}
            {/* Animated tab indicator */}
            <div 
              className="absolute bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out"
              style={{
                width: `${100 / tabs.length}%`,
                left: `${(tabs.findIndex(t => t.id === activeTab) * 100) / tabs.length}%`
              }}
            />
          </div>

          {/* Content with fade animation */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className={`transition-opacity duration-200 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatNumber(product.stock)}
                    </div>
                    <div className="text-sm text-blue-800">Current Stock</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {formatNumber(product.demand)}
                    </div>
                    <div className="text-sm text-orange-800">Current Demand</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Warehouse Location</label>
                    <p className="text-lg text-gray-900">{product.warehouse}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Product SKU</label>
                    <p className="text-lg text-gray-900 font-mono">{product.sku}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Stock Utilization</label>
                    <div className="mt-2">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 rounded-full h-2 transition-all duration-300"
                          style={{ width: `${Math.min(100, utilizationPercentage)}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {formatPercentage(utilizationPercentage)} utilized
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'demand' && (
              <form onSubmit={handleUpdateDemand} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Update Demand Forecast
                  </label>
                  <input
                    type="number"
                    value={updateDemandForm.demand}
                    onChange={(e) => setUpdateDemandForm({ demand: Number(e.target.value) })}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.demand ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                    min="0"
                  />
                  {errors.demand && (
                    <p className="text-sm text-red-600 mt-1">{errors.demand}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    Current demand: {formatNumber(product.demand)} units
                  </p>
                </div>
                <Button type="submit" className="w-full">
                  Update Demand
                </Button>
              </form>
            )}

            {activeTab === 'transfer' && (
              <form
                onSubmit={(e) => {
                  if (!transferStockForm.toWarehouse) {
                    e.preventDefault();
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 2500);
                    return;
                  }
                  handleTransferStock(e);
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transfer Quantity
                  </label>
                  <input
                    type="number"
                    value={transferStockForm.quantity}
                    onChange={(e) => setTransferStockForm(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.quantity ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                    placeholder="Enter quantity to transfer"
                    min="1"
                    max={product.stock}
                  />
                  {errors.quantity && (
                    <p className="text-sm text-red-600 mt-1">{errors.quantity}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transfer To Warehouse
                  </label>
                  <select
                    value={transferStockForm.toWarehouse}
                    onChange={(e) => setTransferStockForm(prev => ({ ...prev, toWarehouse: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.toWarehouse ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                  >
                    <option value="">Select warehouse</option>
                    {mockWarehouses.filter(w => w.code !== product.warehouse).map(w => (
                      <option key={w.code} value={w.code}>{w.name}</option>
                    ))}
                  </select>
                  {errors.toWarehouse && (
                    <p className="text-sm text-red-600 mt-1">{errors.toWarehouse}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className={`w-full ${(!transferStockForm.quantity || !transferStockForm.toWarehouse) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Transfer Stock
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};