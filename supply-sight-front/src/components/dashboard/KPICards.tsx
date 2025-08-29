import React from 'react';
import { TrendingUp, Package, Target } from 'lucide-react';
import { Card } from '../ui/Card';
import type { KPICardsProps } from '../../types';
import { formatNumber, formatPercentage } from '../../utils/formatters';

interface KPICardData {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}

export const KPICards: React.FC<KPICardsProps> = ({ 
  totalStock, 
  totalDemand, 
  fillRate, 
  loading = false 
}) => {
  const kpis: KPICardData[] = [
    {
      title: 'Total Stock',
      value: formatNumber(totalStock),
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Demand', 
      value: formatNumber(totalDemand),
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Fill Rate',
      value: formatPercentage(fillRate),
      icon: TrendingUp,
      color: fillRate >= 80 ? 'text-green-600' : fillRate >= 60 ? 'text-yellow-600' : 'text-red-600',
      bgColor: fillRate >= 80 ? 'bg-green-100' : fillRate >= 60 ? 'bg-yellow-100' : 'bg-red-100'
    }
  ];
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map(i => (
          <Card key={i} className="animate-pulse">
            <div className="h-20 bg-gray-200 rounded"></div>
          </Card>
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {kpis.map(({ title, value, icon: Icon, color, bgColor }) => (
        <Card key={title} className="transition-all duration-200 hover:scale-105 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            </div>
            <div className={`${bgColor} p-3 rounded-lg`}>
              <Icon className={`w-6 h-6 ${color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};