'use client';

import { useEffect, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { FormElements } from '@/components/FormElements';

import type { ElementsType } from '@/types/elements';
import type { Column, Row } from './SubmissionsDetails';

interface SubmissionsIndividualProps {
  fields: Column[];
  submissions: Row[];
}

export default function SubmissionsIndividual({
  fields,
  submissions,
}: SubmissionsIndividualProps) {
  const [currentSubmission, setCurrentSubmission] = useState(0);

  useEffect(() => {
    console.log(fields);
    console.log(submissions);
  }, []);

  return (
    <Card className='my-4'>
      <CardHeader className='flex flex-col items-center sm:flex-row sm:items-baseline justify-between w-full h-full px-8 pt-8 pb-4 gap-2'>
        <CardTitle className='text-2xl text-white font-medium'>
          Submission {currentSubmission + 1}/{submissions.length}
        </CardTitle>
        <Pagination className='m-0 w-fit'>
          <PaginationContent>
            <PaginationItem
              onClick={() => {
                if (currentSubmission > 0)
                  setCurrentSubmission((current) => current - 1);
              }}
              className='cursor-pointer'
            >
              <PaginationPrevious disabled={currentSubmission === 0} />
            </PaginationItem>
            <PaginationItem
              onClick={() => {
                if (currentSubmission < submissions.length - 1)
                  setCurrentSubmission((current) => current + 1);
              }}
              className='cursor-pointer'
            >
              <PaginationNext
                disabled={currentSubmission === submissions.length - 1}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardHeader>
      <CardContent
        key={currentSubmission}
        className='flex flex-col flex-grow gap-4 bg-background px-4 sm:px-12 pt-2 pb-8 overflow-y-auto'
      >
        {fields.map((field, i) => {
          const FormElement =
            FormElements[field.type as ElementsType].formComponent;
          return (
            <FormElement
              key={field.id}
              elementInstance={{
                id: field.id,
                type: field.type as ElementsType,
                extraAttributes: {
                  label: field.label,
                  required: field.required,
                  options: field.options,
                },
              }}
              defaultValue={submissions[currentSubmission][field.id]}
              isInvalid={false}
              isDisabled
            />
          );
        })}
      </CardContent>
    </Card>
  );
}
