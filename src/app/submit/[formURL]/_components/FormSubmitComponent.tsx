'use client';

import { useCallback, useRef, useState, useTransition } from 'react';
import { HiCursorClick } from 'react-icons/hi';
import { ImSpinner2 } from 'react-icons/im';

import { SubmitForm } from '@/src/actions/form';
import { FormElementInstance } from '@/src/types/elements';

import { Button } from '@/src/components/ui/button';
import { toast } from '@/src/components/ui/use-toast';
import { FormElements } from '@/src/components/FormElements';

interface FormSubmitComponentProps {
  formURL: string;
  content: FormElementInstance[];
}

export default function FormSubmitComponent({
  formURL,
  content,
}: FormSubmitComponentProps) {
  const [renderKey, setRenderKey] = useState(new Date().getTime());
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});

  const [submitted, setSubmitted] = useState(false);
  const [loading, startTransition] = useTransition();

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || '';
      const valid = FormElements[field.type].validate(field, actualValue);

      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }
    return true;
  }, [content]);

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast({
        title: 'Error',
        description: 'Please check the form for errors',
        variant: 'destructive',
      });
      return;
    }

    try {
      const jsonContent = JSON.stringify(formValues.current);
      await SubmitForm(formURL, jsonContent);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  if (submitted) {
    return (
      <div className='flex justify-center w-full h-full items-center p-8'>
        <div className='max-w-[620px] flex flex-col flex-grow gap-4 bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded'>
          <h1 className='text-2xl font-bold'>Form submitted</h1>
          <p className='text-muted-foreground'>
            Thank you for submitting the form, you can close this page now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex justify-center w-full h-full items-center p-8'>
      <div
        key={renderKey}
        className='max-w-[620px] flex flex-col flex-grow gap-4 bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded'
      >
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              defaultValue={formValues.current[element.id]}
              isInvalid={formErrors.current[element.id]}
            />
          );
        })}
        <Button
          disabled={loading}
          className='mt-8'
          onClick={() => startTransition(submitForm)}
        >
          {!loading ? (
            <>
              <HiCursorClick className='mr-2' /> Submit
            </>
          ) : (
            <ImSpinner2 className='animate-spin' />
          )}
        </Button>
      </div>
    </div>
  );
}
