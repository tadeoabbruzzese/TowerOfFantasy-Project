import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCharacterById } from '../data/characters';
import { ArrowLeft, Shield, Swords, Target, Heart, ShieldAlert, Zap, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { ElementalIcon } from '../components/ElementalIcon';
import StatBar from '../components/StatBar';
import { cn } from '../utils/cn';

const CharacterPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(id ? getCharacterById(id) : null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMatrices, setShowMatrices] = useState(true);
  const [showAdvancements, setShowAdvancements] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    if (id) {
      const characterData = getCharacterById(id);
      setCharacter(characterData);
      
      if (!characterData) {
        navigate('/not-found');
      }
    }
  }, [id, navigate]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-primary">
          <div className="h-24 w-24 rounded-full border-4 border-t-transparent border-primary animate-spin"></div>
        </div>
      </div>
    );
  }
  
  if (!character) {
    return null;
  }

  return (
    <div className="fade-in">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-foreground/70 hover:text-primary mb-4">
          <ArrowLeft size={16} className="mr-2" />
          Back to Characters
        </Link>
      </div>
      
      {/* Hero Section */}
      <div className="relative mb-12 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-background"></div>
        <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 p-6 md:p-8">
          {/* Character Image */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="relative w-full max-w-sm aspect-[3/4] rounded-lg overflow-hidden border-2 border-border shadow-xl">
           
            
              <img 
                src={character.image} 
                alt={character.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-1/4"></div>
            </div>
          </div>
          
          {/* Character Info */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <ElementalIcon element={character.element} size={24} className="bg-card/80 backdrop-blur-sm rounded-full p-1.5" />
                <div className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium",
                  character.resonance === 'DPS' && "bg-error/20 text-error",
                  character.resonance === 'Support' && "bg-success/20 text-success",
                  character.resonance === 'Defense' && "bg-primary/20 text-primary"
                )}>
                  {character.resonance}
                </div>
                <div className="text-energy">
                  {[...Array(character.rarity)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{character.name}</h1>
              
              <div className="flex items-center gap-2 text-lg mb-4">
                <span className="font-medium">{character.weaponType}</span>
                <span className="text-border">•</span>
                <span className="text-foreground/80">{character.weapon}</span>
              </div>
              
              <p className="text-foreground/80 text-lg max-w-2xl">
                {character.description}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Swords size={18} className="text-primary" />
                    Combat Stats
                  </h3>
                  <button
                    onClick={() => setShowAdvancements(!showAdvancements)}
                    className="flex items-center gap-1 text-sm text-foreground/70 hover:text-primary transition-colors"
                  >
                    Advancements
                    {showAdvancements ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                </div>
                
                <div className="space-y-3">
                  <StatBar 
                    label="HP" 
                    value={character.stats.hp} 
                    maxValue={15000} 
                    color="bg-success"
                  />
                  <StatBar 
                    label="Attack" 
                    value={character.stats.attack} 
                    maxValue={1200} 
                    color="bg-error"
                  />
                  <StatBar 
                    label="Defense" 
                    value={character.stats.defense} 
                    maxValue={1200} 
                    color="bg-primary"
                  />
                  <StatBar 
                    label="Resistance" 
                    value={character.stats.resistance} 
                    maxValue={1000} 
                    color="bg-accent"
                  />
                  <StatBar 
                    label="Critical" 
                    value={character.stats.crit} 
                    maxValue={1000} 
                    color="bg-energy"
                  />
                </div>

                {/* Advancements Information */}
                <div className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  showAdvancements ? "max-h-[1000px] mt-6 opacity-100" : "max-h-0 opacity-0"
                )}>
                  <div className="relative space-y-4 before:absolute before:left-[17px] before:top-0 before:h-full before:w-0.5 before:bg-border">
                    {[1, 2, 3, 4, 5, 6].map((star) => (
                      <div key={star} className="card p-3 relative ml-8">
                        <div className="absolute -left-8 top-3 w-6 h-6 rounded-full bg-card border-2 border-energy flex items-center justify-center">
                          <Star size={12} className="text-energy" />
                        </div>
                        <div className="font-semibold mb-2 text-energy flex items-center gap-2">
                          {star} {star === 1 ? 'Star' : 'Stars'}
                        </div>
                        <p className="text-sm text-foreground/80">
                          {character.advancements[`star${star}`]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Zap size={18} className="text-energy" />
                    Abilities
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="card p-3">
                      <div className="font-semibold mb-1 text-primary-light">Normal Attack</div>
                      <p className="text-sm text-foreground/80">{character.abilities.normal}</p>
                    </div>
                    
                    <div className="card p-3">
                      <div className="font-semibold mb-1 text-accent">Dodge</div>
                      <p className="text-sm text-foreground/80">{character.abilities.dodge}</p>
                    </div>
                    
                    <div className="card p-3">
                      <div className="font-semibold mb-1 text-energy">Skill</div>
                      <p className="text-sm text-foreground/80">{character.abilities.skill}</p>
                    </div>
                    
                    <div className="card p-3">
                      <div className="font-semibold mb-1 text-error">Discharge</div>
                      <p className="text-sm text-foreground/80">{character.abilities.discharge}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Star size={18} className="text-energy" />
                      Matrices
                    </h3>
                    <button
                      onClick={() => setShowMatrices(!showMatrices)}
                      className="flex items-center gap-1 text-sm text-foreground/70 hover:text-primary transition-colors"
                    >
                      {showMatrices ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                  </div>
                  
                  <div className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    showMatrices ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}>
                    <div className="space-y-4">
                      <div className="card p-3">
                        <div className="font-semibold mb-1 text-primary">2-Piece Set Effect</div>
                        <p className="text-sm text-foreground/80">{character.matrices.set2}</p>
                      </div>
                      <div className="card p-3">
                        <div className="font-semibold text-energy mb-2">4-Piece Set Effect</div>
                        <p className="text-sm text-foreground/80">{character.matrices.set4}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;