import { GetFormById } from '@/actions/form';
import FormBuilder from './_components/FormBuilder';

interface BuilderPageProps {
  params: {
    formId: string;
  };
}

export default async function BuilderPage({
  params: { formId },
}: BuilderPageProps) {
  const form = await GetFormById(Number(formId));

  if (!form) {
    throw new Error('Form not found');
  }

  return <FormBuilder form={form} />;
}
