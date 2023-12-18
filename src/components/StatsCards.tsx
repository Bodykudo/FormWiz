import { LuView } from 'react-icons/lu';
import { FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { TbArrowBounce } from 'react-icons/tb';

import { cn } from '@/lib/utils';
import StatsCard from './StatsCard';

interface StatsCardsProps {
  isLoading?: boolean;
  isSmall?: boolean;
  data: {
    visits: number;
    submissions: number;
    submissionRate: number;
    bounceRate: number;
  };
}

export default function StatsCards({
  data,
  isLoading = false,
  isSmall = false,
}: StatsCardsProps) {
  return (
    <div
      className={cn(
        'w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        isSmall && 'container'
      )}
    >
      <StatsCard
        title='Total visits'
        icon={<LuView className='text-blue-600' />}
        description='All time form visits'
        value={data.visits}
        isLoading={isLoading}
        shadowColor='shadow-blue-600'
      />
      <StatsCard
        title='Total submissions'
        icon={<FaWpforms className='text-yellow-600' />}
        description='All time form submissions'
        value={data.submissions}
        isLoading={isLoading}
        shadowColor='shadow-yellow-600'
      />
      <StatsCard
        title='Submission rate'
        icon={<HiCursorClick className='text-green-600' />}
        description='Visits that result in form submission'
        value={data.submissionRate.toLocaleString() + '%'}
        isLoading={isLoading}
        shadowColor='shadow-green-600'
      />
      <StatsCard
        title='Bounce rate'
        icon={<TbArrowBounce className='text-red-600' />}
        description='Visits that leave without interacting'
        value={data.bounceRate.toLocaleString() + '%'}
        isLoading={isLoading}
        shadowColor='shadow-red-600'
      />
    </div>
  );
}
