'use client';

import { cn } from '@/src/lib/utils';
import DesignerSidebar from './DesignerSidebar';
import { useDndMonitor, useDroppable } from '@dnd-kit/core';
import { FormElementInstance } from '@/src/types/elements';
import { useDesigner } from '@/src/hooks/useDesigner';
import { FormElements } from '@/src/components/FormElements';
import { idGenerator } from '@/src/lib/idGenerator';
import DesignerElementWrapper from './DesignerElementWrapper';

export default function Designer() {
  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesignerDropArea: true,
    },
  });

  const {
    elements,
    addElement,
    removeElement,
    selectedElement,
    setSelectedElement,
  } = useDesigner();

  useDndMonitor({
    onDragEnd: (event) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerButtonElement =
        active.data?.current?.isDesignerButtonElement;
      const isDroppingOverDesignerDropArea =
        over.data?.current?.isDesignerDropArea;

      if (isDesignerButtonElement && isDroppingOverDesignerDropArea) {
        const type = active.data?.current?.type as FormElementInstance['type'];
        const newElement = FormElements[type].construct(idGenerator());

        addElement(elements.length, newElement);
        return;
      }

      const isDroppingOverDesignerElement =
        over.data?.current?.isTopHalfDesignerElement ||
        over.data?.current?.isBottomHalfDesignerElement;

      if (isDesignerButtonElement && isDroppingOverDesignerElement) {
        const type = active.data?.current?.type as FormElementInstance['type'];
        const newElement = FormElements[type].construct(idGenerator());
        const overElementIndex = elements.findIndex(
          (el) => el.id === over.data?.current?.elementId
        );
        if (overElementIndex === -1) {
          throw new Error('Element not found');
        }

        const newIndex = over.data?.current?.isTopHalfDesignerElement
          ? overElementIndex
          : overElementIndex + 1;

        addElement(newIndex, newElement);
        return;
      }

      const isDraggingDesignerElement = active.data?.current?.isDesignerElement;
      if (isDroppingOverDesignerElement && isDraggingDesignerElement) {
        const activeId = active.data?.current?.elementId;
        const overId = over.data?.current?.elementId;

        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId
        );
        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error('Element not found');
        }

        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeId);

        const newIndex = over.data?.current?.isTopHalfDesignerElement
          ? overElementIndex
          : overElementIndex + 1;

        addElement(newIndex, activeElement);
      }
    },
  });

  return (
    <div className='flex w-full h-full'>
      <div
        className='p-4 w-full'
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            'flex flex-col flex-grow items-center justify-start flex-1 bg-background max-w-4.5xl h-full m-auto rounded-xl overflow-y-auto',
            droppable.isOver && 'ring-2 ring-primary/20'
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className='flex flex-grow items-center text-3xl text-muted-foreground font-bold'>
              Drop here
            </p>
          )}
          {elements.length > 0 && (
            <div className='flex flex-col w-full gap-2 p-4'>
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className='p-4 w-full'>
              <div className='h-30 rounded-md bg-primary/20'></div>
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}
