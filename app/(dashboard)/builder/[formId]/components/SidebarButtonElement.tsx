'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FormElement } from '@/types/elements';
import { useDraggable } from '@dnd-kit/core';

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
