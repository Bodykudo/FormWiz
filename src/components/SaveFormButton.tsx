import { HiSaveAs } from 'react-icons/hi';
import { Button } from './ui/button';
import { useDesigner } from '@/src/hooks/useDesigner';
import { UpdateFormContent } from '@/src/actions/form';
import { toast } from './ui/use-toast';
import { useTransition } from 'react';
import { FaSpinner } from 'react-icons/fa';

interface SaveFormButtonProps {
  id: number;
}

export default function SaveFormButton({ id }: SaveFormButtonProps) {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, jsonElements);

      toast({
        title: 'Success',
        description: 'Your form has been saved',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  return (
    <Button
      variant='outline'
      disabled={loading}
      onClick={() => {
        startTransition(updateFormContent);
      }}
      className='gap-2'
    >
      <HiSaveAs className='w-4 h-4' /> Save
      {loading && <FaSpinner className='animate-spin' />}
    </Button>
  );
}
