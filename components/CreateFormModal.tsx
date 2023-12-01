'use client';

import { ImSpinner2 } from 'react-icons/im';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';
import { CreateForm } from '@/actions/form';
import { Textarea } from './ui/textarea';
import { formSchema, formSchemaType } from '@/types/form';
import { useRouter } from 'next/navigation';
import { useFormModal } from '@/hooks/useFormModal';

export default function CreateFormModal() {
  const router = useRouter();

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = form;

  const formModal = useFormModal();

  const { toast } = useToast();

  const onSubmit = async (values: formSchemaType) => {
    try {
      const form = await CreateForm(values);
      toast({
        title: 'Success',
        description: 'Form created successfully',
      });

      router.refresh();
      formModal.onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={formModal.isOpen} onOpenChange={formModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create form</DialogTitle>
          <DialogDescription>
            Create a new form to start collecting responses.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
            <FormField
              control={control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className='w-full mt-4'
          >
            {!isSubmitting && <span>Save</span>}
            {isSubmitting && <ImSpinner2 className='animate-spin' />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
