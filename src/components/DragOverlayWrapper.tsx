'use client';

import { SidebarButtonElementDragOverlay } from '@/src/app/(dashboard)/builder/[formId]/components/SidebarButtonElement';
import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { useState } from 'react';
import { FormElements } from './FormElements';
import { ElementsType } from '@/src/types/elements';
import { useDesigner } from '@/src/hooks/useDesigner';

export default function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  const { elements } = useDesigner();

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => setDraggedItem(null),
    onDragEnd: () => setDraggedItem(null),
  });

  if (!draggedItem) return null;

  let node = <div />;
  const isDesignerButtonElement =
    draggedItem.data?.current?.isDesignerButtonElement;

  if (isDesignerButtonElement) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = <SidebarButtonElementDragOverlay formElement={FormElements[type]} />;
  }

  const isDesignerElement = draggedItem.data?.current?.isDesignerElement;
  if (isDesignerElement) {
    const elementId = draggedItem.data?.current?.elementId;
    const element = elements.find((el) => el.id === elementId);
    if (!element) node = <div>Element not found!</div>;
    else {
      const DesignerElementComponent =
        FormElements[element.type].designerComponent;
      node = (
        <div className='flex bg-accent border rounded-md h-30 w-full py-2 px-4 opacity-80 pointer-events-none'>
          <DesignerElementComponent elementInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
}