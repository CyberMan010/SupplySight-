import React from 'react';
import { Package, Search, AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  type?: 'no-data' | 'no-results' | 'error';
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'no-data',
  title,
  description,
  action,
}) => {
  const config = {
    'no-data': {
      icon: Package,
      defaultTitle: 'No products found',
      defaultDescription: 'Get started by adding your first product to the inventory.',
      iconColor: 'text-gray-400',
    },
    'no-results': {
      icon: Search,
      defaultTitle: 'No matching results',
      defaultDescription: 'Try adjusting your search criteria or filters.',
      iconColor: 'text-blue-400',
    },
    error: {
      icon: AlertCircle,
      defaultTitle: 'Something went wrong',
      defaultDescription: 'We encountered an error loading your data.',
      iconColor: 'text-red-400',
    },
  };

  const { icon: Icon, defaultTitle, defaultDescription, iconColor } = config[type];

  return (
    <div className="text-center py-12">
      <Icon className={`mx-auto h-12 w-12 ${iconColor} mb-4`} />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {title || defaultTitle}
      </h3>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">
        {description || defaultDescription}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
};