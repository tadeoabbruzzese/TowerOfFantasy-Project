import { useDroppable } from '@dnd-kit/core';

const DroppableTier = ({ id, children }: { id: string, children: React.ReactNode }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} id={id} className="droppable-tier">
      {children}
    </div>
  );
};

export default DroppableTier;
