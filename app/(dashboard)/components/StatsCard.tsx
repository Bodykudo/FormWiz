import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  icon: ReactNode;
  description: string;
  value: number | string;
  shadowColor: string;
  isLoading: boolean;
}

export default function StatsCard({
  title,
  icon,
  description,
  value,
  shadowColor,
  isLoading,
}: StatsCardProps) {
  return (
    <Card className={cn('shadow-md', shadowColor)}>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium text-muted-foreground'>
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>
          {isLoading && (
            <Skeleton>
              <span className='opacity-0 '>0</span>
            </Skeleton>
          )}
          {!isLoading && value}
        </div>
        <div className='text-xs text-muted-foreground'>{description}</div>
      </CardContent>
    </Card>
  );
}
