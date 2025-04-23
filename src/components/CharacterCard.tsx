import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Flame, Snowflake, Swords } from 'lucide-react';
import { Character } from '../data/characters';
import { cn } from '../utils/cn';

interface CharacterCardProps {
  character: Character;
  className?: string;
  withLink?: boolean;
  compact?: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ 
  character, 
  className,
  withLink = true,
  compact = false
}) => {
  const elementIcon = {
    'Physical': <Swords size={compact ? 14 : 18} className="text-foreground" />,
    'Volt': <Zap size={compact ? 14 : 18} className="text-energy" />,
    'Fire': <Flame size={compact ? 14 : 18} className="text-error" />,
    'Ice': <Snowflake size={compact ? 14 : 18} className="text-primary" />,
    'Altered': <Shield size={compact ? 14 : 18} className="text-accent" />
  }[character.element];

  const cardContent = (
    <div className={cn(
      "card card-hover overflow-hidden",
      !compact && "relative pb-2",
      className
    )}>
      <div className={cn(
        "relative overflow-hidden",
        compact ? "h-16 w-16" : "aspect-[3/4]"
      )}>
        <img 
          src={character.image} 
          alt={character.name}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            !compact && "hover:scale-110"
          )}
        />
        <div className={cn(
          "absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-background/90 to-transparent",
          compact && "hidden"
        )}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">{character.name}</h3>
            <div className="flex items-center gap-1">
              {[...Array(character.rarity)].map((_, i) => (
                <span key={i} className="text-energy">★</span>
              ))}
            </div>
          </div>
        </div>
        <div className={cn(
          "absolute top-2 left-2 bg-card/80 backdrop-blur-sm rounded-full p-1",
          compact && "top-1 left-1 p-0.5"
        )}>
          {elementIcon}
        </div>
        <div className={cn(
          "absolute top-2 right-2 bg-card/80 backdrop-blur-sm rounded-full px-2 py-1",
          compact && "hidden"
        )}>
          <span className={cn(
            "text-xs font-semibold",
            character.resonance === 'DPS' && "text-error",
            character.resonance === 'Support' && "text-success",
            character.resonance === 'Defense' && "text-primary"
          )}>
            {character.resonance}
          </span>
        </div>
      </div>
      
      {!compact && (
        <div className="px-3 pt-2">
          <div className="flex items-center gap-1 text-sm text-foreground/70">
            <span className="font-medium">{character.weaponType}</span>
            <span className="text-border">•</span>
            <span>{character.weapon}</span>
          </div>
        </div>
      )}
    </div>
  );

  if (withLink) {
    return (
      <Link to={`/character/${character.id}`} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default CharacterCard;