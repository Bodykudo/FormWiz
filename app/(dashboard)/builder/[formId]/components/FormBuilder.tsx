'use client';

import PreviewFormButton from '@/components/PreviewFormButton';
import PublishFormButton from '@/components/PublishFormButton';
import SaveFormButton from '@/components/SaveFormButton';
import { Form } from '@prisma/client';
import Designer from './Designer';
import { DndContext } from '@dnd-kit/core';
import DragOverlayWrapper from '@/components/DragOverlayWrapper';

interface FormBuilderProps {
  form: Form;
}

export default function FormBuilder({ form }: FormBuilderProps) {
  return (
    <DndContext>
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
