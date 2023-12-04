'use client';

import PreviewFormButton from '@/components/PreviewFormButton';
import PublishFormButton from '@/components/PublishFormButton';
import SaveFormButton from '@/components/SaveFormButton';
import { Form } from '@prisma/client';
import Designer from './Designer';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import DragOverlayWrapper from '@/components/DragOverlayWrapper';

interface FormBuilderProps {
  form: Form;
}

export default function FormBuilder({ form }: FormBuilderProps) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext sensors={sensors}>
      <main className='flex flex-col w-full'>
        <nav className='flex justify-between items-center border-b-2 p-4 gap-3'>
          <h2 className='truncate font-medium'>
            <span className='text-muted-foreground mr-2'>Form:</span>
            {form.name}
          </h2>
          <div className='flex items-center gap-2'>
            <PreviewFormButton />
            {!form.published && (
              <>
                <SaveFormButton />
                <PublishFormButton />
              </>
            )}
          </div>
        </nav>
        <div className='flex flex-grow w-full justify-center items-center relative overflow-y-auto h-52 bg-accent bg-paper dark:bg-paper-dark'>
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}
