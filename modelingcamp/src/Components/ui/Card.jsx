import React from 'react';

export function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white shadow-sm p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div className={`text-gray-700 ${className}`} {...props}>
      {children}
    </div>
  );
}