import React from 'react';
import { PRODUCT_STATUS_CONFIG } from '../../types';
import type { StatusPillProps } from '../../types';

export const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
  const config = PRODUCT_STATUS_CONFIG[status];
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bgColor} ${config.textColor} border-${status.toLowerCase()}-200`}>
      <div className={`w-2 h-2 rounded-full mr-1.5 ${config.dotColor}`} />
      {status}
    </span>
  );
};