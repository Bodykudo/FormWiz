import { Suspense } from 'react';
import StatsCards from './components/StatsCards';
import StatsWrapper from './components/StatsWrapper';
import { Separator } from '@/components/ui/separator';
import CreateFormButton from '@/components/CreateFormButton';
import FormCards from './components/FormCards';
import FormCardSkeleton from './components/FormCardSkeleton';

export default function HomePage() {
  return (
    <div className='container pt-4'>
      <Suspense
        fallback={
          <StatsCards
            isLoading={true}
            data={{
              visits: 0,
              submissions: 0,
              submissionRate: 0,
              bounceRate: 0,
            }}
          />
        }
      >
        <StatsWrapper />
      </Suspense>
      <Separator className='my-6' />
      <h2 className='text-4xl font-bold col-span-2'>Your forms</h2>
      <Separator className='my-6' />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <CreateFormButton />
        <Suspense
          fallback={Array.from({
            length: Math.floor(Math.random() * 4) + 1,
          }).map((_, i) => (
            <FormCardSkeleton key={i} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}
