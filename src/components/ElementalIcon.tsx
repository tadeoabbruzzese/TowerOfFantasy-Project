import React from 'react';
import { Shield, Zap, Flame, Snowflake, Swords } from 'lucide-react';
import { cn } from '../utils/cn';

interface ElementalIconProps {
  element: 'Physical' | 'Volt' | 'Fire' | 'Ice' | 'Altered';
  size?: number;
  className?: string;
}

export const ElementalIcon: React.FC<ElementalIconProps> = ({ 
  element, 
  size = 18,
  className
}) => {
  switch (element) {
    case 'Physical':
      return <Swords size={size} className={cn("text-foreground", className)} />;
    case 'Volt':
      return <Zap size={size} className={cn("text-energy", className)} />;
    case 'Fire':
      return <Flame size={size} className={cn("text-error", className)} />;
    case 'Ice':
      return <Snowflake size={size} className={cn("text-primary", className)} />;
    case 'Altered':
      return <Shield size={size} className={cn("text-accent", className)} />;
  }
};

export default ElementalIcon;