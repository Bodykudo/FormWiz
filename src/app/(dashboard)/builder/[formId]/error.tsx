'use client';

import { Button } from '@/src/components/ui/button';
import Link from 'next/link';
import { useEffect } from 'react';

export default function BuilderErrorPage({ error }: { error: Error }) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className='flex w-full h-full flex-col items-center justify-center gap-4'>
      <h2 className='text-destructive text-4xl'>Something went wrong</h2>
      <Button asChild>
        <Link href='/'>Go back home</Link>
      </Button>
    </div>
  );
}
