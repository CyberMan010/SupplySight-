import React from 'react';
import type { DateRangeSelectorProps } from '../../types';
import { DATE_RANGES} from '../../types';

export const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ 
  range, 
  setRange 
}) => {
  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      {DATE_RANGES.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => setRange(value)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
            range === value 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
