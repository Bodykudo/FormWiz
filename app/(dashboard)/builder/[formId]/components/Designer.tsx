'use client';

import { cn } from '@/lib/utils';
import DesignerSidebar from './DesignerSidebar';
import { useDndMonitor, useDroppable } from '@dnd-kit/core';
import { FormElementInstance } from '@/types/elements';
import { useDesigner } from '@/hooks/useDesigner';
import { FormElements } from '@/components/FormElements';
import { idGenerator } from '@/lib/idGenerator';
export default function Designer() {
  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesignerDropArea: true,
    },
  });

  const { elements, addElement } = useDesigner();

  useDndMonitor({
    onDragEnd: (event) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerButtonElement =
        active.data?.current?.isDesignerButtonElement;

      if (isDesignerButtonElement) {
        const type = active.data?.current?.type as FormElementInstance['type'];
        const newElement = FormElements[type].construct(idGenerator());

        addElement(0, newElement);
      }
    },
  });

  return (
    <div className='flex w-full h-full'>
      <div className='p-4 w-full'>
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
              {elements.map((element) => {
                const DesignerElement =
                  FormElements[element.type].designerComponent;

                return (
                  <DesignerElement key={element.id} elementInstance={element} />
                );
              })}
            </div>
          )}
          {droppable.isOver && (
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
