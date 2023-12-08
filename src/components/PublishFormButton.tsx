'use client';

import { MdOutlinePublish } from 'react-icons/md';
import { Button } from './ui/button';
import { usePublishModal } from '@/src/hooks/usePublishModal';

interface PublishFormButtonProps {
  id: number;
}

export default function PreviewFormButton({ id }: PublishFormButtonProps) {
  const { onOpen, setId } = usePublishModal();

  return (
    <Button
      onClick={() => {
        setId(id);
        onOpen();
      }}
      variant='premium'
      className='gap-2'
    >
      <MdOutlinePublish className='w-4 h-4' /> Publish
    </Button>
  );
}
