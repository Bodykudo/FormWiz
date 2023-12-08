import FormCard from './FormCard';
import { GetForms } from '@/src/actions/form';

export default async function FormCards() {
  const forms = await GetForms();

  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}
