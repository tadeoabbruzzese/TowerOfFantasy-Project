import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CharacterCard from './CharacterCard';
import { Character } from '../data/characters';

interface DraggableCharacterProps {
  character: Character;
  id: string;
}

const DraggableCharacter: React.FC<DraggableCharacterProps> = ({ character, id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="touch-manipulation"
    >
      <CharacterCard 
        character={character} 
        withLink={false} 
        compact={true}
        className="cursor-grab active:cursor-grabbing"
      />
    </div>
  );
};

export default DraggableCharacter;