import React, { useState, useEffect } from 'react';
import DroppableTier from '../components/DroppableTier';
import { 
  DndContext, 
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { 
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove
} from '@dnd-kit/sortable';
import { characters, defaultTierList, CharacterTier, getCharacterById } from '../data/characters';
import { Save, RefreshCw } from 'lucide-react';
import CharacterCard from '../components/CharacterCard';
import DraggableCharacter from '../components/DraggableCharacter';

const TIER_COLORS = {
  'S': 'tier-s',
  'A': 'tier-a',
  'B': 'tier-b',
  'C': 'tier-c',
  'D': 'tier-d'
};

const TierListPage = () => {
  const [tierList, setTierList] = useState<CharacterTier[]>(defaultTierList);
  const [availableCharacters, setAvailableCharacters] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  
  // Load tier list from localStorage or use default
  useEffect(() => {
    const savedTierList = localStorage.getItem('tofWikiTierList');
    if (savedTierList) {
      try {
        setTierList(JSON.parse(savedTierList));
      } catch (e) {
        console.error('Failed to parse saved tier list', e);
      }
    }
    
    // Determine which characters are not in any tier
    const usedCharacterIds = tierList.flatMap(tier => tier.characters);
    const availableIds = characters
      .map(c => c.id)
      .filter(id => !usedCharacterIds.includes(id));
    
    setAvailableCharacters(availableIds);
  }, []);
  
  // Save tier list when it changes
  useEffect(() => {
    if (tierList.length > 0) {
      const saveTimer = setTimeout(() => {
        try {
          localStorage.setItem('tofWikiTierList', JSON.stringify(tierList));
          setSaveStatus('saved');
          setTimeout(() => setSaveStatus('idle'), 2000);
        } catch (e) {
          console.error('Failed to save tier list', e);
        }
      }, 1000);
      
      return () => clearTimeout(saveTimer);
    }
  }, [tierList]);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );
  
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    
    if (!over) return;
    console.log("Active:", active.id, "Over:", over.id);
    
    const activeId = active.id as string;
    const overId = over.id as string;
    
    if (activeId === overId) return;
    
    // Handle moving characters between tiers
    if (overId.startsWith('tier-')) {
      const targetTierId = overId.replace('tier-', '');
      const characterId = activeId;
      
      // Find which tier (if any) currently has the character
      const sourceTierIndex = tierList.findIndex(tier => 
        tier.characters.includes(characterId)
      );
      
      const targetTierIndex = tierList.findIndex(tier => 
        tier.tier === targetTierId
      );
      
      if (targetTierIndex === -1) return;
      
      const newTierList = [...tierList];
      
      // If character is in available pool
      if (sourceTierIndex === -1) {
        // Remove from available characters
        setAvailableCharacters(prev => 
          prev.filter(id => id !== characterId)
        );
        
        // Add to target tier
        newTierList[targetTierIndex] = {
          ...newTierList[targetTierIndex],
          characters: [...newTierList[targetTierIndex].characters, characterId]
        };
      } else {
        // Remove from source tier
        const newSourceTierChars = [...newTierList[sourceTierIndex].characters];
        const sourceCharIndex = newSourceTierChars.indexOf(characterId);
        newSourceTierChars.splice(sourceCharIndex, 1);
        
        newTierList[sourceTierIndex] = {
          ...newTierList[sourceTierIndex],
          characters: newSourceTierChars
        };
        
        // Add to target tier
        newTierList[targetTierIndex] = {
          ...newTierList[targetTierIndex],
          characters: [...newTierList[targetTierIndex].characters, characterId]
        };
      }
      
      setTierList(newTierList);
      setSaveStatus('saving');
    } 
    // Handle reordering within a tier
    else {
      // Find which tier contains both characters
      const tierIndex = tierList.findIndex(tier => {
        return tier.characters.includes(activeId) && tier.characters.includes(overId);
      });
      
      if (tierIndex === -1) return;
      
      const tierChars = [...tierList[tierIndex].characters];
      const activeIndex = tierChars.indexOf(activeId);
      const overIndex = tierChars.indexOf(overId);
      
      if (activeIndex !== -1 && overIndex !== -1) {
        const newCharacters = arrayMove(tierChars, activeIndex, overIndex);
        const newTierList = [...tierList];
        newTierList[tierIndex] = {
          ...newTierList[tierIndex],
          characters: newCharacters
        };
        
        setTierList(newTierList);
        setSaveStatus('saving');
      }
    }
  };
  
  const resetTierList = () => {
    if (confirm('Are you sure you want to reset the tier list to defaults?')) {
      setTierList(defaultTierList);
      // Recalculate available characters
      const usedCharacterIds = defaultTierList.flatMap(tier => tier.characters);
      const availableIds = characters
        .map(c => c.id)
        .filter(id => !usedCharacterIds.includes(id));
      
      setAvailableCharacters(availableIds);
      setSaveStatus('saving');
    }
  };
  
  // Find active character if any
  const activeCharacter = activeId ? getCharacterById(activeId) : null;
  
  return (
    <div className="slide-up">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Tower of Fantasy Tier List</h1>
        <p className="text-foreground/70 max-w-3xl">
          Create your own character tier list by dragging characters between tiers. Your tier list will be automatically saved in your browser.
        </p>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Your Tier List</h2>
        <div className="flex items-center gap-2">
          <button 
            className="btn btn-outline flex items-center gap-2"
            onClick={resetTierList}
          >
            <RefreshCw size={16} />
            Reset
          </button>
          
          <div className="relative">
            <button 
              className="btn btn-primary flex items-center gap-2"
              disabled={saveStatus !== 'idle'}
            >
              <Save size={16} />
              {saveStatus === 'idle' && 'Auto Saving'}
              {saveStatus === 'saving' && 'Saving...'}
              {saveStatus === 'saved' && 'Saved!'}
            </button>
            
            {saveStatus === 'saved' && (
              <span className="absolute -bottom-6 right-0 text-xs text-success">
                Tier list saved!
              </span>
            )}
          </div>
        </div>
      </div>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* Tier Rows */}
        <div className="space-y-4 mb-8">
          {/* {tierList.map((tier) => (
            <div key={tier.tier} className="tier-row">
              <div id={`tier-${tier.tier}`} className={`tier-label ${TIER_COLORS[tier.tier]}`}>
                {tier.tier}
              </div>
              
              <div className="tier-characters">
                <SortableContext
                  items={tier.characters}
                  strategy={horizontalListSortingStrategy}
                >
                  <div className="flex flex-wrap gap-2">
                    {tier.characters.map((charId) => {
                      const character = getCharacterById(charId);
                      if (!character) return null;
                      
                      return (
                        <DraggableCharacter
                          key={charId}
                          id={charId}
                          character={character}
                        />
                      );
                    })}
                  </div>
                </SortableContext>
              </div>
            </div>
          ))} */}
          {tierList.map((tier) => (
  <div key={tier.tier} className="tier-row">
    <div className={`tier-label ${TIER_COLORS[tier.tier]}`}>
      {tier.tier}
    </div>

    <DroppableTier id={`tier-${tier.tier}`}>
      <div className="tier-characters">
        <SortableContext
          items={tier.characters}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex flex-wrap gap-2">
            {tier.characters.map((charId) => {
              const character = getCharacterById(charId);
              if (!character) return null;

              return (
                <DraggableCharacter
                  key={charId}
                  id={charId}
                  character={character}
                />
              );
            })}
          </div>
        </SortableContext>
      </div>
    </DroppableTier>
  </div>
))}
        </div>
        
        {/* Available Characters Pool */}
        <div className="border border-border rounded-md overflow-hidden">
          <div className="bg-card-hover p-4 border-b border-border">
            <h3 className="font-bold text-lg">Available Characters</h3>
            <p className="text-sm text-foreground/70">Drag characters to place them in tiers</p>
          </div>
          
          <div className="bg-card p-4">
            <div className="flex flex-wrap gap-3">
              {availableCharacters.map((charId) => {
                const character = getCharacterById(charId);
                if (!character) return null;
                
                return (
                  <DraggableCharacter
                    key={charId}
                    id={charId}
                    character={character}
                  />
                );
              })}
              
              {availableCharacters.length === 0 && (
                <p className="text-foreground/70 py-4">
                  All characters are placed in tiers. Reset the tier list to start over.
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Drag Overlay */}
        <DragOverlay>
          {activeId && activeCharacter ? (
            <CharacterCard 
              character={activeCharacter} 
              withLink={false}
              compact={true}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default TierListPage;