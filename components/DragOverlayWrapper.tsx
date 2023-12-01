'use client';

import { SidebarButtonElementDragOverlay } from '@/app/(dashboard)/builder/[formId]/components/SidebarButtonElement';
import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { useState } from 'react';
import { FormElements } from './FormElements';
import { ElementsType } from '@/types/elements';

export default function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

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

  return <DragOverlay>{node}</DragOverlay>;
}
