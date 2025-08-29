import type { ValidationError, UpdateDemandForm, TransferStockForm, Product } from '../types';

export const validateUpdateDemand = (
  form: UpdateDemandForm
): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (form.demand < 0) {
    errors.push({ field: 'demand', message: 'Demand cannot be negative' });
  }
  
  if (form.demand > 10000) {
    errors.push({ field: 'demand', message: 'Demand cannot exceed 10,000 units' });
  }
  
  return errors;
};

export const validateTransferStock = (
  form: TransferStockForm,
  product: Product
): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (form.quantity <= 0) {
    errors.push({ field: 'quantity', message: 'Quantity must be greater than 0' });
  }
  
  if (form.quantity > product.stock) {
    errors.push({ field: 'quantity', message: 'Quantity cannot exceed available stock' });
  }
  
  if (!form.toWarehouse) {
    errors.push({ field: 'toWarehouse', message: 'Please select a destination warehouse' });
  }
  
  return errors;
};