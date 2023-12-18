'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import Confetti from 'react-confetti';
import { ImSpinner2 } from 'react-icons/im';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { Form } from '@prisma/client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import PublishFormButton from '@/components/PublishFormButton';
import PreviewFormButton from '@/components/PreviewFormButton';
import SaveFormButton from './SaveFormButton';
import Designer from './Designer';
import DragOverlayWrapper from './DragOverlayWrapper';
import { useDesigner } from '@/hooks/useDesigner';

interface FormBuilderProps {
  form: Form;
}

export default function FormBuilder({ form }: FormBuilderProps) {
  const [isLoading, setIsLoading] = useState(true);

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

  const { setElements, setSelectedElement } = useDesigner();

  useEffect(() => {
    if (!isLoading) return;

    setElements(JSON.parse(form.content));
    setSelectedElement(null);

    const loadingTimout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(loadingTimout);
    };
  }, [form, setElements, isLoading, setIsLoading, setSelectedElement]);

  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <ImSpinner2 className='animate-spin h-12 w-12' />
      </div>
    );
  }

  if (form.published) {
    const shareURL = `${window.location.origin}/submit/${form.shareURL}`;

    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={1000}
        />
        <div className='flex flex-col items-center justify-center h-full w-full'>
          <div className='max-w-lg'>
            <h1 className='text-center text-4xl font-bold text-primary border-b pb-2 mb-10'>
              🎊🎊 Form Published 🎊🎊
            </h1>
            <h2 className='text-2xl'>Share this form</h2>
            <h3 className='text-xl text-muted-foreground border-b pb-10'>
              Anyone with the link can view and submit the form
            </h3>
            <div className='my-4 flex flex-col gap-2 items-center w-full border-b pb-4'>
              <Input className='w-full' readOnly value={shareURL} />
              <Button
                className='mt-2 w-full'
                onClick={() => {
                  navigator.clipboard.writeText(shareURL);
                  toast({
                    title: 'Copied',
                    description: 'Link copied to clipboard',
                  });
                }}
              >
                Copy link
              </Button>
            </div>
            <div className='flex justify-between'>
              <Button variant='link' asChild>
                <Link href='/' className='gap-2'>
                  <BsArrowLeft /> Go back home
                </Link>
              </Button>
              <Button variant='link' asChild>
                <Link href={`/forms/${form.id}`} className='gap-2'>
                  Form details <BsArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

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
                <SaveFormButton id={form.id} />
                <PublishFormButton id={form.id} />
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
