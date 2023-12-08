'use client';

import { useDraggable } from '@dnd-kit/core';
import { FormElement } from '@/src/types/elements';
import { Button } from '@/src/components/ui/button';
import { cn } from '@/src/lib/utils';

interface SidebarButtonElement {
  formElement: FormElement;
}

export default function SidebarButtonElement({
  formElement,
}: SidebarButtonElement) {
  const { icon: Icon, label } = formElement.designerButtonElement;
  const draggable = useDraggable({
    id: `designer-button-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerButtonElement: true,
    },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      variant='outline'
      className={cn(
        'flex flex-col gap-2 h-30 w-30 cursor-grab',
        draggable.isDragging && 'ring-2 ring-primary'
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className='h-8 w-8 text-primary cursor-grab' />
      <div className='text-xs'>{label}</div>
    </Button>
  );
}

export function SidebarButtonElementDragOverlay({
  formElement,
}: SidebarButtonElement) {
  const { icon: Icon, label } = formElement.designerButtonElement;

  return (
    <Button
      variant='outline'
      className='flex flex-col gap-2 h-30 w-30 cursor-grab'
    >
      <Icon className='h-8 w-8 text-primary cursor-grab' />
      <div className='text-xs'>{label}</div>
    </Button>
  );
}
