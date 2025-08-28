import type { FormatNumberOptions, DateFormatOptions } from '../types';

export const formatNumber = (
  num: number, 
  options: FormatNumberOptions = {}
): string => {
  const { locale = 'en-US', ...formatOptions } = options;
  return new Intl.NumberFormat(locale, formatOptions).format(num);
};

export const formatDate = (
  date: string | Date, 
  options: DateFormatOptions = {}
): string => {
  const { format = 'short', locale = 'en-US' } = options;
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const formatOptions: Intl.DateTimeFormatOptions = {
    short: { month: 'short', day: 'numeric' },
    long: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    numeric: { year: 'numeric', month: '2-digit', day: '2-digit' }
  };
  
  return new Intl.DateTimeFormat(locale, formatOptions[format]).format(dateObj);
};

export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};