import { GetFormById } from '@/src/actions/form';
import FormLinkShare from '@/src/components/FormLinkShare';
import StatsCards from '@/src/components/StatsCards';
import VisitButton from '@/src/components/VisitButton';
import SubmissionsTable from './components/SubmissionsTable';
import { redirect } from 'next/navigation';

interface BuilderPageProps {
  params: {
    formId: string;
  };
}

export default async function FormDetailsPage({
  params: { formId },
}: BuilderPageProps) {
  const form = await GetFormById(Number(formId));

  if (!form) {
    throw new Error('Form not found');
  }

  if (!form.published) {
    redirect(`/builder/${formId}`);
  }

  const { visits, submissions } = form;

  const submissionRate = visits > 0 ? (submissions / visits) * 100 : 0;
  const bounceRate = 100 - submissionRate;

  return (
    <>
      <div className='py-10 border-b border-muted'>
        <div className='flex justify-between container'>
          <h1 className='text-4xl font-bold truncate'>{form.name}</h1>
          <VisitButton shareURL={form.shareURL} />
        </div>
      </div>
      <div className='py-4 border-b border-muted'>
        <div className='container flex gap-2 items-center justify-between'>
          <FormLinkShare shareURL={form.shareURL} />
        </div>
      </div>
      <StatsCards
        isSmall
        data={{
          visits,
          submissions,
          submissionRate,
          bounceRate,
        }}
      />
      <div className='container pt-10'>
        <SubmissionsTable id={form.id} />
      </div>
    </>
  );
}
