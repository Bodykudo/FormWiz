'use client';

import { Button } from '@/src/components/ui/button';
import { useEffect, useState } from 'react';

interface VisitButtonProps {
  shareURL: string;
}

export default function VisitButton({ shareURL }: VisitButtonProps) {
  const [mounted, setMounted] = useState(false);

  const shareLink = `${window.location.origin}/submit/${shareURL}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      className='w-[200px]'
      onClick={() => window.open(shareLink, '_blank')}
    >
      Visit
    </Button>
  );
}
