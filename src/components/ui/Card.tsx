import React from 'react';
import type { CardProps } from '../../types';

export const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
    {children}
  </div>
);
