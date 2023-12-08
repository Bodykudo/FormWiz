'use client';

import { useState } from 'react';
import { BiSolidTrash } from 'react-icons/bi';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { FormElementInstance } from '@/src/types/elements';

import { Button } from '@/src/components/ui/button';
import { FormElements } from '@/src/components/FormElements';
import { useDesigner } from '@/src/hooks/useDesigner';
import { cn } from '@/src/lib/utils';

interface DesignerElementWrapperProps {
  element: FormElementInstance;
}

export default function DesignerElementWrapper({
  element,
}: DesignerElementWrapperProps) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const { removeElement, selectedElement, setSelectedElement } = useDesigner();

  const topHalf = useDroppable({
    id: element.id + '-top',
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + '-bottom',
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + '-drag-handler',
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;

  const DesignerElement = FormElements[element.type].designerComponent;

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className='relative h-30 flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset'
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className='absolute w-full top-0 h-1/2 rounded-t-md transition-all'
      />
      <div
        ref={bottomHalf.setNodeRef}
        className='absolute w-full bottom-0 h-1/2 rounded-b-md transition-all'
      />

      {mouseIsOver && (
        <>
          <div className='absolute right-0 h-full'>
            <Button
              variant='outline'
              className='flex justify-center h-full borderd rounded-md rounded-l-none bg-red-500'
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.id);
              }}
            >
              <BiSolidTrash className='h-6 w-6' />
            </Button>
          </div>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse'>
            <p className='text-muted-foreground text-sm'>
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}

      {topHalf.isOver && (
        <div className='absolute top-0 w-full rounded-md rounded-b-none h-[7px] bg-primary' />
      )}
      <div
        className={cn(
          'flex w-full h-30 items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100',
          mouseIsOver && 'opacity-30'
        )}
      >
        <DesignerElement key={element.id} elementInstance={element} />
      </div>

      {bottomHalf.isOver && (
        <div className='absolute bottom-0 w-full rounded-md rounded-t-none h-[7px] bg-primary' />
      )}
    </div>
  );
}
