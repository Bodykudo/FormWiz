import SubmissionTabs from './SubmissionTabs';

import { GetFormWithSubmissions } from '@/actions/form';
import { FormElementInstance } from '@/types/elements';

interface SubmissionsDetailsProps {
  id: number;
}

export type Column = {
  id: string;
  label: string;
  required: boolean;
  options: any[];
  type: string;
};

export type Row = {
  [key: string]: string;
} & {
  submittedAt: Date;
};

export default async function SubmissionsDetails({
  id,
}: SubmissionsDetailsProps) {
  const form = await GetFormWithSubmissions(id);

  if (!form) {
    throw new Error('Form not found');
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];

  const columns: Column[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case 'TextField':
      case 'NumberField':
      case 'TextAreaField':
      case 'DateField':
      case 'SelectField':
      case 'CheckboxField':
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          options: element.extraAttributes?.options,
          type: element.type,
        });
        break;

      default:
        break;
    }
  });

  const rows: Row[] = [];
  form.formSubmissions.forEach((submission) => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  });

  return <SubmissionTabs rows={rows} columns={columns} />;
}
