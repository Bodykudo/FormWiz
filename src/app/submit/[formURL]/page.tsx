import { GetFormContentByURL } from '@/src/actions/form';
import { FormElementInstance } from '@/src/types/elements';
import FormSubmitComponent from './_components/FormSubmitComponent';

interface BuilderPageProps {
  params: {
    formURL: string;
  };
}

export default async function SubmitFormPage({
  params: { formURL },
}: BuilderPageProps) {
  const form = await GetFormContentByURL(formURL);

  if (!form) {
    throw new Error('Form not found');
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return <FormSubmitComponent formURL={formURL} content={formContent} />;
}
