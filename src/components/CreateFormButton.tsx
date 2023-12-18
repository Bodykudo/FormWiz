'use client';

import { BsFileEarmarkPlus } from 'react-icons/bs';
import { Button } from './ui/button';
import { useFormModal } from '@/hooks/useFormModal';

export default function CreateFormButton() {
  const { onOpen } = useFormModal();

  return (
    <Button
      onClick={onOpen}
      variant='outline'
      className='group border border-primary/20 h-48 flex flex-col items-center justify-center cursor-pointer hover:border-primary border-dashed gap-4 bg-background'
    >
      <BsFileEarmarkPlus className='h-8 w-8 text-muted-foreground group-hover:text-primary' />
      <p className='font-bold text-xl text-muted-foreground group-hover:text-primary'>
        Create new form
      </p>
    </Button>
  );
}
