'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { FormElements } from '@/components/FormElements';

type Column = {
  id: string;
  label: string;
  required: boolean;
  type: string;
};

type Row = {
  [key: string]: string;
} & {
  submittedAt: Date;
};

interface SubmissionsPagesProps {
  fields: Column[];
  submissions: Row[];
}

export default function SubmissionsPages({
  fields,
  submissions,
}: SubmissionsPagesProps) {
  const [currentSubmission, setCurrentSubmission] = useState(0);

  useEffect(() => {
    console.log(fields);
    console.log(submissions);
  }, []);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Submission #{submissions[currentSubmission].id}
          </CardTitle>
          <CardContent>
            {fields.map((field, i) => {
              // @ts-ignore
              const FormElement = FormElements[field.type].formComponent;
              console.log('TTTTTTTTTTTTTTTTTTTTT');
              console.log(FormElements['TextField']);
              console.log(FormElement);
              return (
                <FormElement
                  key={field.id}
                  elementInstance={field}
                  submitValue={submissions[currentSubmission][field.id]}
                  defaultValue={submissions[currentSubmission][field.id]}
                  isInvalid={false}
                />
              );
            })}
          </CardContent>
        </CardHeader>
      </Card>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
