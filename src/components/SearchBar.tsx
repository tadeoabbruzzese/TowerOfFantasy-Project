import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { characters } from '../data/characters';
import { useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const filteredCharacters = searchQuery.length > 1 
    ? characters.filter(character => 
        character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        character.element.toLowerCase().includes(searchQuery.toLowerCase()) ||
        character.weaponType.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleCharacterSelect = (id: string) => {
    setSearchQuery('');
    setShowResults(false);
    navigate(`/character/${id}`);
  };

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-border h-4 w-4" />
        <input 
          type="text" 
          placeholder="Search characters..." 
          className="pl-10 pr-9 py-2 rounded-full bg-card border border-border focus:border-primary/50 focus:outline-none w-full"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowResults(e.target.value.length > 0);
          }}
          onFocus={() => setShowResults(searchQuery.length > 0)}
          onBlur={() => {
            // Delay hiding results to allow for clicking
            setTimeout(() => setShowResults(false), 200);
          }}
        />
        {searchQuery && (
          <button 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-border hover:text-foreground"
            onClick={() => {
              setSearchQuery('');
              setShowResults(false);
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {showResults && filteredCharacters.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-card border border-border rounded-md shadow-lg py-1 max-h-60 overflow-auto fade-in">
          {filteredCharacters.map(character => (
            <button
              key={character.id}
              className="w-full px-3 py-2 text-left hover:bg-card-hover flex items-center gap-2"
              onClick={() => handleCharacterSelect(character.id)}
            >
              <img
                src={character.image}
                alt={character.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <div className="font-medium">{character.name}</div>
                <div className="text-xs text-foreground/70">{character.element} • {character.weaponType}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {showResults && searchQuery.length > 1 && filteredCharacters.length === 0 && (
        <div className="absolute z-50 mt-1 w-full bg-card border border-border rounded-md shadow-lg p-4 text-center fade-in">
          <p className="text-foreground/70">No characters found</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;