import React from 'react';
import { cn } from '../utils/cn';

interface StatBarProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
  className?: string;
}

const StatBar: React.FC<StatBarProps> = ({ 
  label, 
  value, 
  maxValue, 
  color,
  className
}) => {
  const percentage = Math.min((value / maxValue) * 100, 100);
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-foreground/70">{value}</span>
      </div>
      <div className="h-2 w-full bg-card rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StatBar;