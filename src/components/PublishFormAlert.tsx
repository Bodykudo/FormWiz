'use client';

import { FaIcons } from 'react-icons/fa';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { useTransition } from 'react';
import { usePublishModal } from '@/src/hooks/usePublishModal';
import { toast } from './ui/use-toast';
import { PublishForm } from '@/src/actions/form';
import { useRouter } from 'next/navigation';

export default function PublishFormAlert() {
  const [loading, startTransition] = useTransition();
  const { isOpen, onClose, id } = usePublishModal();
  const router = useRouter();

  const publishForm = async () => {
    try {
      await PublishForm(id as number);
      toast({
        title: 'Success',
        description: 'Your form is now available to the public',
      });

      router.refresh();
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action can NOT be undone. After publishing you will not be able
            to edit this form. <br />
            <br />
            <span className='font-medium'>
              By publishting this form you will make it available to the public
              and you will be able to collect submissions.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(publishForm);
            }}
          >
            Proceed {loading && <FaIcons className='animate-spin' />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
