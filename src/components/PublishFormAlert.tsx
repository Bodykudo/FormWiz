'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';

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
import { toast } from './ui/use-toast';
import { usePublishModal } from '@/src/hooks/usePublishModal';
import { PublishForm } from '@/src/actions/form';

export default function PublishFormAlert() {
  const [mounted, setMounted] = useState(false);
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const { isOpen, onClose, id } = usePublishModal();

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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

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
            Proceed {loading && <FaSpinner className='ml-2 animate-spin' />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
