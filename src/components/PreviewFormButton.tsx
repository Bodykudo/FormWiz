'use client';

import { MdPreview } from 'react-icons/md';
import { Button } from './ui/button';
import { usePreviewModal } from '@/src/hooks/usePreviewModal';

export default function PreviewFormButton() {
  const { onOpen } = usePreviewModal();
  return (
    <Button variant='outline' onClick={onOpen} className='gap-2'>
      <MdPreview className='w-6 h-6' /> Preview
    </Button>
  );
}
