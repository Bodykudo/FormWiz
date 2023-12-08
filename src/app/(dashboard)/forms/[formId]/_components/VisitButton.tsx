'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/src/components/ui/button';

interface VisitButtonProps {
  shareURL: string;
}

export default function VisitButton({ shareURL }: VisitButtonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const shareLink = `${window.location.origin}/submit/${shareURL}`;
  return (
    <Button
      className='w-[200px]'
      onClick={() => window.open(shareLink, '_blank')}
    >
      Visit
    </Button>
  );
}
