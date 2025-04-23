import React, { useState, useEffect } from 'react';
import { characters } from '../data/characters';
import CharacterCard from '../components/CharacterCard';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../utils/cn';

type FilterOption = 'All' | 'DPS' | 'Support' | 'Defense' | 'Physical' | 'Volt' | 'Fire' | 'Ice' | 'Altered';

const HomePage = () => {
  const [filter, setFilter] = useState<FilterOption>('All');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredCharacters, setFilteredCharacters] = useState(characters);
  
  // Apply filters
  useEffect(() => {
    if (filter === 'All') {
      setFilteredCharacters(characters);
    } else if (['DPS', 'Support', 'Defense'].includes(filter as string)) {
      setFilteredCharacters(
        characters.filter(char => char.resonance === filter)
      );
    } else {
      setFilteredCharacters(
        characters.filter(char => char.element === filter)
      );
    }
  }, [filter]);

  return (
    <div className="space-y-8 slide-up">
      {/* Hero Section */}
      <div className="relative -mt-8 mb-12 pt-24 pb-16 bg-gradient-to-r from-background via-primary/20 to-background border-b border-border">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Tower of Fantasy Wiki
            </h1>
            <p className="text-lg text-foreground/80 mb-6">
              Your comprehensive guide to characters, weapons, and tier lists for Tower of Fantasy.
            </p>
          </div>
        </div>
      </div>

      {/* Characters Section */}
      <section>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Characters</h2>
            <p className="text-foreground/70">Explore all simulacra and their weapons</p>
          </div>
          
          {/* Filters */}
          <div className="relative">
            <button 
              className="btn btn-outline flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              <span>Filter: {filter}</span>
              {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {showFilters && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg z-10 fade-in">
                <div className="p-2">
                  <div className="text-xs font-medium text-foreground/60 uppercase tracking-wider mb-1 px-2">
                    Resonance
                  </div>
                  {['All', 'DPS', 'Support', 'Defense'].map((option) => (
                    <button
                      key={option}
                      className={cn(
                        "w-full text-left px-2 py-1.5 rounded text-sm",
                        filter === option ? "bg-primary/20 text-primary" : "hover:bg-card-hover"
                      )}
                      onClick={() => {
                        setFilter(option as FilterOption);
                        setShowFilters(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                  
                  <div className="text-xs font-medium text-foreground/60 uppercase tracking-wider mt-2 mb-1 px-2">
                    Element
                  </div>
                  {['Physical', 'Volt', 'Fire', 'Ice', 'Altered'].map((option) => (
                    <button
                      key={option}
                      className={cn(
                        "w-full text-left px-2 py-1.5 rounded text-sm",
                        filter === option ? "bg-primary/20 text-primary" : "hover:bg-card-hover"
                      )}
                      onClick={() => {
                        setFilter(option as FilterOption);
                        setShowFilters(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Character Grid */}
        <div className="character-grid">
          {filteredCharacters.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
        
        {filteredCharacters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-foreground/70">No characters found with the selected filter.</p>
            <button
              className="mt-4 btn btn-outline"
              onClick={() => setFilter('All')}
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;